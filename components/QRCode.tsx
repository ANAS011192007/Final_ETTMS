"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useQRCode } from "next-qrcode";
import QRCode from "react-qr-code";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createRef } from "react";
import { QrReader } from "react-qr-reader";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useZxing } from "react-zxing";
import { Separator } from "./ui/separator";
import { useTranslation } from "@/app/i18n/client";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
// const users =
// // import { useMediaDevices } from "react-media-devices";
// // const constraints: MediaStreamConstraints = {
// //   video: true,
// //   audio: false,
// // };
function QRCodePage({ Page, trackId }: { Page: string; trackId?: string }) {
  // const session = auth();
  // if (!session) redirect("Login");
  // const { data: session, status } = useSession();
  // console.log("asdasd", session);
  // if (status !== "authenticated") {
  //   redirect("Login");
  // }

  const [data, setData] = useState("No result");
  // const [alertdata, setAlertData] = useState(false);
  const [showQRReader, setShowQRReader] = useState(false);

  const router = useRouter();
  const { ref } = useZxing({
    onDecodeResult(result) {
      setData(result.getText());

      const params = new URLSearchParams();
      if (Page === "Device") {
        if (data) params.append("device_id", result.getText());
        const query = params.size ? "?" + params.toString() : "";
        router.push(`Device_registration/form${query}`);
      } else {
        if (data) params.append("track_id", result.getText());
        const query = params.size ? "?" + params.toString() : "";
        router.push(`Tracking_registration/form${query}`);
      }
    },
    paused: !showQRReader,
  });
  // const handleScan = (result: any, error: any) => {
  //   if (!!result) {
  //     setData(result.text);
  //     const params = new URLSearchParams();
  //     if (data) params.append("data", result.text);
  //     const query = params.size ? "?" + params.toString() : "";

  //     router.push("/Device_registration/form" + query);

  //     console.log(result.text);
  //   }

  //   if (!!error) {
  //     console.info(error);
  //   }
  // };

  const handleQRButtonClick = () => {
    setShowQRReader(true);
  };

  // const handleInputChange = () => {
  //   // setData(e.target.value);
  //   const params = new URLSearchParams();
  //   if (Page === "Device") {
  //     if (data) params.append("device_id", data);
  //     const query = params.size ? "?" + params.toString() : "";
  //     router.push("/Device_registration/form" + query);
  //   } else {
  //     if (data) params.append("track_id", data);
  //     const query = params.size ? "?" + params.toString() : "";
  //     router.push("/Tracking_registration/form" + query);
  //   }
  // };

  const handleStopButtonClick = () => {
    setShowQRReader(false);
    // window.location.reload();
  };
  const pathname = usePathname();
  const lng = pathname.split("/")[1];
  const { t } = useTranslation(lng, "QRCode");
  console.log();
  return (
    <div className="flex justify-center">
      <div className="flex-col items-center p-16">
        <div className="mb-8 text-slate-600 text-lg font-bold">
          {Page === "Device" ? t("DeviceQR") : t("TrackQR")}
        </div>
        <div className="relative flex items-center justify-center ">
          {!showQRReader && (
            <QRCode className="w-64" fgColor="#475569" value="Data" />
          )}
          {!showQRReader && (
            <Button
              variant="outline"
              className="absolute px-4 py-6 bg-white text-black text-lg rounded-xl border-2 border-black cursor-pointer"
              onClick={handleQRButtonClick}
            >
              {t("Scan")}
            </Button>
          )}

          <div className="flex-col items-center justify-center">
            {showQRReader && (
              <div className="mb-4 text-center">
                <Button
                  className="px-6 py-2 bg-slate-600 text-white text-lg rounded-lg cursor-pointer"
                  onClick={handleStopButtonClick}
                >
                  {t("Stop")}
                </Button>
              </div>
            )}
            {/* <div className="w-64 p-2 border-2 border-slate-600 rounded-md"> */}
            {/* <QrReader
                  constraints={{
                    facingMode: "environment",
                  }}
                  onResult={handleScan}
                /> */}

            {/* </div> */}

            <video
              className="w-64  p-2 border-2 border-slate-600 rounded-md"
              ref={ref}
              style={{ display: showQRReader ? "" : "none" }}
            />
          </div>
        </div>
      </div>
      <div className=" relative h-96 border-r-2 border-black top-20"></div>

      <div className="flex-col items-center p-16">
        <div className="mb-8 text-slate-600 text-lg font-bold">
          {Page === "Device" ? t("DeviceInput") : t("TrackInput")}
        </div>
        <div className="flex flex-col items-center ">
          <Input
            type="text"
            value={trackId}
            onChange={(e) => {
              setData(e.target.value);
            }}
            // onChange={handleInputChange}
            placeholder={
              Page === "Device" ? t("Deviceplaceholder") : t("Trackplaceholder")
            }
            className="px-4 py-2 mb-4 border border-black rounded-md"
          />
          <Button
            className="mb- px-6 py-2 bg-slate-600 text-white text-lg rounded-3xl cursor-pointer"
            // Close QR reader
            onClick={() => {
              const params = new URLSearchParams();
              if (Page === "Device") {
                console.log(data);
                if (data) params.append("device_id", data);
                const query = params.size ? "?" + params.toString() : "";
                router.push("Device_registration/form" + query);
              } else {
                if (data) params.append("track_id", data);
                console.log(data);
                const query = params.size ? "?" + params.toString() : "";
                router.push("Tracking_registration/form" + query);
              }
            }}
          >
            {t("Submit")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QRCodePage;
