"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, MapPin, Star, Plus, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  const getRoleDisplay = (role: string | null | undefined) => {
    switch (role) {
      case "tenant":
        return "Tenant";
      case "leaseholder":
        return "Leaseholder";
      case "landlord":
        return "Landlord";
      default:
        return "Member";
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header Section */}
      <div className="border-b border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-8 sm:py-10">
          <div className="mb-8">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
              Welcome back
            </p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900 sm:text-5xl">
              {session.user.name}
            </h1>
            <p className="mt-2 text-lg text-slate-600">
              {getRoleDisplay(session.user.role)} • Making smarter rental decisions
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search properties, addresses, postcodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Quick Actions Grid */}
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          {session.user.role === "landlord" ? (
            <>
              <Link
                href="/properties/new"
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
              >
                <div className="mb-3 inline-block rounded-lg bg-slate-100 p-2">
                  <Plus className="h-5 w-5 text-slate-900" />
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-slate-600">
                  List Property
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Add a new property to the platform
                </p>
              </Link>

              <Link
                href="/properties/manage"
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
              >
                <div className="mb-3 inline-block rounded-lg bg-blue-100 p-2">
                  <TrendingUp className="h-5 w-5 text-blue-900" />
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-slate-600">
                  Manage Listings
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  View and update your properties
                </p>
              </Link>

              <Link
                href="/analytics"
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
              >
                <div className="mb-3 inline-block rounded-lg bg-emerald-100 p-2">
                  <Star className="h-5 w-5 text-emerald-900" />
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-slate-600">
                  Reviews
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  See what renters are saying
                </p>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/reviews/write"
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
              >
                <div className="mb-3 inline-block rounded-lg bg-slate-100 p-2">
                  <Plus className="h-5 w-5 text-slate-900" />
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-slate-600">
                  Write Review
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Share your property experience
                </p>
              </Link>

              <Link
                href="/reviews/my"
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
              >
                <div className="mb-3 inline-block rounded-lg bg-amber-100 p-2">
                  <Star className="h-5 w-5 text-amber-900" />
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-slate-600">
                  My Reviews
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Manage your contributions
                </p>
              </Link>

              <Link
                href="/properties/saved"
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
              >
                <div className="mb-3 inline-block rounded-lg bg-rose-100 p-2">
                  <MapPin className="h-5 w-5 text-rose-900" />
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-slate-600">
                  Saved Properties
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Return to properties you liked
                </p>
              </Link>
            </>
          )}
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {session.user.role === "landlord"
                ? "Community Insights"
                : "Explore Properties"}
            </h2>
            <p className="mt-1 text-slate-600">
              {session.user.role === "landlord"
                ? "Stay informed about what renters value most"
                : "Discover highly-rated properties and communities"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-white p-3">
                <Users className="h-6 w-6 text-slate-900" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Community-Powered Insights
            </h3>
            <p className="mt-2 text-slate-600">
              Browse verified reviews from {session.user.role === "landlord" ? "renters on your properties" : "members in your area"}.
            </p>
            <button
              onClick={() => router.push("/search")}
              className="mt-4 inline-block rounded-lg bg-slate-900 px-6 py-2 font-medium text-white hover:bg-slate-800 transition-colors"
            >
              Start Exploring
            </button>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Your Role</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {getRoleDisplay(session.user.role)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Member Since</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">Today</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Onboarded</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {session.user.onboarded ? "✓" : "—"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Email</p>
              <p className="mt-1 truncate font-semibold text-slate-900">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
