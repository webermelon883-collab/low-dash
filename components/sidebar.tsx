"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Mail,
  Users,
  Bell,
  Info,
  Menu,
  Package
  
} from "lucide-react";
import { usePathname } from "next/navigation";

const Icons = {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Mail,
  Users,
  Bell,
  Info,
  Package
};

type SidebarItem = {
  title: string;
  href: string;
  icon: keyof typeof Icons;
};

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => setSidebarItems(data.sidebarItems))
      .catch((error) =>
        console.error("Failed to load sidebar data:", error)
      );
  }, []);

  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-32"
      } relative z-10 transition-all duration-300 ease-in-out bg-gray-800 text-white h-screen p-4 flex-shrink-0`}
    >
      <div className="h-full bg-gray-700 rounded-lg border-r border-black p-4 flex flex-col">
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className={`cursor-pointer mb-6 p-2 rounded-md hover:bg-gray-600 transition-colors ${
            !isSidebarOpen ? "px-4" : "px-4"
          }`}
        >
          <Menu size={20} />
        </button>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => {
            const IconComponent = Icons[item.icon];
            const normalize = (p?: string) => (p ? p.toLowerCase().replace(/\/$/, "") : "");
            const isActive = normalize(pathname) === normalize(item.href);

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center ${
                  isSidebarOpen ? "justify-start" : "justify-center"
                } gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gray-600 text-white"
                    : "text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
              >
                <IconComponent size={20} />

                <span
                  className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                    isSidebarOpen
                      ? "opacity-100 max-w-xs"
                      : "opacity-0 max-w-0"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;