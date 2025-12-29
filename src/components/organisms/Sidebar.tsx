"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Settings,
  User,
  Bell,
  Globe,
  Users,
  CreditCard,
  Wrench,
} from "lucide-react";

const sidebarItems = [
  {
    section: "GENERAL SETTINGS",
    items: [
      { name: "Apps", href: "/account/apps", icon: Wrench },
      { name: "Account", href: "/account", icon: User },
      { name: "Notification", href: "/account/notifications", icon: Bell },
      { name: "Language & Region", href: "/account/language", icon: Globe },
    ],
  },
  {
    section: "WORKSPACE SETTINGS",
    items: [
      { name: "General", href: "/account/workspace/general", icon: Settings },
      { name: "Members", href: "/account/workspace/members", icon: Users },
      { name: "Billing", href: "/account/workspace/billing", icon: CreditCard },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-white h-[calc(100vh-4rem)] sticky top-16 hidden lg:block">
      <div className="flex flex-col gap-8 py-8 px-4">
        {sidebarItems.map((section) => (
          <div key={section.section} className="flex flex-col gap-2">
            <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {section.section}
            </h3>
            <nav className="flex flex-col gap-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-gray-100 text-foreground"
                        : "text-muted-foreground hover:bg-gray-50 hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );
}
