'use server'
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect, useRouter } from 'next/navigation';
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  formData.append("redirectTo", "/Device_registration")
  try {
    const data = await signIn('credentials', formData);
    console.log(data)
    // if (session) {
    //   console.log("hi")
    //   redirect('/Tracking_registration');
    // }
    // // const router = useRouter()
    // // router.push("Tracking_registration")
    // console.log("yes")
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}