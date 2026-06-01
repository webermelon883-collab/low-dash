// Header.tsx

import React from "react";

const Header: React.FC = () => {
  return (
    <header className="m-4 rounded bg-gray-700 text-white shadow-md">
      <div className="mx-auto flex w-full items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">My App</h1>

        <nav>
          <ul className="flex gap-6">
            <li>
              <a href="/" className="hover:text-blue-200">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-200">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-200">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;