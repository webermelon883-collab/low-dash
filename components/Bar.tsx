"use client";

import { ResponsiveBar, BarDatum } from "@nivo/bar";
import React from "react";

// ✅ Define strict type for your data
type DataItem = {
  category: string;
  "2021": number;
  "2022": number;
  "2023": number;
  "2024": number;
};

// ✅ Typed data
const data: DataItem[] = [
  { category: "Accessories", "2021": 20, "2022": 25, "2023": 30, "2024": 35 },
  { category: "Clothing", "2021": 30, "2022": 35, "2023": 40, "2024": 45 },
  { category: "Electronics", "2021": 25, "2022": 20, "2023": 35, "2024": 40 },
  { category: "Furniture", "2021": 15, "2022": 40, "2023": 25, "2024": 30 },
  { category: "Other", "2021": 50, "2022": 30, "2023": 45, "2024": 20 }
];

const Bar: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Malaysia Category Comparison (2021–2024)
      </h1>

      <div className="w-full h-120  bg-[#1e1e1e] rounded-lg p-4">

        {/* 🔝 Custom Legend */}
        <div className="flex justify-center gap-6 mb-4 text-white">
          {[
            { year: "2021", color: "#66c2a5" },
            { year: "2022", color: "#fc8d62" },
            { year: "2023", color: "#8da0cb" },
            { year: "2024", color: "#e78ac3" }
          ].map((item) => (
            <div key={item.year} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: item.color }}
              />
              {item.year}
            </div>
          ))}
        </div>

        {/* 📊 Chart */}
        <div className="h-[400px]">
          <ResponsiveBar<DataItem>
            data={data}
            keys={["2021", "2022", "2023", "2024"]}
            indexBy="category"
            margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
            padding={0.3}
            groupMode="stacked"
            borderRadius={6}

            // ✅ Properly typed color function
            colors={({ id }) => {
              switch (id) {
                case "2021":
                  return "#66c2a5";
                case "2022":
                  return "#fc8d62";
                case "2023":
                  return "#8da0cb";
                case "2024":
                  return "#e78ac3";
                default:
                  return "#999";
              }
            }}

            label={({ value }) => `${value}%`}

            barOpacity={1}
            barHoverOpacity={0.85}

            axisBottom={{
              tickRotation: -20,
              legend: "Category",
              legendPosition: "middle",
              legendOffset: 52,
            }}
            axisLeft={{
              legend: "Percentage (%)",
              legendPosition: "middle",
              legendOffset: -50
            }}

            theme={{
              axis: {
                ticks: { text: { fill: "#ffffff" } },
                legend: { text: { fill: "#ffffff" } }
              },
              labels: {
                text: { fill: "#ffffff", fontSize: 12 }
              },
              tooltip: {
                container: {
                  background: "#000000",
                  color: "#ffffff",
                  fontSize: "12px",
                  borderRadius: "4px"
                }
              }
            }}

            legends={[]}

            animate={true}
            motionConfig="wobbly"
          />
        </div>
      </div>
    </div>
  );
};

export default Bar;