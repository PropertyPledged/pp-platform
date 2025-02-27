import Image from "next/image";
import React from "react";
import Animate from "../atoms/Animate";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";
import SubscriptionForm from "./SubscriptionForm";

function JoinCommunity() {
  return (
    <section className="flex h-auto flex-col items-center justify-between bg-gray-200 p-14 lg:flex-row lg:rounded-lg lg:p-28 lg:pt-28 2xl:max-h-[50vh]">
      <Animate
        dir="down"
        className="h-[200px] w-1/2 overflow-hidden rounded object-contain lg:block lg:w-1/4"
      >
        <Image
          width={800}
          height={400}
          src="/listenfeedback.png"
          alt="Join our community"
          className="h-full w-full object-contain"
        />
      </Animate>
      <Animate
        dir="up"
        duration={0.2}
        className="flex w-full flex-col items-center justify-center gap-y-5 lg:w-1/2"
      >
        <Heading className="text-center">Join our community!</Heading>
        <Text className="mx-auto max-w-xl text-center">
          Whether you&apos;re a tenant, leaseholder, landlord, or property
          agent., become part of Property Pledge to contribute to and benefit
          from our growing community dedicated to a better property experience.
        </Text>
        <SubscriptionForm bgMode="light" hideLabel />
      </Animate>
      <Animate
        dir="down"
        className="hidden h-[200px] w-1/4 overflow-hidden rounded object-contain lg:block"
      >
        <Image
          width={800}
          height={400}
          src="/workchat.png"
          alt="Join our community chat"
          className="h-full w-full object-contain"
        />
      </Animate>
    </section>
  );
}

export default JoinCommunity;
