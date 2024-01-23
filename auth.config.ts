import credentials from "next-auth/providers/credentials"
import type { NextAuthConfig} from "next-auth"
import axios from "axios";
import users from "@/data/db.json"
export default {
  providers: [credentials({
    async authorize(credentials, req) {
      try {
        const res = await fetch('http://192.168.87.107:5001/users/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();

      if (res.ok && data) {

      console.log(data.access_token)
      return data.body

    }
  } catch (error) {
    console.error('Error during login:', error);
  }
    },
  })],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ token, session }) {
      console.log("token",token)
      console.log("session",session)
      if (session.user) {

        session.user = { ...session.user, ...token };
        session.access_token = "jaja"
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        console.log("jwt",token)
        return Promise.resolve(token);
      }
      return token;
    },
    
  },
} satisfies NextAuthConfig