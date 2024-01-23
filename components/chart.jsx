import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0D47A1", "#64748b", "#e2e8f0"];

const PieChartComponent = ({
  completedPercentage,
  inProgressPercentage,
  remainingPercentage,
}) => (
  <PieChart width={100} height={100}>
    <Pie
      data={[
        { name: "Completed", value: completedPercentage },
        inProgressPercentage > 0 && { name: "In Progress", value: inProgressPercentage },
        { name: "Remaining", value: remainingPercentage },
      ].filter(Boolean)}
      dataKey="value"
      cx={50}
      cy={50}
      innerRadius={0}
      outerRadius={40}
      fill="#8884d8"
    >
      {["completedPercentage", "inProgressPercentage", "remainingPercentage"].map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
);

export default PieChartComponent;
