import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

function DashboardPage() {
  return (
    <div>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      This will be the dashboard ...
    </div>
  );
}

export default DashboardPage;
