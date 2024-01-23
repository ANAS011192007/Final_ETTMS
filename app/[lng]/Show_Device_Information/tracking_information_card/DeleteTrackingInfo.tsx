"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { MdDelete } from "react-icons/md";
// interface EditButtonProps {
//   id: string;
//   "Processing Type": string;
//   "Created at": string;
//   Location: string;
//   "Tool Used": string;
//   "Recorded By": string;
//   Image: string;
// }

export function DeleteButton({ trackingData }: { trackingData: string }) {
  const handleDelete = async () => {
    console.log(trackingData);
    try {
      // Make the DELETE request to delete the data
      const response = await axios.delete(
        `http://localhost:3001/DeviceRegistrationData/${trackingData}`
      );

      if (!response.data) {
        throw new Error("Failed to delete tracking info");
      }

      console.log("Deletion successful");

      // Handle any additional logic after succWessful deletion, e.g., close the dialog
    } catch (error) {
      console.error("Error deleting tracking info:", error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="border-none">
          <MdDelete />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
