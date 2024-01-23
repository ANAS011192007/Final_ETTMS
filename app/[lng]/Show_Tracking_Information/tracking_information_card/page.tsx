import { useTranslation } from "@/app/i18n/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DeleteButton } from "./DeleteTrackingInfo";

interface TrackingData {
  id: string;
  "Processing Type": string;
  "Created at": string;
  Location: string;
  "Tool Used": string;
  "Recorded By"?: string;
  Image: string;
}

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
      const access_token = localStorage.getItem("access_token");

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
    fetchData();
  }, []);

  return (
    <div className="w-full ">
      <div className="flex justify-between items-end">
        <div className="text-slate-500 ml-4 text-base">{t("TrackInfo")}</div>
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
                </TableCell>
                <TableCell className="flex justify-end flex-col ">
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
