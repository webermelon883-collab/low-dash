"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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
  Package,
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
  Package,
};

type SidebarItem = {
  title: string;
  href: string;
  icon: keyof typeof Icons;
};

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ mobileOpen, onClose }: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => setSidebarItems(data.sidebarItems))
      .catch((error) => console.error("Failed to load sidebar data:", error));
  }, []);

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-20 bg-black/50 sm:hidden"
          aria-label="Close sidebar"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-800 text-white h-full p-4 transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } sm:relative sm:translate-x-0 sm:h-screen ${isSidebarOpen ? "sm:w-64" : "sm:w-32"}`}
      >
        <div className="h-full bg-gray-700 rounded-lg border-r border-black p-4 flex flex-col">
          {/* Toggle Button (desktop only) */}
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="hidden sm:inline-flex cursor-pointer mb-6 p-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {sidebarItems
              .filter((item) => {
                const isSettings =
                  item.href === "/settings" ||
                  item.title?.toLowerCase().includes("setting");
                if (isSettings) return isAdmin;
                return true;
              })
              .map((item) => {
                const IconComponent = Icons[item.icon];

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`flex items-center ${
                      isSidebarOpen ? "justify-start" : "justify-center"
                    } gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      pathname === item.href
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
    </>
  );
};

export default Sidebar;
