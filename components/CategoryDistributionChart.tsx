"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088fe"];

type CategoryData = {
  name: string;
  value: number;
};

const CategoryDistributionChart: React.FC = () => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    fetch("/data/categoryData.json")
      .then((res) => res.json())
      .then((data) => setCategoryData(data));

    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isCompact = windowWidth > 0 && windowWidth <= 820;
  const outerRadius = isCompact ? "55%" : "70%";
  const pieCy = isCompact ? "40%" : "45%";

  const renderCompactLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#ffffff"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={10}
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderLabel = ({ name, percent }: any) =>
    `${name}: ${(percent * 100).toFixed(0)}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
     className="">
      <h2 className="text-2xl font-bold mb-4">Category Distribution Chart</h2>

      <div
        className="w-full bg-[#1e1e1e] rounded-lg overflow-hidden"
        style={{ height: 450, minHeight: 450 }}
      >
        <ResponsiveContainer width="100%" height={420}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy={pieCy}
              outerRadius={outerRadius}
              dataKey="value"
              label={isCompact ? renderCompactLabel : renderLabel}
              labelLine={false}
              paddingAngle={3}
            >
              {categoryData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                borderRadius: "4px",
              }}
            />
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: "14px", color: "#f5f5f5" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
