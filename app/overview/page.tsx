"use client";

import CategoryDistributionChart from "@/components/CategoryDistributionChart";
import SalesOverviewChart from "@/components/salesOverviewChart";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import { DollarSign, Salad, ShoppingBag, SquareActivity, User } from "lucide-react";
import React from "react";


const OverviewPage: React.FC = () => {
  return (
    <div className="w-full p-4 overflow-hidden relative z-10">
      <main className="mx-auto py-4 ">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        >
          <StatCard name="Total Sales" icon={DollarSign} value={10000} isCurrency />
          <StatCard name="Total Clients" icon={User} value={1234} />
          <StatCard name="Total Products" icon={ShoppingBag} value={567} />
          <StatCard name="Stock" icon={SquareActivity} value={89} />
        </motion.div>

        <div className= "grid grid-cols-2 gap-4">
          <SalesOverviewChart />
          <CategoryDistributionChart />
        </div>


      </main>

    </div>
  )
};

export default OverviewPage;