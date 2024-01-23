import NextAuth from "next-auth"
import authConfig from "./auth.config"
import GitHub from "next-auth/providers/github"
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut, 
  } = NextAuth({
    ...authConfig,
    session: { strategy: 'jwt' },
  });
