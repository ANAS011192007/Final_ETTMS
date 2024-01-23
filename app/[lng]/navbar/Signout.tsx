"use server";
import React from "react";
import { auth } from "@/auth";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const Signout = async () => {
  const session = await auth();
  console.log(session);
  const data = {
    redirectTo: "/Login",
  };
  if (session)
    return (
      <form
        action={async () => {
          "use server";
          await signOut(data);
        }}
      >
        <Button type="submit">Signout</Button>
      </form>
    );
  return <div>as</div>;
};

export default Signout;
