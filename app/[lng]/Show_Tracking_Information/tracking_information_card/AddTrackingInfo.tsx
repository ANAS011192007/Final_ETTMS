"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useTrackingStore } from "../../../store";
import upload from "../../../FileUpload";

export function AddButton({ buttonName }: { buttonName: string }) {
  const ProcessingType = useTrackingStore((state) => state.ProcessingType);
  const setProcessingType = useTrackingStore(
    (state) => state.setProcessingType
  );
  const Location = useTrackingStore((state) => state.Location);
  const setLocation = useTrackingStore((state) => state.setLocation);
  const ToolUsed = useTrackingStore((state) => state.ToolUsed);
  const setToolUsed = useTrackingStore((state) => state.setToolUsed);
  const RecordedBy = useTrackingStore((state) => state.RecordedBy);
  const setRecordedBy = useTrackingStore((state) => state.setRecordedBy);
  const Image = useTrackingStore((state) => state.Image);
  const setImage = useTrackingStore((state) => state.setImage);
  const selectedFile = useTrackingStore((state) => state.selectedFile);
  const setSelectedFile = useTrackingStore((state) => state.setSelectedFile);

  const handleSaveChanges = async () => {
    try {
      const data = new FormData();
      data.set("file", selectedFile!);
      await upload(data);

      const createdAt = new Date();

      const requestData = {
        "Processing Type": ProcessingType,
        "Created at": createdAt.toLocaleString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        }),
        Location: Location,
        "Tool Used": ToolUsed,
        "Recorded By": RecordedBy,
        Image: Image,
      };

      const response = await axios.post(
        "http://localhost:3001/trackingData/",
        requestData
      );

      if (!response.data) {
        throw Error("Failed to add tracking info");
      }

      console.log("Add successful");
    } catch (error) {
      console.error("Error adding tracking info:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-slate-600 text-sm w-16 h-8 rounded-full m-1">
          {buttonName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tracking Info</DialogTitle>
          <DialogDescription>
            Enter the tracking info below and click save to add.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="processingType" className="text-right">
              Processing Type
            </Label>
            <Select onValueChange={(value) => setProcessingType(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Purge">Purge</SelectItem>
                  <SelectItem value="Destroy">Destroy</SelectItem>
                  <SelectItem value="Clear">Clear</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              onChange={(e) => setLocation(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="toolUsed" className="text-right">
              Tool Used
            </Label>
            <Select onValueChange={(value) => setToolUsed(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a tool" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Flash Purge">Flash Purge</SelectItem>
                  <SelectItem value="Flash Erase">Flash Erase</SelectItem>
                  <SelectItem value="Flash Clear">Flash Clear</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="recordedBy" className="text-right">
              Recorded By
            </Label>
            <Input
              id="recordedBy"
              onChange={(e) => setRecordedBy(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={async (e) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  setSelectedFile(file);
                  setImage(file.name);
                }
              }}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSaveChanges}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
