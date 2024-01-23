import React from "react";
import InfoCard from "./information_card/page";
import { TrackingCard } from "./tracking_information_card/page";

function ShowTrackingInformationPage() {
  return (
    <div className="">
      <div className="p-4 w-[80%] ml-8">
        <InfoCard />
      </div>
      <div className="p-4 w-[80%] ml-8">
        <TrackingCard />
      </div>
    </div>
  );
}

export default ShowTrackingInformationPage;
