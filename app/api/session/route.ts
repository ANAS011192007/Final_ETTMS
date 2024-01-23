import { auth } from "@/auth"

export async function POST() {

  const session = await auth()
 
  return Response.json(session)
}