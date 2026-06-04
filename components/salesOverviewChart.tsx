"use client";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const salesOverviewChart: React.FC = () => {
  const [salesData, setSalesData] = React.useState([]);
  useEffect(() => {
    fetch("/data/salesData.json")
      .then((res) => res.json())
      .then((data) => setSalesData(data));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-4">Sales Overview</h2>

      <div
        className="w-full py-8  bg-[#1e1e1e] backdrop-blur-2xl rounded-lg overflow-hidden"
        style={{ height: 450, minHeight: 450 }}
      >
        <ResponsiveContainer width="100%" height={420}>
          <LineChart
            data={salesData}
            margin={{ top: 20, right: 20, left: 5, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#ff7300"
              yAxisId={0}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default salesOverviewChart;
