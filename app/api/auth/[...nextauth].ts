// // import CredentialsProvider from "next-auth/providers/credentials";

// // providers: [
// //   CredentialsProvider({
// //     name: 'Credentials',
// //     credentials: {
// //       // Specify your expected fields here if needed
// //     },
// //     pages: {
// //       signIn: '/Login',
// //       signOut: '/auth/signout',
// //       error: '/auth/erroasdr', // Error code passed in query string as ?error=
// //       verifyRequest: '/auth/verify-request', // (used for check email message)
// //       newUser: '/Tracking_registration' // New users will be directed here on first sign in (leave the property out if not of interest)
// //     },
// //     async authorize(credentials, req) {
// //       try {
// //         const loginData = {
// //           email: credentials.email,
// //           password: credentials.password,
// //           callbackUrl: "/",
// //           redirect: false,
// //         };

// //         const res = await fetch("http://192.168.87.107:5001/users/login", {
// //           method: "POST",
// //           body: JSON.stringify(credentials),
// //           headers: { "Content-Type": "application/json" },
// //         });
// //         const user = await res.json()

// //         // If no error and we have user data, return it
// //         if (res.ok && user) {
// //           return user
// //         }
// //       } catch (error) {
// //         console.error('Authorization Error:', error.message);
// //         return null;
// //       }
// //     }
// //   })
// // ]
// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google"

// export default async function auth(req, res) {
//   const providers = [
//     CredentialsProvider(
//       {      name: 'Credentials',
//       credentials: {
//         // Specify your expected fields here if needed
//       },
//       pages: {
//         signIn: '/Login',
//         signOut: '/auth/signout',
//         error: '/auth/erroasdr', // Error code passed in query string as ?error=
//         verifyRequest: '/auth/verify-request', // (used for check email message)
//         newUser: '/Tracking_registration' // New users will be directed here on first sign in (leave the property out if not of interest)
//       },
//       async authorize(credentials, req) {
//         try {
//           const loginData = {
//             email: credentials.email,
//             password: credentials.password,
//             callbackUrl: "/",
//             redirect: false,
//           };
  
//           const res = await fetch("http://192.168.87.107:5001/users/login", {
//             method: "POST",
//             body: JSON.stringify(credentials),
//             headers: { "Content-Type": "application/json" },
//           });
//           const user = await res.json()
  
//           // If no error and we have user data, return it
//           if (res.ok && user) {
//             return user
//           }
//         } catch (error) {
//           console.error('Authorization Error:', error.message);
//           return null;
//         }
//       }
//     }
//     ),
//   ]

//   const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.includes("signin")

//   // Will hide the `GoogleProvider` when you visit `/api/auth/signin`
//   if (isDefaultSigninPage) providers.pop()

//   return await NextAuth(req, res, {
//     providers,
//   })
// }
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// // Import other providers if needed

// const authOptions = {
//   secret: process.env.AUTH_SECRET,
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         // Specify your expected fields here if needed
//       },
//       async authorize(credentials, req) {
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
//           console.error('Authorization Error:');
//           return null;
//       },
//     }),
    
//     // Add other providers if needed
//   ],
//   pages: {
//     signIn: '/Login', // Make sure this path is correct
//     // ... other page configurations ...
//   },
// };

// export default NextAuth(authOptions);
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          // Specify your expected fields here if needed
        },
        async authorize(credentials, req) {
          try {
            const res = await fetch('http://192.168.87.107:5001/users/login', {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { 'Content-Type': 'application/json' },
            });
  
            const user = await res.json();
  
            // If no error and we have user data, return it
            if (res.ok && user) {
              return user;
            }
          } catch (error) {
            console.error('Authorization Error:');
            return null;
          }
        },
      }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };