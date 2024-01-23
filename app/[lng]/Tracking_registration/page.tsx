"use client";
import QRCodePage from "@/components/QRCode";
import { useSearchParams } from "next/navigation";

function TrackingRegistrationPage() {
  const searchparams = useSearchParams();
  const trackId = searchparams.get("track_id");
  return (
    <div className="">
      <QRCodePage Page="Track" trackId={trackId || undefined} />
    </div>
  );
}

export default TrackingRegistrationPage;
