import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://accessibilita.regione.basilicata.it';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'WordPress',
      credentials: {
        username: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const username = String(credentials.username).trim();
          const password = String(credentials.password);

          // Autenticazione tramite WordPress REST API
          const authString = Buffer.from(`${username}:${password}`).toString('base64');

          // Verifica le credenziali chiamando l'endpoint users/me
          const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/users/me`, {
            headers: {
              'Authorization': `Basic ${authString}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            console.error('WordPress auth failed:', response.status);
            return null;
          }

          const user = await response.json();

          // Restituisci l'utente con le info necessarie
          return {
            id: String(user.id),
            name: user.name,
            email: credentials.username as string,
            image: user.avatar_urls?.['96'] || null,
            wpToken: authString, // Salva il token per le chiamate API future
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Salva i dati utente nel token JWT
      if (user) {
        token.id = user.id;
        token.wpToken = (user as { wpToken?: string }).wpToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Passa i dati dal token alla sessione
      if (session.user) {
        session.user.id = token.id as string;
        (session as { wpToken?: string }).wpToken = token.wpToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET || 'your-secret-key-change-in-production',
});

