// import React from "react";
// import { auth } from "@/auth";
// import { signOut } from "@/auth";
// import { Button } from "@/components/ui/button";

// const SettingPage = async () => {
//   const session = await auth();
//   console.log(session);
//   const data = {
//     redirectTo: "/Login",
//   };

//   return (
//     <div className="container">
//       {session ? (
//         <div>
//           <form
//             action={async () => {
//               "use server";
//               await signOut(data);
//             }}
//           >
//             <Button type="submit">Sign Out</Button>
//           </form>
//         </div>
//       ) : (
//         <p>You are not signed in.</p>
//       )}
//     </div>
//   );
// };

// export default SettingPage;

// import React from "react";
import { auth } from "@/auth";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SettingPage = async () => {
  const session = await auth();

  console.log(session);
  const data = {
    redirectTo: "/Login",
  };

  return (
    <div className="flex items-center justify-center h-[89.8%] bg-gray-200">
      <Card className="bg-white p-4 rounded-xl">
        <div className="container">
          {session ? (
            <div>
              <h1 className="text-center text-2xl mb-4">Signout</h1>
              <form
                action={async () => {
                  "use server";

                  await signOut(data);
                }}
              >
                <p className="text-center mb-4">
                  Are you sure you want to sign out?
                </p>
                <Button type="submit" className="w-full">
                  Sign Out
                </Button>
              </form>
            </div>
          ) : (
            <p className="text-center">You are not signed in.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SettingPage;
