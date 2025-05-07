import React from "react";

function PlatformLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}

export default PlatformLayout;
