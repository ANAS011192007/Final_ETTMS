"use client";
import React from "react";
import InfoCard from "./information_card/page";
import TrackingCard from "./tracking_information_card/page";
import { useSearchParams } from "next/navigation";

function ShowTrackingInformationPage() {
  const searchparams = useSearchParams();
  const trackId = searchparams.get("track_id");
  const tracktag = searchparams.get("track_tag");
  console.log(tracktag);
  return (
    <div>
      <div className="p-4 w-[80%] ml-8">
        <InfoCard trackId={tracktag!} />
      </div>
      <div className="p-4 w-[80%] ml-8 ">
        <TrackingCard trackId={trackId!} />
      </div>
    </div>
  );
}

export default ShowTrackingInformationPage;
