// Header.tsx

import React from "react";
import { Menu } from "lucide-react";
import UserMenu from "./UserMenu";

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  return (
    <header className="m-4 rounded bg-gray-700 text-white shadow-md">
      <div className="mx-auto flex w-full items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 sm:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
