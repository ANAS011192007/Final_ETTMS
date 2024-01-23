// import type  NextAuthConfig  from 'next-auth';
 
// export const authConfig = {
//   pages: {
//     signIn: '/Login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       console.log(isLoggedIn)
//       const isOnDashboard = nextUrl.pathname.startsWith('/en/Tracking_registration');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         console.log("yes")
//         return Response.redirect(new URL('/en/Tracking_registration', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;
// // import Credentials from 'next-auth/providers/credentials';

// // import type { NextAuthConfig } from "next-auth"

// // export const authConfig = {
// //   providers: [Credentials],
// //     pages: {
// //     signIn: '/Login',
// //   },
// // } satisfies NextAuthConfig
import credentials from "next-auth/providers/credentials"
import type { NextAuthConfig} from "next-auth"
import axios from "axios";
import users from "@/data/db.json"
export default {
  providers: [credentials({
    async authorize(credentials, req) {
      // try {
      //   const res = await fetch('http://192.168.87.107:5001/users/login', {
      //     method: 'POST',
      //     body: JSON.stringify(credentials),
      //     headers: { 'Content-Type': 'application/json' },
      //   });
      //   const data = await res.json();
      //   // console.log(body)
      //   // const { id, first_name,email,_id } = body;
      //   // console.log(first_name)
      //   if (res.ok && data) {
      //     console.log(data.access_token)

      //     const response = await axios.post(
      //       "http://localhost:3001/users/",
      //       data
      //     );
      //     // localStorage.setItem("email",data.body.email)
      //     return data.body
      //   }
      //   // else 
      //   //   return null
      // } catch (error) {
      //   console.error('Authorization Error:');
      //   return null;
      // }
      try {
        const res = await fetch('http://192.168.87.107:5001/users/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();

        if (res.ok && data) {
          // console.log(data.access_token);
          // sessionStorage.setItem("access_token", data.access_token)
          // console.log(localStorage.getItem("access_token"))
          // Check if the user with the same ID already exists in your local database
          // const userExistsLocally = users.users.some(
          //   (user) => user.body._id === data.body._id
          // );
      
          // if (!userExistsLocally) {
          //   const response = await axios.post("http://localhost:3001/users/", data.body);
          //   localStorage.setItem("access_token", data.access_token);


            return data.body;
          // } else {
          //   console.log('User already exists locally. Skipping post request.');
          //   // localStorage.setItem("access_token", data.access_token);
          //   // console.log(localStorage.getItem("access_token"))
          //   return data.access_token;
          // }
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
  })],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    
    async session({token,session}){
      if(session.user){
        session.user.name = session.user.name
      }
    return session
    },
    async jwt({ token, user }) {
      if (user) {
        // console.log(token)
        return Promise.resolve(token);
      }
      return token;
    },
  },
} satisfies NextAuthConfig