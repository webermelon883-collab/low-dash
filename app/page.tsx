"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import OverviewPage from "./overview/page";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (session) {
    return <OverviewPage />;
  }

  return null;
}
