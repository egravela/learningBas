<?php
/**
 * Plugin Name: LearnDash Quiz API
 * Plugin URI: https://github.com/egravela/learningBas
 * Description: Espone le risposte dei quiz LearnDash tramite REST API per il frontend Next.js
 * Version: 1.0.0
 * Author: LearningBas
 * License: GPL v2 or later
 * Text Domain: learndash-quiz-api
 */

// Impedisci l'accesso diretto
if (!defined('ABSPATH')) {
    exit;
}

// Registra gli endpoint REST API
add_action('rest_api_init', function() {
    
    // Endpoint per ottenere le risposte di una domanda (senza risposte corrette)
    register_rest_route('learndash-quiz-api/v1', '/question/(?P<id>\d+)/answers', array(
        'methods' => 'GET',
        'callback' => 'ldqa_get_question_answers',
        'permission_callback' => 'ldqa_check_permissions',
        'args' => array(
            'id' => array(
                'validate_callback' => function($param) {
                    return is_numeric($param);
                }
            ),
        ),
    ));
    
    // Endpoint per ottenere tutte le domande di un quiz con le risposte
    register_rest_route('learndash-quiz-api/v1', '/quiz/(?P<id>\d+)/questions', array(
        'methods' => 'GET',
        'callback' => 'ldqa_get_quiz_questions_with_answers',
        'permission_callback' => 'ldqa_check_permissions',
        'args' => array(
            'id' => array(
                'validate_callback' => function($param) {
                    return is_numeric($param);
                }
            ),
        ),
    ));
    
    // Endpoint per verificare le risposte e ottenere i risultati (include risposte corrette)
    register_rest_route('learndash-quiz-api/v1', '/quiz/(?P<id>\d+)/check-answers', array(
        'methods' => 'POST',
        'callback' => 'ldqa_check_quiz_answers',
        'permission_callback' => 'ldqa_check_permissions',
        'args' => array(
            'id' => array(
                'validate_callback' => function($param) {
                    return is_numeric($param);
                }
            ),
        ),
    ));
});

/**
 * Verifica i permessi per accedere all'API
 */
function ldqa_check_permissions() {
    // Permetti accesso a utenti autenticati
    // Puoi modificare questa logica in base alle tue esigenze
    return is_user_logged_in() || ldqa_check_basic_auth();
}

/**
 * Verifica autenticazione Basic Auth
 */
function ldqa_check_basic_auth() {
    if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
        return false;
    }
    
    $user = wp_authenticate($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);
    
    if (is_wp_error($user)) {
        // Prova con application password
        $user = wp_authenticate_application_password(null, $_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);
    }
    
    return !is_wp_error($user) && $user;
}

/**
 * Ottiene le risposte di una singola domanda
 */
function ldqa_get_question_answers($request) {
    $question_id = intval($request['id']);
    
    // Verifica che il post esista e sia una domanda
    $question = get_post($question_id);
    if (!$question || $question->post_type !== 'sfwd-question') {
        return new WP_Error('not_found', 'Domanda non trovata', array('status' => 404));
    }
    
    $answers = ldqa_fetch_answers_for_question($question_id);
    
    return rest_ensure_response(array(
        'question_id' => $question_id,
        'answers' => $answers
    ));
}

/**
 * Ottiene tutte le domande di un quiz con le risposte
 */
function ldqa_get_quiz_questions_with_answers($request) {
    $quiz_id = intval($request['id']);
    
    // Verifica che il quiz esista
    $quiz = get_post($quiz_id);
    if (!$quiz || $quiz->post_type !== 'sfwd-quiz') {
        return new WP_Error('not_found', 'Quiz non trovato', array('status' => 404));
    }
    
    // Ottieni tutte le domande del quiz
    $questions = get_posts(array(
        'post_type' => 'sfwd-question',
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => 'quiz_id',
                'value' => $quiz_id,
            )
        ),
        'orderby' => 'menu_order',
        'order' => 'ASC'
    ));
    
    // Se non trova con meta_query, prova con il campo quiz
    if (empty($questions)) {
        $questions = get_posts(array(
            'post_type' => 'sfwd-question',
            'posts_per_page' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC'
        ));
        
        // Filtra solo le domande del quiz
        $questions = array_filter($questions, function($q) use ($quiz_id) {
            $q_quiz_id = get_post_meta($q->ID, 'quiz_id', true);
            return $q_quiz_id == $quiz_id;
        });
    }
    
    $result = array();
    
    foreach ($questions as $question) {
        $answers = ldqa_fetch_answers_for_question($question->ID);
        
        $result[] = array(
            'id' => $question->ID,
            'title' => $question->post_title,
            'content' => apply_filters('the_content', $question->post_content),
            'menu_order' => $question->menu_order,
            'question_type' => get_post_meta($question->ID, 'question_type', true),
            'answers' => $answers
        );
    }
    
    return rest_ensure_response(array(
        'quiz_id' => $quiz_id,
        'questions' => $result
    ));
}

/**
 * Recupera le risposte per una domanda dal database LearnDash
 * @param int $question_id ID della domanda WordPress
 * @param bool $include_correct Se true, include l'informazione su quale risposta è corretta
 */
function ldqa_fetch_answers_for_question($question_id, $include_correct = false) {
    global $wpdb;
    
    // Ottieni l'ID della domanda nel sistema Pro Quiz
    $pro_quiz_question_id = get_post_meta($question_id, 'question_pro_id', true);
    
    if (!$pro_quiz_question_id) {
        // Prova con un nome alternativo del meta
        $pro_quiz_question_id = get_post_meta($question_id, 'ld_quiz_question_id', true);
    }
    
    if (!$pro_quiz_question_id) {
        return array();
    }
    
    // Tabella delle domande Pro Quiz
    $table_question = $wpdb->prefix . 'learndash_pro_quiz_question';
    
    // Recupera i dati della domanda
    $row = $wpdb->get_row($wpdb->prepare(
        "SELECT answer_data, answer_type FROM $table_question WHERE id = %d",
        $pro_quiz_question_id
    ));
    
    if (!$row || !$row->answer_data) {
        return array();
    }
    
    // Deserializza i dati delle risposte
    $answer_data = maybe_unserialize($row->answer_data);
    
    if (!is_array($answer_data)) {
        return array();
    }
    
    $answers = array();
    
    foreach ($answer_data as $idx => $answer) {
        $answer_text = '';
        $is_correct = false;
        
        // I dati possono essere in diversi formati
        if (is_object($answer)) {
            // Formato oggetto WpProQuiz_Model_AnswerTypes
            if (method_exists($answer, 'getAnswer')) {
                $answer_text = $answer->getAnswer();
            } elseif (isset($answer->_answer)) {
                $answer_text = $answer->_answer;
            }
            
            // Verifica se è la risposta corretta
            if (method_exists($answer, 'isCorrect')) {
                $is_correct = $answer->isCorrect();
            } elseif (isset($answer->_correct)) {
                $is_correct = (bool) $answer->_correct;
            }
        } elseif (is_array($answer)) {
            // Formato array
            $answer_text = isset($answer['_answer']) ? $answer['_answer'] : 
                          (isset($answer['answer']) ? $answer['answer'] : '');
            $is_correct = isset($answer['_correct']) ? (bool) $answer['_correct'] : 
                         (isset($answer['correct']) ? (bool) $answer['correct'] : false);
        }
        
        if (!empty($answer_text)) {
            $answer_item = array(
                'id' => 'answer_' . $idx,
                'text' => wp_strip_all_tags($answer_text),
                'html' => $answer_text
            );
            
            // Include la risposta corretta solo se richiesto
            if ($include_correct) {
                $answer_item['correct'] = $is_correct;
            }
            
            $answers[] = $answer_item;
        }
    }
    
    return $answers;
}

/**
 * Verifica le risposte del quiz e restituisce i risultati
 */
function ldqa_check_quiz_answers($request) {
    $quiz_id = intval($request['id']);
    
    // Verifica che il quiz esista
    $quiz = get_post($quiz_id);
    if (!$quiz || $quiz->post_type !== 'sfwd-quiz') {
        return new WP_Error('not_found', 'Quiz non trovato', array('status' => 404));
    }
    
    // Ottieni le risposte inviate dall'utente
    $user_answers = $request->get_json_params();
    if (!is_array($user_answers)) {
        $user_answers = array();
    }
    
    // Ottieni tutte le domande del quiz
    $questions = get_posts(array(
        'post_type' => 'sfwd-question',
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => 'quiz_id',
                'value' => $quiz_id,
            )
        ),
        'orderby' => 'menu_order',
        'order' => 'ASC'
    ));
    
    // Se non trova con meta_query, prova con tutti
    if (empty($questions)) {
        $questions = get_posts(array(
            'post_type' => 'sfwd-question',
            'posts_per_page' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC'
        ));
        
        $questions = array_filter($questions, function($q) use ($quiz_id) {
            $q_quiz_id = get_post_meta($q->ID, 'quiz_id', true);
            return $q_quiz_id == $quiz_id;
        });
        $questions = array_values($questions);
    }
    
    $total_questions = count($questions);
    $correct_count = 0;
    $results = array();
    
    foreach ($questions as $index => $question) {
        // Recupera le risposte con l'informazione su quale è corretta
        $answers = ldqa_fetch_answers_for_question($question->ID, true);
        
        // Trova la risposta corretta
        $correct_answer_id = null;
        $correct_answer_text = '';
        foreach ($answers as $answer) {
            if (!empty($answer['correct'])) {
                $correct_answer_id = $answer['id'];
                $correct_answer_text = $answer['text'];
                break;
            }
        }
        
        // Verifica la risposta dell'utente
        $user_answer_id = isset($user_answers[$index]) ? $user_answers[$index] : null;
        $is_correct = ($user_answer_id === $correct_answer_id);
        
        if ($is_correct) {
            $correct_count++;
        }
        
        $results[] = array(
            'question_id' => $question->ID,
            'question_title' => $question->post_title,
            'user_answer_id' => $user_answer_id,
            'correct_answer_id' => $correct_answer_id,
            'correct_answer_text' => $correct_answer_text,
            'is_correct' => $is_correct,
            'answers' => $answers
        );
    }
    
    // Calcola il punteggio
    $score_percentage = $total_questions > 0 ? round(($correct_count / $total_questions) * 100) : 0;
    
    // Soglia di superamento (default 80%)
    $passing_percentage = intval(get_post_meta($quiz_id, 'passingpercentage', true)) ?: 80;
    $passed = $score_percentage >= $passing_percentage;
    
    return rest_ensure_response(array(
        'quiz_id' => $quiz_id,
        'total_questions' => $total_questions,
        'correct_answers' => $correct_count,
        'score_percentage' => $score_percentage,
        'passing_percentage' => $passing_percentage,
        'passed' => $passed,
        'results' => $results
    ));
}

/**
 * Aggiunge headers CORS per il frontend
 */
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        
        // Permetti richieste dal frontend Next.js
        $allowed_origins = array(
            'http://localhost:3000',
            'http://localhost:3001',
            'https://learningbas.vercel.app', // Aggiungi il tuo dominio di produzione
        );
        
        if (in_array($origin, $allowed_origins) || !$origin) {
            header('Access-Control-Allow-Origin: ' . ($origin ?: '*'));
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With');
        }
        
        return $value;
    });
}, 15);

