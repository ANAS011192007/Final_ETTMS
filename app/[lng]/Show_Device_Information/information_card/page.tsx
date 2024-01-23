"use client";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProgressBar from "@ramonak/react-progress-bar";
import { BsClockHistory } from "react-icons/bs";
import { FaCircle, FaCircleDot } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import DeviceRegistrationData from "../../../../data/db.json";
import Circle from "react-circle";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { jsPDF } from "jspdf";
import QRCodeDownload from "./QRCodeDownload";
import Progressbar from "./Progressbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { PieChart, Pie, Cell } from "recharts";
// Dynamic import of QRious
const QRious = dynamic(
  () => import("react-qrious").then((module) => module.QRious),
  { ssr: false }
);
import users from "@/data/db.json";
import PieChartComponent from "@/components/chart";
const InfoCard = () => {
  const record_summary: any = useRef(null);
  const info: any = useRef(null);
  const device_tags = useRef([]);
  const [loading, setLoading] = useState(true);
  // const [record_summary, SetRecordSummary] = useState();
  const percentage = 100;
  const circumference = 2 * Math.PI * 30;
  // const dashArray = circumference;
  const dashOffset = ((100 - percentage) / 100) * circumference;
  // const total = 3;
  // const completed = 1;
  // const inProgress = 1;
  // const remaining = 1;

  // const completedPercentage = (completed / total) * 100;
  // const inProgressPercentage = (inProgress / total) * 100;
  // const remainingPercentage = (remaining / total) * 100;

  // const completedPercentage = (completed / total) * 100;
  // const inProgressPercentage = (inProgress / total) * 100;
  // const remainingPercentage = (remaining / total) * 100;
  // const dashArray = 2 * Math.PI * 30;
  // const completedDashOffset = 0;
  // const inProgressDashOffset = (completed / total) * dashArray;
  // const remainingDashOffset = ((completed + inProgress) / total) * dashArray;
  // console.log(completedDashOffset);
  // console.log(inProgressDashOffset);
  // console.log(remainingDashOffset);
  // const session = await axios.post("http://localhost:3000/api/tid");
  // console.log("asdasdas", session);
  const searchparams = useSearchParams();
  const deviceId = searchparams.get("device_id");
  const page = searchparams.get("page");
  const pathname = usePathname();
  const lng = pathname.split("/")[1];
  const { t } = useTranslation(lng, "DeviceInfoCard");
  const deviceData = DeviceRegistrationData.DeviceRegistrationData;
  const deviceIds = deviceData.map((device) => device.deviceid);
  const qrCodeContainerRefs = deviceIds.map(() => useRef<HTMLDivElement>(null));
  const downloadAllQRCodes = () => {
    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });
    pdf.setFont("normal", "bold");
    pdf.setFontSize(15);
    pdf.text(
      "All QR Codes for Device",
      pdf.internal.pageSize.getWidth() / 2,
      10,
      { align: "center" }
    );
    pdf.text(`Track : ${deviceId}`, pdf.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });
    pdf.setFont("normal", "normal");
    device_tags.current.forEach((id, index) => {
      const imageDataUrl =
        qrCodeContainerRefs[index]?.current?.querySelector("img")?.src;

      if (imageDataUrl) {
        const qrCodeSize = 20;
        const marginX = 50;
        const marginY = 20;

        const row = Math.floor(index / 3);
        const col = index % 3;

        const x = 20 + col * (qrCodeSize + marginX);
        const y = 30 + row * (qrCodeSize + marginY);

        pdf.addImage(imageDataUrl, "JPEG", x, y, qrCodeSize, qrCodeSize);

        pdf.setFontSize(10);
        pdf.text(id, x + qrCodeSize / 2, y + qrCodeSize + 5, {
          align: "center",
        });
      }
    });

    pdf.save("all_device_qrcodes.pdf");
  };

  const fetchData = async () => {
    try {
      // const session = await axios.post("http://localhost:3000/api/session");
      // const email = session.data.user.email;
      // const user = users.users.find((user: any) => user.body.email === email);
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
      const devicerecordSummaryResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tracks/showTrackDetailsById`,
        { track_id: trackid },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      record_summary.current =
        devicerecordSummaryResponse.data.body.device_summary;

      const infos = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/devices/showAllActiveDevicesOfFollowingTrack`,
        { track_id: trackid },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      device_tags.current = infos.data.body.map(
        (device: any) => device.device_tag
      );
      console.log(device_tags.current);
      info.current = infos.data.body[0];
      // device_tags.current = info.current!.map((device) => device.device_tag);
      setLoading(false);
      // Your logic with the session data
    } catch (error) {
      console.error("Error fetching session data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Call the async function immediately
  }, []); // Dependencies array can be adjusted based on your needs
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div>
      {/* <div className="text-xs">
        <span className="text-slate-500">Project Board</span> &gt; Track Board
        &gt; Device Board &gt; Record Board
      </div> */}

      <Card className="w-full">
        {/* <CardHeader>
          <CardDescription>Track Information</CardDescription>
          <CardTitle>TID 16977747770326.3</CardTitle>
        </CardHeader> */}
        <CardContent>
          <div className="flex justify-between mt-2">
            <div className="flex-row">
              <div className="text-slate-600 font-semibold ">
                {t("TrackInformation")}
              </div>
              <div className="font-bold text-xl">{deviceId}</div>
            </div>
            <div className="w-64 flex-row justify-end">
              <div className="flex justify-end">
                <BsClockHistory className="text-green-300 inline" />
                <span className="ml-1 text-sm text-green-300">
                  {t("Running")}
                </span>
              </div>
              <div className="">
                <Progressbar />
              </div>
              <div className="text-xs flex justify-center">
                {t("RecordsCompleted")} {info.current?.record_summary.completed}
                /{info.current?.record_summary.total}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between text-xs xl:text-sm">
            <div className="flex w-[65%]">
              <div className="w-1/2">
                <div className="flex">
                  <div className="w-1/3 text-slate-500">{t("Status")}</div>
                  <div className="w-2/3 text-orange-200">
                    {info.current?.status}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-slate-500">{t("Project")}</div>
                  <div className="w-2/3">{info.current?.project.name_en}</div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-slate-500">{t("Request")}</div>
                  <div className="w-2/3">
                    {info.current?.request_type.title_en}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-slate-500">{t("CreatedDate")}</div>
                  <div className="w-2/3">
                    {info.current?.createdAt.slice(0, 10)}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-slate-500">{t("Duration")}</div>
                  <div className="w-2/3">
                    {info.current?.start_date.slice(0, 10)} ~{" "}
                    {info.current?.end_date.slice(0, 10)}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-slate-500">{t("Deadline")}</div>
                  <div className="w-2/3 text-red-400">
                    {info.current?.deadline.slice(0, 10)}
                  </div>
                </div>
              </div>
              {/* <div className="w-1/3">
              <div className="text-slate-500">Device's Details</div>
              <div className="flex">
                <div className="w-1/3 text-slate-500">Device Type</div>
                <div className="w-2/3 ">laptop</div>
              </div>
              <div className="flex">
                <div className="w-1/3 text-slate-500">Serial</div>
                <div className="w-2/3">H6234323</div>
              </div>
              <div className="flex">
                <div className="w-1/3 text-slate-500">Model</div>
                <div className="w-2/3">HP8888</div>
              </div>
              <div className="flex flex-col 2xl:flex-row">
                <div className="w-full 2xl:w-1/3 text-slate-500">
                  Manufacturer
                </div>
                <div className="w-full 2xl:w-2/3">Dell</div>
              </div>

              <div className="flex flex-col 2xl:flex-row">
                <div className="w-full 2xl:w-1/3  text-slate-500">
                  Specification
                </div>
                <div className="w-full 2xl:w-2/3">Ram 4GB, ROM 1TB</div>
              </div>
            </div> */}
              <div className="w-1/2 flex flex-row justify-end">
                <div className="flex-col">
                  <div className="text-slate-500 2xl:mb-1">
                    {t("DeviceSummary")}
                  </div>
                  <div className="flex 2xl:mb-1">
                    <div className="w-3/4 text-slate-500 2xl:mb-1">
                      {t("Total")}
                    </div>
                    <div className="w-1/4 text-center">
                      {record_summary.current?.total}
                    </div>
                  </div>
                  <div className="flex 2xl:mb-1">
                    <div className="w-3/4 text-slate-500">
                      <FaCircle className="text-blue-900 inline mr-0.5" />
                      {t("Completed")}
                    </div>
                    <div className="w-1/4 text-center">
                      {record_summary.current?.completed}
                    </div>
                  </div>

                  <div className="flex 2xl:mb-1">
                    <div className="w-3/4 text-slate-500">
                      <FaCircle className="text-slate-500 inline mr-0.5" />
                      {t("InProgress")}
                    </div>
                    <div className="w-1/4 text-center">
                      {record_summary.current?.inProgress}
                    </div>
                  </div>
                  {/* <div className="flex flex-col 2xl:flex-row 2xl:mb-1">
                    <div className="w-full 2xl:w-3/4 text-slate-500">
                      <FaCircle className="text-slate-500 inline" />
                      {t("InProgress")}
                    </div>
                    <div className="w-full 2xl:w-1/4">
                      {record_summary.current?.inProgress}
                    </div>
                  </div> */}
                  <div className="flex 2xl:mb-1">
                    <div className="w-3/4 text-slate-500">
                      <FaCircle className="text-slate-200 inline mr-0.5" />
                      {t("Remaining")}
                    </div>
                    <div className="w-1/4 text-center">
                      {record_summary.current?.remaining}
                    </div>
                  </div>

                  {/* <div className="flex items-center text-slate-500">
                    <div className="w-3/4 flex items-center">
                      <FaCircle className="text-slate-200" />
                      Remaining
                    </div>
                    <div className="w-1/4">0</div>
                  </div> */}
                </div>
                <div className=" flex  items-center justify-right">
                  <PieChartComponent
                    completedPercentage={
                      (record_summary.current?.completed /
                        record_summary.current?.total) *
                      100
                    }
                    inProgressPercentage={
                      (record_summary.current?.inProgress /
                        record_summary.current?.total) *
                      100
                    }
                    remainingPercentage={
                      (record_summary.current?.remaining /
                        record_summary.current?.total) *
                      100
                    }
                  />
                  {/* <FaCircleDot className="text-blue-900 text-6xl" /> */}
                  {/* <svg height="100" width="100"> */}
                  {/* <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      stroke="#0D47A1"
                      strokeWidth="20"
                      fill="white"
                      strokeDasharray={dashArray}
                      strokeDashoffset={dashOffset}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      stroke="#000000"
                      strokeWidth="20"
                      fill="white"
                      strokeDasharray={dashArray}
                      strokeDashoffset={dashOffset}
                    />
                  </svg> */}
                  {/* Completed (Blue) */}
                  {/* <circle
                      cx="50"
                      cy="50"
                      r="30"
                      stroke="#0000FF"
                      strokeWidth="20"
                      fill="transparent"
                      strokeDasharray={`${completedDashOffset} ${inProgressDashOffset} ${remainingDashOffset} ${circumference}`}
                      strokeDashoffset="0"
                    /> */}

                  {/* <circle
                      cx="50"
                      cy="50"
                      r="30"
                      stroke="#0000FF"
                      strokeWidth="20"
                      fill="white"
                      strokeDasharray={dashArray}
                      strokeDashoffset={completedDashOffset}
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      stroke="#808080"
                      strokeWidth="20"
                      fill="white"
                      strokeDasharray={dashArray}
                      strokeDashoffset={inProgressDashOffset}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      stroke="#D3D3D3"
                      strokeWidth="20"
                      fill="white"
                      strokeDasharray={dashArray}
                      strokeDashoffset={remainingDashOffset}
                    /> */}
                  {/* </svg> */}
                  {/* <Circle progress={100} lineWidth="50" progressColor="#0D47A1" /> */}
                </div>
              </div>
            </div>
            <div className="flex w-[35%] justify-end">
              <div className="flex flex-row justify-end">
                <div className="flex-col">
                  <div className="text-slate-500 2xl:mb-1">
                    {t("RecordSummary")}
                  </div>
                  <div className="flex">
                    <div className="w-3/4 text-slate-500 2xl:mb-1">
                      {t("Total")}
                    </div>
                    <div className="w-1/4 text-center">
                      {info.current?.record_summary.total}
                    </div>
                  </div>
                  <div className="flex items-center 2xl:mb-1">
                    <div className="w-3/4 flex items-center text-slate-500">
                      <FaCircle className="text-blue-900 mr-0.5" />
                      {t("Completed")}
                    </div>
                    <div className="w-1/4 text-center">
                      {info.current?.record_summary.completed}
                    </div>
                  </div>
                  <div className="flex items-center text-slate-500 2xl:mb-1">
                    <div className="w-3/4 flex items-center">
                      <FaCircle className="text-slate-500 mr-0.5" />
                      {t("Remaining")}
                    </div>
                    <div className="w-1/4 text-center">
                      {info.current?.record_summary.remaining}
                    </div>
                  </div>
                </div>
                <div className=" flex  items-center justify-right ">
                  {/* <FaCircleDot className="text-blue-900 text-6xl" /> */}
                  {/* <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      stroke="#0D47A1"
                      strokeWidth="20"
                      fill="white"
                      strokeDasharray={dashArray}
                      strokeDashoffset="0"
                    /> */}
                  {/* <circle
                      cx="50"
                      cy="50"
                      r="30"
                      stroke="#0D47A1"
                      strokeWidth="20"
                      fill="white"
                      strokeDasharray={dashArray}
                      strokeDashoffset="50"
                    /> */}
                  {/* <circle
                      cx="50"
                      cy="50"
                      r="30"
                      stroke="#008000"
                      strokeWidth="20"
                      fill="white"
                      strokeDasharray={dashArray}
                      strokeDashoffset="0"
                    /> */}
                  {/* <circle
                      cx="50"
                      cy="50"
                      r="30"
                      stroke="#000000"
                      strokeWidth="20"
                      fill="white"
                      strokeDasharray={dashArray}
                      strokeDashoffset="66"
                    /> */}
                  {/* <circle
                      cx="50"
                      cy="50"
                      r="30"
                      stroke="#0D47A1"
                      strokeWidth="20"
                      fill="white"
                      strokeDasharray={dashArray}
                      strokeDashoffset="66"
                    /> */}
                  {/* </svg> */}
                  <PieChartComponent
                    completedPercentage={
                      (info.current?.record_summary.completed /
                        info.current?.record_summary.total) *
                      100
                    }
                    inProgressPercentage={0}
                    remainingPercentage={
                      (info.current?.record_summary.remaining /
                        info.current?.record_summary.total) *
                      100
                    }
                  />
                  {/* <Circle progress={100} lineWidth="50" progressColor="#0D47A1" /> */}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {/* <Button
            className="border-blue-300 text-slate-500 mr-2"
            variant="outline"
          >
            <MdOutlineFileDownload className="mr-2" />
            {t("CSVFile")}
          </Button> */}
          <Button
            className="border-blue-300 text-slate-500"
            onClick={() => {
              // toggleQRCode();
              downloadAllQRCodes();
            }}
            variant="outline"
          >
            <MdOutlineFileDownload className="mr-2" />
            {t("QRCode")}
          </Button>
          {/* <QRCodeDownload /> */}
          {/* {device_tags.current!.map((deviceTag, index) => (
            <div
              key={deviceTag}
              ref={qrCodeContainerRefs[index]}
              className="hidden mt-4"
            >
              <QRious value={deviceTag || ""} />
            </div>
          ))} */}
          {/* {device_tags.current!.map((deviceTag, index) => (
            <div
              key={deviceTag}
              ref={qrCodeContainerRefs[index]}
              className="hidden mt-4"
            >
              <QRious value={deviceTag || ""} />
            </div>
          ))} */}
          {device_tags.current!.map((deviceTag, index) => (
            <div
              key={deviceTag}
              ref={qrCodeContainerRefs[index]}
              className="hidden mt-4"
            >
              <QRious value={deviceTag || ""} />
            </div>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
};

export default InfoCard;
