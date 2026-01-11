=== LearnDash Quiz API ===
Contributors: learningbas
Tags: learndash, quiz, api, rest
Requires at least: 5.0
Tested up to: 6.4
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Espone le risposte dei quiz LearnDash tramite REST API per il frontend Next.js LearningBas.

== Description ==

Questo plugin aggiunge endpoint REST API per recuperare le risposte dei quiz LearnDash, 
permettendo al frontend Next.js di visualizzare i quiz in modo interattivo.

**Endpoint disponibili:**

* `GET /wp-json/learndash-quiz-api/v1/question/{id}/answers` - Risposte di una domanda
* `GET /wp-json/learndash-quiz-api/v1/quiz/{id}/questions` - Tutte le domande di un quiz con risposte

**Autenticazione:**

Gli endpoint richiedono autenticazione tramite:
- Sessione WordPress (utente loggato)
- Basic Auth con Application Password

== Installation ==

1. Scarica la cartella `learndash-quiz-api`
2. Caricala in `/wp-content/plugins/`
3. Attiva il plugin dal menu 'Plugin' di WordPress
4. Gli endpoint API saranno immediatamente disponibili

== Changelog ==

= 1.0.0 =
* Prima versione del plugin
* Endpoint per risposte singola domanda
* Endpoint per domande quiz con risposte
* Supporto CORS per frontend Next.js

