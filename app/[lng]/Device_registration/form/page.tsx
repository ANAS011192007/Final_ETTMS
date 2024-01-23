// Import necessary libraries
"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { ObjectId } from "mongodb";
import { Button } from "@radix-ui/themes";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import router, { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { useDeviceRegistrationStore } from "../../../store";
import { useTranslation } from "../../../i18n/client";
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
import axios from "axios";
import { getSession } from "next-auth/react";
import { auth } from "@/auth";
import users from "@/data/db.json";
// Functional component for the registration page
const DeviceRegistrationFormPage = () => {
  // const { data: session, status } = useSession();
  // console.log("asdas", status);
  const pathname = usePathname();
  const lng = pathname.split("/")[1];
  console.log(lng);
  const { t } = useTranslation(lng, "DeviceForm");
  const Name = useDeviceRegistrationStore((state) => state.Name);
  const setName = useDeviceRegistrationStore((state) => state.setName);
  const Serial = useDeviceRegistrationStore((state) => state.Serial);
  const setSerial = useDeviceRegistrationStore((state) => state.setSerial);
  const Model = useDeviceRegistrationStore((state) => state.Model);
  const setModel = useDeviceRegistrationStore((state) => state.setModel);
  const Type = useDeviceRegistrationStore((state) => state.Type);
  const setType = useDeviceRegistrationStore((state) => state.setType);
  const Manufacturer = useDeviceRegistrationStore(
    (state) => state.Manufacturer
  );
  const setManufacturer = useDeviceRegistrationStore(
    (state) => state.setManufacturer
  );
  const Specification = useDeviceRegistrationStore(
    (state) => state.Specification
  );
  const setSpecification = useDeviceRegistrationStore(
    (state) => state.setSpecification
  );

  React.useEffect(() => {
    setName("");
    setSerial("");
    setModel("");
    setType("");
    setManufacturer("");
    setSpecification("");
  }, []);
  const searchparams = useSearchParams();
  const deviceId = searchparams.get("device_id");

  const handleSaveChanges = async () => {
    try {
      // const session = await axios.post("http://localhost:3000/api/session");
      // const email = session.data.user.email;
      // const user = users.users.find((user: any) => user.body.email === email);
      // const access_token = user?.access_token;
      // console.log(access_token);
      const access_token = localStorage.getItem("access_token");
      const createdAt = new Date();
      const tid = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tracks/showTrackIdByTag`,
        { tag_number: deviceId },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const trackid = tid.data.body.track_id;
      const requestData = {
        name: Name,
        serial: Serial,
        model: Model,
        device_type: Type,
        manufacturer: Manufacturer,
        spacifications: Specification,
        // CreatedAt: createdAt.toLocaleString("en-US", {
        //   month: "numeric",
        //   day: "numeric",
        //   year: "numeric",
        //   hour: "numeric",
        //   minute: "numeric",
        //   second: "numeric",
        //   hour12: true,
        // }),
        // track: new ObjectId(parseInt(deviceId!)),

        track: trackid,
      };

      // const response = await axios.post(
      //   "http://localhost:3001/DeviceRegistrationData/",
      //   requestData
      // );
      // const response = await axios.post(
      //   "http://192.168.87.107:5001/devices/createDeviceWithModel",
      //   requestData
      // );
      // const response = await fetch(
      //   "http://192.168.87.107:5001/devices/createDeviceWithModel",
      //   {
      //     method: "POST",
      //     body: JSON.stringify(requestData),
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/devices/createDeviceWithModel`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response data:", response.data);
      if (!response) {
        throw Error("Failed to add tracking info");
      }

      console.log("Add successful");
    } catch (error) {
      console.error("Error adding tracking info:", error);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };
  const router = useRouter();
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-16 ">
      {/* Device Registration */}
      <div className="mb-8 text-slate-600 text-2xl font-bold">{t("title")}</div>

      {/* Tracking ID */}
      <div className="mb-4 text-black text-2xl font-bold">
        {t("DeviceID", { id: deviceId })}
      </div>

      {/* Input Fields */}
      <div className="flex flex-col items-center">
        {/* 6 Input Fields */}
        <div className="mb-4">
          <Input
            name="deviceName"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className=" w-96 font-bold rounded-xl mb-4 border-slate-500"
            placeholder={t("EnterDeviceName")}
          />
          <Input
            name="deviceSerial"
            value={Serial}
            onChange={(e) => setSerial(e.target.value)}
            className=" w-96 font-bold rounded-xl mb-4 border-slate-500"
            placeholder={t("EnterDeviceSerial")}
          />
          <Input
            name="deviceModel"
            value={Model}
            onChange={(e) => setModel(e.target.value)}
            className=" w-96 font-bold rounded-xl mb-4 border-slate-500"
            placeholder={t("EnterDeviceModel")}
          />
          <Select onValueChange={(value) => setType(value)}>
            <SelectTrigger className="w-96 font-bold rounded-xl mb-4 border-slate-500">
              <SelectValue placeholder={t("SelectAnItem")} />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup>
                <SelectItem value="laptop" className="text-black">
                  {t("Laptop")}
                </SelectItem>
                <SelectItem value="tablet" className="text-black">
                  {t("Tablet")}
                </SelectItem>
                <SelectItem value="mobile" className="text-black">
                  {t("Mobile")}
                </SelectItem>
                <SelectItem value="hdd" className="text-black">
                  {t("HDD")}
                </SelectItem>
                <SelectItem value="sdd" className="text-black">
                  {t("SSD")}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            name="deviceManufacturer"
            value={Manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className=" w-96 font-bold rounded-xl mb-4 border-slate-500"
            placeholder={t("EnterDeviceManufacturer")}
          />
          <Input
            name="deviceSpecification"
            value={Specification}
            onChange={(e) => setSpecification(e.target.value)}
            className=" w-96 font-bold rounded-xl mb-4 border-slate-500"
            placeholder={t("EnterDeviceSpecification")}
          />
        </div>
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
              className="px-6 py-2 bg-slate-600 text-white font-bold text-lg rounded-xl cursor-pointer"
            >
              {t("Submit")}
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <div className="p-8 flex flex-col justify-center min-h-auto">
              <div className="flex flex-col items-center">
                {/* Tracking ID */}
                <div className="mb-4 text-black text-xl font-bold">
                  {t("DeviceID", { id: deviceId })}
                </div>
                <div className="mb-8 text-slate-400 text-2xl font-bold">
                  {t("DeviceRegistration")}
                </div>
              </div>

              {/* Remaining content aligned to the left */}
              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-x-2 gap-y-4">
                  <Label
                    htmlFor="deviceName"
                    className="text-left text-lg font-bold "
                  >
                    {t("Name")}
                  </Label>
                  <span>{Name}</span>
                </div>
                <div className="flex items-center gap-x-2 gap-y-4">
                  <Label
                    htmlFor="deviceSerial"
                    className="text-left text-lg font-bold "
                  >
                    {t("Serial")}
                  </Label>
                  <span>{Serial}</span>
                </div>
                <div className="flex items-center gap-x-2 gap-y-4">
                  <Label
                    htmlFor="deviceModel"
                    className="text-left text-lg font-bold "
                  >
                    {t("Model")}
                  </Label>
                  <span>{Model}</span>
                </div>
                <div className="flex items-center gap-x-2 gap-y-4">
                  <Label
                    htmlFor="deviceType"
                    className="text-left text-lg font-bold "
                  >
                    {t("Type")}
                  </Label>
                  <span>{Type}</span>
                </div>
                <div className="flex items-center gap-x-2 gap-y-4">
                  <Label
                    htmlFor="deviceManufacturer"
                    className="text-left text-lg font-bold "
                  >
                    {t("Manufacturer")}
                  </Label>
                  <span>{Manufacturer}</span>
                </div>
                <div className="flex items-center gap-x-2 gap-y-4">
                  <Label
                    htmlFor="deviceSpecification"
                    className="text-left text-lg font-bold "
                  >
                    {t("Specification")}
                  </Label>
                  <span>{Specification}</span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button className="px-6 py-2 bg-slate-600 text-white font-bold text-lg rounded-xl cursor-pointer mr-2">
                  {t("Edit")}
                </Button>
              </DialogClose>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button className="px-6 py-2 bg-slate-600 text-white text-lg rounded-xl font-bold cursor-pointer">
                    {t("Confirm")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogDescription className="text-center font-bold text-xl text-black">
                      {t("SuccessfullyRegisteredDevice")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <Button
                      className="px-6 py-2 bg-slate-600 text-white text-lg rounded-lg cursor-pointer"
                      onClick={() => {
                        handleSaveChanges();
                        router.push("/Device_registration");
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

export default DeviceRegistrationFormPage;
