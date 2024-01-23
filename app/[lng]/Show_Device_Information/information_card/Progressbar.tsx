"use client";
import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";

const Progressbar = () => {
  return (
    <div>
      {" "}
      <ProgressBar isLabelVisible={false} bgColor="#0D47A1" completed={100} />
    </div>
  );
};

export default Progressbar;
