"use client";

import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import React from "react";


import {
  DollarSign,
  ShoppingBag,
  User,
  SquareActivity
} from "lucide-react";

import ProductsTable from "@/components/ProductsTable";

const Icons = {
  DollarSign,
  ShoppingBag,
  User,
  SquareActivity
};

const ProductPage : React.FC = () => {
    return (
        <motion.div className="mx-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <h1 className="text-2xl font-bold mb-4">Product page</h1>
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
                <ProductsTable/>

            </main>
        </motion.div>
    );
}

export default ProductPage;