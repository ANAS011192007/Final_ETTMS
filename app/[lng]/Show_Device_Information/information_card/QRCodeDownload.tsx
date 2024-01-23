"use client";
import React, { useRef } from "react";
import DeviceRegistrationData from "../../../../data/db.json";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";
import dynamic from "next/dynamic";
import { useTranslation } from "@/app/i18n/client";
import { usePathname } from "next/navigation";
const QRious = dynamic(
  () => import("react-qrious").then((module) => module.QRious),
  { ssr: false }
);

function QRCodeDownload() {
  const pathname = usePathname();
  const lng = pathname.split("/")[1];
  const { t } = useTranslation(lng, "DeviceInfoCard");
  const deviceData = DeviceRegistrationData.DeviceRegistrationData;
  const deviceIds = deviceData.map((device) => device.deviceid);
  const qrCodeContainerRefs = deviceIds.map(() => useRef<HTMLDivElement>(null));
  const downloadAllQRCodes = () => {
    console.log("Downloading all QR codes");

    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });

    pdf.setFontSize(15);
    pdf.text(
      "All QR Codes for Track",
      pdf.internal.pageSize.getWidth() / 2,
      10,
      { align: "center" }
    );

    deviceIds.forEach((id, index) => {
      const imageDataUrl =
        qrCodeContainerRefs[index]?.current?.querySelector("img")?.src;

      if (imageDataUrl) {
        const qrCodeSize = 20;
        const marginX = 50;
        const marginY = 20;

        const row = Math.floor(index / 3);
        const col = index % 3;

        const x = 20 + col * (qrCodeSize + marginX);
        const y = 20 + row * (qrCodeSize + marginY);

        pdf.addImage(imageDataUrl, "JPEG", x, y, qrCodeSize, qrCodeSize);

        pdf.setFontSize(10);
        pdf.text(id, x + qrCodeSize / 2, y + qrCodeSize + 5, {
          align: "center",
        });
      }
    });

    pdf.save("all_device_qrcodes.pdf");
  };
  return (
    <div>
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
        {/* <QRCode value={deviceId!} /> */}
      </Button>
      {deviceIds.map((id, index) => (
        <div key={id} ref={qrCodeContainerRefs[index]} className="hidden mt-4">
          <QRious value={id || ""} />
        </div>
      ))}
    </div>
  );
}

export default QRCodeDownload;
