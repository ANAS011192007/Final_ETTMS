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
interface EditButtonProps {
  id: string;
  "Processing Type": string;
  "Created at": string;
  Location: string;
  "Tool Used": string;
  "Recorded By"?: string;
  Image: string;
}

export function DeleteButton({
  trackingData,
  buttonName,
}: {
  trackingData: EditButtonProps;
  buttonName: string;
}) {
  const handleDelete = async () => {
    try {
      // Make the DELETE request to delete the data
      const response = await axios.delete(
        `http://localhost:3001/trackingData/${trackingData.id}`
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
        <Button className="bg-slate-600 text-xs w-16 h-4 rounded-full m-1">
          {buttonName}
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
