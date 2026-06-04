"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      const userRole = (session?.user as any)?.role;
      if (userRole !== "admin") {
        // Redirect non-admin users back to overview
        router.push("/overview");
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  // Don't render if not admin
  if ((session?.user as any)?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/overview"
            className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-2">
            Admin Only - Manage dashboard settings
          </p>
        </div>

        {/* User Info */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            User Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-white font-medium">{session?.user?.name}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-medium">{session?.user?.email}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Role</p>
              <p className="text-green-400 font-medium uppercase tracking-wide">
                {(session?.user as any)?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="grid gap-6">
          {/* General Settings */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              General Settings
            </h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600"
                  defaultChecked
                />
                <span className="ml-3 text-gray-300">Enable data exports</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600"
                  defaultChecked
                />
                <span className="ml-3 text-gray-300">
                  Enable real-time notifications
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600"
                />
                <span className="ml-3 text-gray-300">Maintenance mode</span>
              </label>
            </div>
          </div>

          {/* Database Settings */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Database Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Database URL
                </label>
                <input
                  type="text"
                  placeholder="postgresql://..."
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors">
                Test Connection
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Security Settings
            </h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600"
                  defaultChecked
                />
                <span className="ml-3 text-gray-300">
                  Require password change on first login
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600"
                  defaultChecked
                />
                <span className="ml-3 text-gray-300">
                  Two-factor authentication
                </span>
              </label>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Session timeout (minutes)
                </label>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition-colors">
              Save Settings
            </button>
            <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded font-medium transition-colors">
              Reset to Defaults
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <button
            onClick={() =>
              signOut({ redirect: true, callbackUrl: "/auth/login" })
            }
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
