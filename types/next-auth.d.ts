import { DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token?: string;
    user: DefaultUser & {
      id: string;
      access_token?: string;
    };
  }
}