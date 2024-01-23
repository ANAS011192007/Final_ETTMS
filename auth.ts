// import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
// import type { NextAuthOptions } from "next-auth"
// import { getServerSession } from "next-auth"
// import CredentialsProvider from 'next-auth/providers/credentials';
// // You'll need to import and pass this
// // to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
// export const config = {
//   secret: process.env.AUTH_SECRET,
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         // Specify your expected fields here if needed
//       },
//       async authorize(credentials, req) {
//         try {
//           const res = await fetch('http://192.168.87.107:5001/users/login', {
//             method: 'POST',
//             body: JSON.stringify(credentials),
//             headers: { 'Content-Type': 'application/json' },
//           });

//           const user = await res.json();

//           // If no error and we have user data, return it
//           if (res.ok && user) {
//             return user;
//           }
//         } catch (error) {
//           console.error('Authorization Error:');
//           return null;
//         }
//       },
//     }),
//     // Add other providers if needed
//   ],
// } satisfies NextAuthOptions

// // Use it in server contexts
// export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
//   return getServerSession(...args, config)
// }
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import GitHub from "next-auth/providers/github"
// import { CredentialsProvider } from "next-auth/providers/credentials"
// export const { handlers:{GET,POST}, auth, signIn, signOut } = NextAuth({...authConfig,session:{strategy:"jwt"}})
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut, 
  } = NextAuth({
    ...authConfig,
    session: { strategy: 'jwt' },
  });
  
  // // Define a custom signOut function with the desired default redirectTo value
  // export const signOut = async ({ redirectTo = 'Login',redirect = false } = {}) => {
  //   return customSignOut({
  //     redirectTo,
  //     redirect,
  //   });
  // };