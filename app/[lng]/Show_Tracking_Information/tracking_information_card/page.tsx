import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import trackingData from "../../../../data/db.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EditButton } from "./EditTrackingInfo";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { DeleteButton } from "./DeleteTrackingInfo";
import { AddButton } from "./AddTrackingInfo";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

interface TrackingData {
  id: string;
  "Processing Type": string;
  "Created at": string;
  Location: string;
  "Tool Used": string;
  "Recorded By"?: string;
  Image: string;
}

// async function getTrackingData() {
//   const res = await fetch("http://localhost:3001/trackingData");
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }
const TrackingCard = ({ trackId }: { trackId: string }) => {
  const record_summary = useRef(null);
  const dataList = useRef([[]]);
  const info = useRef(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const lng = pathname.split("/")[1];
  const { t } = useTranslation(lng, "TrackTable");
  const fetchData = async () => {
    try {
      // const session = await axios.post("http://localhost:3000/api/session");
      // const email = session.data.user.email;
      // const user = users.users.find((user: any) => user.body.email === email);
      const access_token = localStorage.getItem("access_token");
      // const tid = await axios.post(
      //   "http://192.168.87.107:5001/tracks/showTrackIdByTag",
      //   { tag_number: trackId },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${access_token}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // const trackid = tid.data.body.track_id;
      console.log(trackId);
      const infos = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/records/showAllRecordsOfFollowingDevice`,
        { device_id: trackId },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      info.current = infos.data.body;
      console.log("sadas", info.current!);
      dataList.current = infos.data.body.map((item: any) => ({
        id: item._id,
        "Processing Type": item.processing_type,
        "Created at": item.createdAt,
        Location: item.location,
        "Tool Used": item.tool.name_en,
        "Recorded By": `${item.recorded_by.first_name} ${item.recorded_by.last_name}`,
        Image: item.image_link,
      }));

      console.log(dataList);
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

  return (
    <div className="w-full ">
      <div className="flex justify-between items-end">
        <div className="text-slate-500 ml-4 text-base">{t("TrackInfo")}</div>
        {/* <AddButton buttonName={t("Add")} /> */}
      </div>
      <div className="border border-black rounded-md h-1/3 overflow-auto">
        <Table className="border-black rounded-lg w-full">
          <TableHeader className="text-center bg-slate-600 text-white">
            <TableRow className="text-center">
              <TableHead>{t("ProcessingType")}</TableHead>
              <TableHead>{t("CreatedAt")}</TableHead>
              <TableHead>{t("Location")}</TableHead>
              <TableHead>{t("ToolUsed")}</TableHead>
              <TableHead>{t("RecordedBy")}</TableHead>
              <TableHead>{t("Image")}</TableHead>
              <TableHead>{t("Action")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-center">
            {dataList.current!.map((data: any) => (
              <TableRow className="" key={data["id"]}>
                <TableCell className="font-medium">
                  {t("pType", { processingType: data["Processing Type"] })}
                </TableCell>
                <TableCell className="font-medium">
                  {data["Created at"]?.slice(0, 19)}
                </TableCell>
                <TableCell>{data.Location}</TableCell>
                <TableCell>{data["Tool Used"]}</TableCell>
                <TableCell>{data["Recorded By"]}</TableCell>
                <TableCell>
                  <Image
                    className="rounded-sm border border-black"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/${data["Image"]}`}
                    alt="image"
                    height={100}
                    width={100}
                  />
                  {/* <ImagePage /> */}
                </TableCell>
                <TableCell className="flex justify-end flex-col ">
                  {/* <EditButton trackingData={data} buttonName={t("Edit")} />
                  <Button className="bg-slate-600 text-xs w-16 h-4 rounded-full m-1 ">
                    {t("Report")}
                  </Button> */}
                  <DeleteButton trackingData={data} buttonName={t("Delete")} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TrackingCard;
