"use client";
import { useTranslation } from "@/app/i18n/client";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import QRCode from "react-qr-code";
import { useZxing } from "react-zxing";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function QRScanPage({ Page, trackId }: { Page: string; trackId?: string }) {
  const [data, setData] = useState("No result");

  const [showQRReader, setShowQRReader] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const router = useRouter();
  const { ref } = useZxing({
    onDecodeResult(result) {
      setData(result.getText());
      handleDecodedData(result.getText());
    },
    paused: !showQRReader,
  });

  const handleDecodedData = async (datas: string) => {
    const params = new URLSearchParams();

    try {
      if (Page === "Device") {
        let access_token;

        if (localStorage.getItem("access_token") === undefined) {
          access_token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODFhMzQzMWQzYzI2YzU2YzhkN2ZiNSIsImVtYWlsIjoiYWRtaW5AdGVzdC5pbyIsImZpcnN0X25hbWUiOiJUZXN0IiwibGFzdF9uYW1lIjoiQWRtaW4iLCJjb250YWN0X251bWJlciI6IjAxNjExMTExMTExIiwib3JnYW5pemF0aW9uIjoiNjQ4MTllYzljZGI5MzY2M2Y1ODQyOWQyIiwib3JnYW5pemF0aW9uX25hbWVfZW4iOiJUZXN0IE9mZmljZSAxIiwib3JnYW5pemF0aW9uX25hbWVfanAiOiLjg4bjgrnjg4jjgqrjg5XjgqPjgrkxIiwiaWF0IjoxNzA1OTgwNDkwLCJleHAiOjE3MDg1NzI0OTB9.YF1cru1HsiMuy5qqCehzglfz91BWs3kcCsKuxAdZJcA";
          localStorage.setItem("access_token", access_token!);
          console.log("asasasa", localStorage.getItem("access_token"));
        } else {
          access_token = localStorage.getItem("access_token");
        }

        const tid = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/tracks/showTrackIdByTag`,
          { tag_number: datas },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(tid);

        const devicerecordSummaryResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/devices/showAllActiveDevicesOfFollowingTrack`,
          { track_id: tid.data.body?.track_id },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (datas) params.append("device_id", datas);

        const query = params.size ? "?" + params.toString() : "";

        if (devicerecordSummaryResponse.data.status === 200) {
          router.push(`Show_Device_Information${query}`);
        } else {
          toast.error("This device has not been registered yet.");
        }
      } else {
        if (data) {
          params.append("track_tag", data);
        }

        let access_token;

        if (localStorage.getItem("access_token") === undefined) {
          access_token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODFhMzQzMWQzYzI2YzU2YzhkN2ZiNSIsImVtYWlsIjoiYWRtaW5AdGVzdC5pbyIsImZpcnN0X25hbWUiOiJUZXN0IiwibGFzdF9uYW1lIjoiQWRtaW4iLCJjb250YWN0X251bWJlciI6IjAxNjExMTExMTExIiwib3JnYW5pemF0aW9uIjoiNjQ4MTllYzljZGI5MzY2M2Y1ODQyOWQyIiwib3JnYW5pemF0aW9uX25hbWVfZW4iOiJUZXN0IE9mZmljZSAxIiwib3JnYW5pemF0aW9uX25hbWVfanAiOiLjg4bjgrnjg4jjgqrjg5XjgqPjgrkxIiwiaWF0IjoxNzA1OTgwNDkwLCJleHAiOjE3MDg1NzI0OTB9.YF1cru1HsiMuy5qqCehzglfz91BWs3kcCsKuxAdZJcA";
          localStorage.setItem("access_token", access_token!);
          console.log("asasasa", localStorage.getItem("access_token"));
        } else {
          access_token = localStorage.getItem("access_token");
          console.log("paisi");
        }

        const tid = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/devices/showDeviceDetailsByDevicetag`,
          { device_tag: data },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(tid);

        const devicerecordSummaryResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/records/showAllRecordsOfFollowingDevice`,
          { device_id: tid.data.body._id },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (devicerecordSummaryResponse.data.status === 200) {
          params.append("track_id", tid.data.body._id);
          const query = params.size ? "?" + params.toString() : "";
          router.push(`Show_Tracking_Information${query}`);
        } else {
          toast.error("This device has not been registered yet.");
        }
      }
    } catch (error: any) {
      console.error("Error:", error);

      if (error.response) {
        toast.error(error.response.statustext);
      }
    }
  };

  const handleQRButtonClick = () => {
    setShowQRReader(true);
  };

  const handleStopButtonClick = () => {
    setShowQRReader(false);
    // window.location.reload();
  };
  const pathname = usePathname();
  const lng = pathname.split("/")[1];
  const { t } = useTranslation(lng, "QRCode");
  console.log();
  return (
    <div>
      <div className="text-center p-4 text-2xl font-bold">
        {Page == "Device" ? "Device Information" : "Tracking Information"}
      </div>

      <div className="flex  justify-center">
        <div className="flex-col items-center p-16">
          <div className="mb-8 text-slate-600 text-lg font-bold">
            {Page === "Device" ? t("DeviceQRScan") : t("TrackQRScan")}
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

              <video
                className="w-64 p-2 border-2 border-slate-600 rounded-md"
                ref={ref}
                style={{ display: showQRReader ? "" : "none" }}
              />
            </div>
          </div>
        </div>
        <div className=" relative h-96 border-r-2 border-black top-20"></div>

        <div className="flex-col items-center p-16">
          <div className="mb-8 text-slate-600 text-lg font-bold">
            {Page === "Device" ? t("DeviceInputScan") : t("TrackInputScan")}
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
                Page === "Device"
                  ? t("Deviceplaceholder")
                  : t("Trackplaceholder")
              }
              className="px-4 py-2 mb-4 border border-black rounded-md"
            />
            <Button
              className="px-6 py-2 bg-slate-600 text-white text-lg rounded-3xl cursor-pointer"
              // Close QR reader
              onClick={async () => {
                const params = new URLSearchParams();
                try {
                  if (Page === "Device") {
                    console.log("dataaa", data);
                    if (data) params.append("device_id", data);
                    const query = params.size ? "?" + params.toString() : "";
                    let access_token;
                    if (localStorage.getItem("access_token") === undefined) {
                      access_token =
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODFhMzQzMWQzYzI2YzU2YzhkN2ZiNSIsImVtYWlsIjoiYWRtaW5AdGVzdC5pbyIsImZpcnN0X25hbWUiOiJUZXN0IiwibGFzdF9uYW1lIjoiQWRtaW4iLCJjb250YWN0X251bWJlciI6IjAxNjExMTExMTExIiwib3JnYW5pemF0aW9uIjoiNjQ4MTllYzljZGI5MzY2M2Y1ODQyOWQyIiwib3JnYW5pemF0aW9uX25hbWVfZW4iOiJUZXN0IE9mZmljZSAxIiwib3JnYW5pemF0aW9uX25hbWVfanAiOiLjg4bjgrnjg4jjgqrjg5XjgqPjgrkxIiwiaWF0IjoxNzA1OTgwNDkwLCJleHAiOjE3MDg1NzI0OTB9.YF1cru1HsiMuy5qqCehzglfz91BWs3kcCsKuxAdZJcA";
                      localStorage.setItem("access_token", access_token!);
                      console.log(
                        "asasasa",
                        localStorage.getItem("access_token")
                      );
                    } else {
                      access_token = localStorage.getItem("access_token");
                      console.log("paisi");
                    }
                    const tid = await axios.post(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/tracks/showTrackIdByTag`,
                      { tag_number: data },
                      {
                        headers: {
                          Authorization: `Bearer ${access_token}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    console.log(tid);
                    const devicerecordSummaryResponse = await axios.post(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/devices/showAllActiveDevicesOfFollowingTrack`,
                      { track_id: tid.data.body.track_id },
                      {
                        headers: {
                          Authorization: `Bearer ${access_token}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    if (devicerecordSummaryResponse.data.status === 200)
                      router.push(`Show_Device_Information${query}`);
                    else {
                      toast.error("This device has not been registered yet.");
                    }
                  } else {
                    console.log("dataaa", data);
                    if (data) {
                      params.append("track_tag", data);
                    }

                    let access_token;
                    if (localStorage.getItem("access_token") === undefined) {
                      access_token =
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODFhMzQzMWQzYzI2YzU2YzhkN2ZiNSIsImVtYWlsIjoiYWRtaW5AdGVzdC5pbyIsImZpcnN0X25hbWUiOiJUZXN0IiwibGFzdF9uYW1lIjoiQWRtaW4iLCJjb250YWN0X251bWJlciI6IjAxNjExMTExMTExIiwib3JnYW5pemF0aW9uIjoiNjQ4MTllYzljZGI5MzY2M2Y1ODQyOWQyIiwib3JnYW5pemF0aW9uX25hbWVfZW4iOiJUZXN0IE9mZmljZSAxIiwib3JnYW5pemF0aW9uX25hbWVfanAiOiLjg4bjgrnjg4jjgqrjg5XjgqPjgrkxIiwiaWF0IjoxNzA1OTgwNDkwLCJleHAiOjE3MDg1NzI0OTB9.YF1cru1HsiMuy5qqCehzglfz91BWs3kcCsKuxAdZJcA";
                      localStorage.setItem("access_token", access_token!);
                      console.log(
                        "asasasa",
                        localStorage.getItem("access_token")
                      );
                    } else {
                      access_token = localStorage.getItem("access_token");
                      console.log("paisi");
                    }
                    const tid = await axios.post(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/devices/showDeviceDetailsByDevicetag`,
                      { device_tag: data },
                      {
                        headers: {
                          Authorization: `Bearer ${access_token}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    console.log(tid);
                    const devicerecordSummaryResponse = await axios.post(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/records/showAllRecordsOfFollowingDevice`,
                      { device_id: tid.data.body._id },
                      {
                        headers: {
                          Authorization: `Bearer ${access_token}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    if (devicerecordSummaryResponse.data.status === 200) {
                      params.append("track_id", tid.data.body._id);
                      const query = params.size ? "?" + params.toString() : "";
                      router.push(`Show_Tracking_Information${query}`);
                    } else {
                      toast.error("This device has not been registered yet.");
                    }
                  }
                } catch (error: any) {
                  if (error.response) {
                    toast.error(error.response.statustext);
                  } else {
                    console.error("Error:", error);
                  }
                }
              }}
            >
              {t("Submit")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRScanPage;
