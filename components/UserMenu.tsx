"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Settings, LogOut } from "lucide-react";

export default function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session) {
    return null;
  }

  const isAdmin = (session?.user as any)?.role === "admin";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors"
      >
        <div className="text-right">
          <p className="text-sm font-medium">{session.user?.name}</p>
          <p className="text-xs text-gray-300">{isAdmin ? "Admin" : "User"}</p>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-sm text-gray-400">Signed in as</p>
            <p className="text-white font-medium">{session.user?.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {isAdmin ? (
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors border-b border-gray-700"
              >
                <Settings size={16} />
                <span>Settings</span>
              </Link>
            ) : null}

            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ redirect: true, callbackUrl: "/auth/login" });
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-red-400 transition-colors"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
