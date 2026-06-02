"use client";

import React, { useEffect, useState } from "react";
import { ResponsiveChoropleth } from "@nivo/geo";

const data = [{ id: "Malaysia", value: 450000 }];

const Geomap = () => {
  const [features, setFeatures] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson",
    )
      .then((res) => res.json())
      .then((geo) => {
        setFeatures(geo.features);
      });
  }, []);

  if (!features.length) {
    return <div className="text-white">Loading map...</div>;
  }

  return (
    <div>
      <h1 className="text-white text-xl font-bold mb-4">Geomap</h1>
      <div className="w-full h-120 bg-[#1e1e1e] rounded-lg p-4">
        <ResponsiveChoropleth
          data={data}
          features={features}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          colors={[
            "#ff6b6b",
            "#4dabf7",
            "#51cf66",
            "#ffd43b",
            "#845ef7",
            "#ffa94d",
            "#22b8cf",
          ]}
          domain={[0, 500000]}
          unknownColor="#333333"
          label="properties.name"
          valueFormat=".0s"
          // ✅ IMPORTANT FIX
          match={(feature) => feature.properties.name}
          projectionType="mercator"
          projectionScale={120}
          projectionTranslation={[0.5, 0.5]}
          theme={{
            axis: { ticks: { text: { fill: "#fff" } } },
            legends: { text: { fill: "#fff" } },
            tooltip: {
              container: {
                background: "#222",
                color: "#fff",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Geomap;
