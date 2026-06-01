"use client"
import { LucideIcon } from "lucide-react";
import React from "react"

type StatCardProps = {
  name: string;
  icon: LucideIcon;
  value: number;
  isCurrency?: boolean;
};

const StatCard: React.FC<StatCardProps> = ({ name, icon: Icon, value, isCurrency }) =>  {
    return (
        <div className="bg-[#1e1e1e] backdrop-blur-2xl p-4 rounded-lg shadow">
            <div className="flex items-center justify-content">
                <Icon className="h-8 w-8 text-blue-500" />
                <h3 className="text-lg font-semibold ml-2">{name}</h3>
            </div>
            <p className="text-2xl font-bold mt-8 mx-2">{isCurrency ? `$${value.toLocaleString()}` : value}</p>
        </div>
    )

}


export default StatCard