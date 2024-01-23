// import NextAuth from "next-auth";
// import CredentialsProvider from 'next-auth/providers/credentials';

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//         name: 'Credentials',
//         credentials: {
//           // Specify your expected fields here if needed
//         },
//         async authorize(credentials, req) {
//           try {
//             const res = await fetch('http://192.168.87.107:5001/users/login', {
//               method: 'POST',
//               body: JSON.stringify(credentials),
//               headers: { 'Content-Type': 'application/json' },
//             });
  
//             const user = await res.json();
  
//             // If no error and we have user data, return it
//             if (res.ok && user) {
//               return user;
//             }
//           } catch (error) {
//             console.error('Authorization Error:');
//             return null;
//           }
//         },
//       }),
//   ],
// };

// export const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
export {GET,POST} from "@/auth"