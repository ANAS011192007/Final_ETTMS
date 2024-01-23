"use client";
import QRScanPage from "@/components/QRScan";
import React from "react";

function DeviceScanPage() {
  return (
    <div className="">
      <QRScanPage Page="Device" />
    </div>
  );
}

export default DeviceScanPage;
// "use client";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { useZxing } from "react-zxing";
// export default function AlertDialogDemo() {
//   const [result, setResult] = useState("");
//   const { ref } = useZxing({
//     onDecodeResult(result) {
//       setResult(result.getText());
//     },
//   });
//   console.log(result);
//   console.log(ref);

//   return (
//     <div>
//       {/* <video ref={ref} /> */}

//       <AlertDialog>
//         <AlertDialogTrigger asChild>
//           <Button variant="outline">Show Dialog </Button>
//           {/* hello */}
//         </AlertDialogTrigger>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you absolutely sure? </AlertDialogTitle>
//             <AlertDialogDescription>
//               <video ref={ref} />
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction>Continue</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }
