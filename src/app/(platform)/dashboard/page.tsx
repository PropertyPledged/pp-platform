"use client";

import { useSession } from "@/lib/auth-client";
import React from "react";

function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1>Welcome, {session.user.name}!</h1>
        <p>Email: {session.user.email}</p>
      </div>
      This will be the dashboard ...
    </div>
  );
}

export default DashboardPage;
