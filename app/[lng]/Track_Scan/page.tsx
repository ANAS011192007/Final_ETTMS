"use client";
import QRScanPage from "@/components/QRScan";
import React from "react";
import { useSession, getSession } from "next-auth/react";
function TrackScanPage() {
  return (
    <div className="">
      <QRScanPage Page="Track" />
    </div>
  );
}

export default TrackScanPage;
