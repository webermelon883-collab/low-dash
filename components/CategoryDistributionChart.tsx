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

  useEffect(() => {
    fetch("/data/categoryData.json")
      .then((res) => res.json())
      .then((data) => setCategoryData(data));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-4">
        Category Distribution Chart
      </h2>

      <div className="w-full h-110 bg-[#1e1e1e] rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              dataKey="value"
              label={({ name, percent = 0 }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {categoryData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip 
            contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #333", borderRadius: "4px" }}
             />
             <Legend 
             iconType="circle"
             layout="vertical"
             verticalAlign="middle"
             align="right"
             wrapperStyle={{ fontSize: "14px", color: "#f5f5f5" }}
             />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;