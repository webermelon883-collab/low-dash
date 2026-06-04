"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

interface NavLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  requiresAdmin?: boolean;
}

export default function NavLink({
  href,
  label,
  icon,
  requiresAdmin = false,
}: NavLinkProps) {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";

  // Hide admin-only links from non-admin users
  if (requiresAdmin && !isAdmin) {
    return null;
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
