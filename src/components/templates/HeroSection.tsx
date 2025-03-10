import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import SubscriptionForm from "@/components/molecules/SubscriptionForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building3, Location } from "iconsax-react";
import Image from "next/image";
import React from "react";
import Animate from "../atoms/Animate";

function HeroSection({ coreDisable }: { coreDisable: boolean }) {
  return (
    <section id="hero" className="relative mx-auto gap-10 lg:h-[60vh]">
      <div className="relative z-0 mx-auto h-full max-w-screen-2xl space-y-5 px-6 py-10 2xl:px-0">
        <Animate
          dir="up"
          className="mx-auto flex h-full flex-col items-center justify-center space-y-6 lg:items-start"
        >
          <Heading className="max-w-xl text-center text-5xl lg:text-left lg:text-6xl">
            Make smart property choices now
          </Heading>
          <Text className="max-w-xl text-center text-lg text-gray-500 lg:text-left">
            Discover transparent, reliable feedback on properties and landlords,
            helping you avoid common pitfalls and find your perfect rental.
          </Text>

          <SubscriptionForm hideLabel bgMode="light" />
        </Animate>
        {coreDisable ? null : (
          <div className="absolute -bottom-28 z-20 flex h-40 w-full flex-col justify-center space-y-4 rounded-xl border border-gray-200 bg-white px-10 shadow-sm">
            <Heading as="h3">Search for reviews</Heading>
            <div className="flex items-center justify-between gap-12">
              <div className="flex w-full flex-1 items-center gap-x-8">
                <div className="relative flex w-full items-center">
                  <label htmlFor="search" className="sr-only">
                    Search for properties
                  </label>
                  <Input
                    placeholder="Search by location e.g Manchester, UK"
                    className="border-gray-300 bg-transparent placeholder:text-gray-300"
                  />
                  <Location
                    className="absolute right-3 size-5 text-gray-300"
                    color="currentColor"
                  />
                </div>
                <div className="relative flex w-full items-center">
                  <label htmlFor="search" className="sr-only">
                    Search for properties
                  </label>

                  <Input
                    placeholder="Search by property type e.g Apartment"
                    className="border-gray-300 bg-transparent placeholder:text-gray-300"
                  />
                  <Building3
                    size={24}
                    className="absolute right-3 text-gray-300"
                  />
                </div>
              </div>
              <Button className="w-48">Search Now</Button>
            </div>
          </div>
        )}
      </div>
      <Animate
        dir="left"
        duration={0.3}
        className="inset-0 -z-10 flex h-full w-full justify-end lg:absolute"
      >
        <Image
          width={600}
          height={600}
          alt="Property Pledge"
          src="/heroimg.png"
          className="h-full w-full bg-gradient-to-r lg:w-1/2"
          priority
        />
      </Animate>
    </section>
  );
}

export default HeroSection;
