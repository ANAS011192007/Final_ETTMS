// Import necessary libraries
"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Input } from "@/components/ui/input";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@radix-ui/themes";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { useTrackingStore } from "../../../store";
import upload from "@/app/FileUpload";
import axios from "axios";
import { toast } from "sonner";
import { useTranslation } from "@/app/i18n/client";

const TrackRegistrationFormPage = () => {
  const searchparams = useSearchParams();
  const trackId = searchparams.get("track_id");
  const [loading, setLoading] = useState(true);
  const deviceid = useRef("");
  const processing_type = useRef("");
  const tools = useRef([[]]);
  const webcamRef = useRef<Webcam | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current!.getScreenshot();
    setImgSrc(imageSrc);
    setImage(trackId + ".jpg");
    console.log(imageSrc);
  }, [webcamRef]);

  const ProcessingType = useTrackingStore((state) => state.ProcessingType);
  const setProcessingType = useTrackingStore(
    (state) => state.setProcessingType
  );
  const Location = useTrackingStore((state) => state.Location);
  const setLocation = useTrackingStore((state) => state.setLocation);
  const ToolUsed = useTrackingStore((state) => state.ToolUsed);
  const setToolUsed = useTrackingStore((state) => state.setToolUsed);
  const Comment = useTrackingStore((state) => state.Comment);
  const setComment = useTrackingStore((state) => state.setComment);
  const Image = useTrackingStore((state) => state.Image);
  const setImage = useTrackingStore((state) => state.setImage);

  // React.useEffect(() => {
  //   setProcessingType("");
  //   setLocation("");
  //   setToolUsed("");
  //   setComment("");
  //   setImage("");
  // }, []);

  const fetchData = async () => {
    try {
      setProcessingType("");
      setLocation("");
      setToolUsed("");
      setComment("");
      setImage("");
      const access_token = localStorage.getItem("access_token");
      const deviceidres = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/devices/showDeviceDetailsByDevicetag`,
        { device_tag: trackId },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      deviceid.current = deviceidres.data.body._id;
      // console.log(deviceid.current);
      const processingres = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/devices/findCurrentProcessingTypeOfFollowingDevice`,
        { device_id: deviceid.current },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      processing_type.current = processingres.data.body.processing_type;
      console.log(processing_type.current);
      const toolsres = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tools/showAllActiveToolsOfFollowingOperationOfMyOrganization`,
        { processing_type: processing_type.current },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      tools.current = toolsres.data.body.map((tool: any) => ({
        _id: tool._id,
        name_en: tool.name_en,
      }));
      setProcessingType(processing_type.current);
      // console.log(toolsres.data.body);
      // console.log(tools.current);
      setLoading(false);
      // Your logic with the session data
    } catch (error: any) {
      console.error("Error fetching session data:", error);
      toast.error("Processing is already full for this track");
      setLoading(false);
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Call the async function immediately
  }, []); // Dependencies array can be adjusted based on your needs
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  const router = useRouter();
  const handleSaveChanges = async () => {
    let formData = new FormData();

    formData.append("processing_type", processing_type.current);
    formData.append("device_id", deviceid.current);
    formData.append("location", Location);
    formData.append("tool", ToolUsed);

    if (imgSrc) {
      const byteString = atob(imgSrc.split(",")[1]);
      const mimeString = imgSrc.split(",")[0].match(/:(.*?);/)![1];

      const ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const file = new File([ia], `${trackId}.jpg`, { type: mimeString });
      formData.append("image_upload", file);
    }

    try {
      const access_token = localStorage.getItem("access_token");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/records/createRecord`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data) {
        throw Error("Failed to add tracking info");
      }

      console.log("Add successful");
    } catch (error) {
      console.error("Error adding tracking info:", error);
    }
  };
  // const handleSaveChanges = async () => {
  //   const access_token = localStorage.getItem("access_token");
  //   let file;
  //   let fileInput;
  //   try {
  //     // if (imgSrc) {
  //     //   // fileInput = document.querySelector<HTMLInputElement>("#photo");
  //     //   const byteString = atob(imgSrc.split(",")[1]);
  //     //   const mimeString = imgSrc.split(",")[0].match(/:(.*?);/)![1];
  //     //   const ab = byteString.length;
  //     //   const ia = new Uint8Array(ab);
  //     //   for (let i = 0; i < byteString.length; i++) {
  //     //     ia[i] = byteString.charCodeAt(i);
  //     //   }
  //     //   // const blob = new Blob([ab], { type: mimeString });
  //     //   console.log(imgSrc);
  //     //   file = new File([ia], trackId + ".jpg", { type: mimeString });

  //     //   // const data = new FormData();
  //     //   // data.append("file", file);
  //     //   // image = await upload(data);
  //     //   // image = ab
  //     //   console.log(file);
  //     // }
  //     if (imgSrc) {
  //       const byteString = atob(imgSrc.split(",")[1]);
  //       const mimeString = imgSrc.split(",")[0].match(/:(.*?);/)![1];

  //       const ia = new Uint8Array(byteString.length);
  //       for (let i = 0; i < byteString.length; i++) {
  //         ia[i] = byteString.charCodeAt(i);
  //       }

  //       file = new File([ia], `${trackId}.jpg`, { type: mimeString });

  //       // Now you can use the 'file' variable as a File object
  //     }
  //     const createdAt = new Date();

  //     const requestData = {
  //       processing_type: processing_type.current,
  //       // "Created at": createdAt.toLocaleString("en-US", {
  //       //   month: "numeric",
  //       //   day: "numeric",
  //       //   year: "numeric",
  //       //   hour: "numeric",
  //       //   minute: "numeric",
  //       //   second: "numeric",
  //       //   hour12: true,
  //       // }),
  //       device_id: deviceid.current,
  //       location: Location,
  //       tool: ToolUsed,
  //       image_upload: file,
  //     };
  //     console.log(requestData.image_upload);
  //     // const response = await axios.post(
  //     //   "http://localhost:3001/trackingData/",
  //     //   requestData
  //     // );

  //     const response = await axios.post(
  //       "http://192.168.87.107:5001/records/createRecord",
  //       requestData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (!response.data) {
  //       throw Error("Failed to add tracking info");
  //     }

  //     console.log("Add successful");
  //   } catch (error) {
  //     console.error("Error adding tracking info:", error);
  //   }
  // };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const pathname = usePathname();
  const lng = pathname.split("/")[1];
  const { t } = useTranslation(lng, "TrackForm");

  return (
    <form onSubmit={handleSubmit} className="mt-16 flex flex-col items-center ">
      {/* Tracking Registration */}
      <div className="mb-8 text-slate-600 text-2xl font-bold">{t("title")}</div>

      {/* Track ID */}
      <div className="mb-4 text-black text-2xl font-bold">
        {t("TrackID", { id: trackId })}
      </div>

      {/* Input Fields */}
      <div className="flex flex-col items-center">
        {/* Processing Type */}
        {/* <Select onValueChange={(value) => setProcessingType(value)}>
          <SelectTrigger className=" w-96 font-bold rounded-xl mb-4 border-slate-500">
            <SelectValue className="" placeholder={t("ProcessingType")} />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              <SelectItem value={t("Erase")}>{t("Erase")}</SelectItem>
              <SelectItem value={t("Purge")}>{t("Purge")}</SelectItem>
              <SelectItem value={t("Clear")}>{t("Clear")}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
        <Input
          name="Processing_Type"
          value={processing_type.current}
          onChange={(e) => setProcessingType(processing_type.current)}
          className=" w-96 font-bold rounded-xl mb-4 border-slate-500"
          // placeholder={t("EnterLocation")}
        />
        {/* Location */}
        <Input
          name="Location"
          value={Location}
          onChange={(e) => setLocation(e.target.value)}
          className=" w-96 font-bold rounded-xl mb-4 border-slate-500"
          placeholder={t("EnterLocation")}
        />

        {/* Tool Used */}
        {/* <Select onValueChange={(value) => setToolUsed(value)}>
          <SelectTrigger className=" w-96 font-bold rounded-xl mb-4 border-slate-500">
            <SelectValue className="" placeholder={t("ToolUsed")} />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              <SelectItem value={t("FlashPurge")}>{t("FlashPurge")}</SelectItem>
              <SelectItem value={t("FlashErase")}>{t("FlashErase")}</SelectItem>
              <SelectItem value={t("FlashClear")}>{t("FlashClear")}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
        <Select onValueChange={(value) => setToolUsed(value)}>
          <SelectTrigger className=" w-96 font-bold rounded-xl mb-4 border-slate-500">
            <SelectValue className="" placeholder={t("ToolUsed")} />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              {tools.current.map((tool: any) => (
                <SelectItem key={tool._id} value={tool._id}>
                  {tool.name_en}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Capture Image */}
        <div className="flex flex-wrap justify-center mb-4">
          <div className="flex flex-col items-center mx-4">
            <Webcam
              ref={webcamRef}
              mirrored={true}
              screenshotFormat="image/jpeg"
              screenshotQuality={0.8}
              className="w-32 mb-4 border-2 border-black rounded-lg"
            />
            <Button
              onClick={capture}
              className="px-2 mb-2 bg-green-800 text-white rounded-xl cursor-pointer"
            >
              {t("CaptureImage")}
            </Button>
          </div>

          {/* Display Captured Image */}
          <div className="flex flex-col items-center mx-4">
            {imgSrc === null ? (
              <div className="w-32 bg-slate-500 h-24 mb-4 border-2 border-black rounded-lg" />
            ) : (
              <img
                className="w-32 h-32 mb-4 border-2 border-black rounded-lg"
                src={imgSrc!}
                alt="webcam"
              />
            )}
          </div>
        </div>

        {/* Comment */}
        {/* <Input
          name="Comment"
          value={Comment}
          onChange={(e) => setComment(e.target.value)}
          className=" w-96 font-bold rounded-xl mb-4 border-slate-500"
          placeholder={t("EnterComment")}
        /> */}
      </div>

      {/* Buttons */}
      <div className="">
        <Button
          type="submit"
          className="px-6 py-2 bg-slate-600 text-white font-bold text-lg rounded-xl cursor-pointer mr-2"
        >
          {t("Clear")}
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="submit"
              className="px-6 py-2 bg-slate-600 text-white font-bold  text-lg rounded-xl cursor-pointer"
            >
              {t("Submit")}
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <div className="p-8 flex flex-col  justify-center min-h-auto">
              <div className="flex flex-col items-center">
                <div className="mb-4 text-black text-xl font-bold">
                  {t("TrackID", { id: trackId })}
                </div>
                <div className="mb-8 text-slate-400 text-2xl font-bold">
                  {t("title")}
                </div>
              </div>

              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-x-2 gap-y-4">
                  <Label
                    htmlFor="deviceName"
                    className="text-left text-lg font-bold "
                  >
                    {t("ProcessingType")}:
                  </Label>
                  <span>{ProcessingType}</span>
                </div>
                <div className="flex items-center gap-x-2 gap-y-4">
                  <Label
                    htmlFor="deviceSerial"
                    className="text-left text-lg font-bold "
                  >
                    {t("Location")}:
                  </Label>
                  <span>{Location}</span>
                </div>
                <div className="flex items-center gap-x-2 gap-y-4">
                  <Label
                    htmlFor="deviceModel"
                    className="text-left text-lg font-bold "
                  >
                    {t("ToolUsed")}:
                  </Label>
                  <span>{ToolUsed}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <img
                className="w-64 mb-4 border-2 border-black rounded-lg"
                src={imgSrc!}
                alt="webcam"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="px-6 py-2 bg-slate-600 text-white font-bold text-lg rounded-xl cursor-pointer mr-2">
                  {t("Edit")}
                </Button>
              </DialogClose>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button className="px-6 py-2 bg-slate-600 text-white font-bold text-lg rounded-lg cursor-pointer">
                    {t("Confirm")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center font-bold text-xl text-black">
                      {t("SuccessfullyRegisteredDevice")}
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <Button
                      className="px-6 py-2 bg-slate-600 text-white text-lg rounded-lg cursor-pointer"
                      onClick={() => {
                        handleSaveChanges();
                        router.push("/Tracking_registration");
                      }}
                    >
                      {t("OK")}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </form>
  );
};

export default TrackRegistrationFormPage;
