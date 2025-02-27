import WelcomeEmail from "@/components/templates/WelcomeEmail";
import React from "react";

function Emails() {
  return (
    <>
      <WelcomeEmail user={{ name: "John Doe", email: "john@doe.com" }} />;
    </>
  );
}

export default Emails;
