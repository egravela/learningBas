# 🎓 Formazione Accessibilità - Regione Basilicata

Frontend Next.js moderno per la piattaforma e-learning LearnDash della Regione Basilicata.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-purple)

## ✨ Caratteristiche

- 🎨 **Design Moderno** - UI accattivante con gradiente emerald/teal
- ⚡ **Transizioni Smooth** - Animazioni fluide con Framer Motion
- 📱 **Responsive** - Ottimizzato per tutti i dispositivi
- 🔌 **API LearnDash** - Integrazione completa con WordPress/LearnDash
- 🚀 **Performance** - Server-side rendering e caching intelligente
- ♿ **Accessibile** - Conforme agli standard WCAG

## 🚀 Quick Start

### 1. Installa le dipendenze

```bash
npm install
```

### 2. Configura le variabili d'ambiente

Rinomina `.env.example` in `.env.local`:

```bash
copy .env.example .env.local
```

Il file contiene già le credenziali per il dominio LearnDash:

```env
NEXT_PUBLIC_WORDPRESS_URL=https://accessibilita.regione.basilicata.it
WORDPRESS_API_USER=egravela@gmail.com
WORDPRESS_API_PASSWORD=T3g8 P7vo 8p0K Bv3I hpwn e1UQ
```

### 3. Avvia il server di sviluppo

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## 📁 Struttura Progetto

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── corsi/
│   │   ├── page.tsx       # Lista corsi
│   │   └── [id]/          # Dettaglio corso
│   ├── login/             # Pagina login
│   ├── loading.tsx        # Loading state
│   └── not-found.tsx      # 404 page
├── components/            # Componenti React
│   ├── Header.tsx         # Navigazione
│   ├── Footer.tsx         # Footer
│   ├── HeroSection.tsx    # Hero homepage
│   ├── CourseCard.tsx     # Card corso
│   └── ...
└── lib/                   # Utility e API
    ├── api.ts             # Client API LearnDash
    └── utils.ts           # Helper functions
```

## 🔧 Comandi Disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia server di sviluppo |
| `npm run build` | Build di produzione |
| `npm run start` | Avvia server produzione |
| `npm run lint` | Verifica codice con ESLint |

## 🎨 Personalizzazione

### Colori

I colori principali sono definiti con la palette Tailwind `emerald` e `teal`. 
Puoi personalizzarli in `src/app/globals.css`.

### Font

Il progetto usa il font **Outfit** da Google Fonts, configurato in `src/app/layout.tsx`.

### Logo

Il logo della Regione Basilicata è caricato direttamente da:
```
https://accessibilita.regione.basilicata.it/wp-content/uploads/2024/08/RB_logo_350x163.gif
```

## 📡 API LearnDash

Il progetto si connette alle API REST di LearnDash:

- `GET /wp-json/ldlms/v2/sfwd-courses` - Lista corsi
- `GET /wp-json/ldlms/v2/sfwd-courses/{id}` - Dettaglio corso
- `GET /wp-json/ldlms/v2/sfwd-lessons` - Lezioni corso
- `GET /wp-json/ldlms/v2/sfwd-quiz` - Quiz corso

L'autenticazione usa **HTTP Basic Auth** con Application Password di WordPress.

## 🚀 Deploy

### Vercel (Consigliato)

```bash
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Note

- Le credenziali API sono configurate per il dominio `accessibilita.regione.basilicata.it`
- Il login reindirizza alla pagina WordPress per l'autenticazione
- Le immagini remote richiedono la configurazione in `next.config.ts`

## 📄 Licenza

© 2025 Regione Basilicata. Tutti i diritti riservati.
