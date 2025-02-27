import Animate from "@/components/atoms/Animate";
import Heading from "@/components/atoms/Heading";
import ListWrapper from "@/components/atoms/ListWrapper";
import Text from "@/components/atoms/Text";
import JoinCommunity from "@/components/molecules/JoinCommunity";
import { Badge } from "@/components/ui/badge";
import { Bookmark2, Eye, LampCharge, Profile2User } from "iconsax-react";
import Image from "next/image";
import React from "react";

const coreValues = [
  {
    title: "Transparency",
    icon: <Eye color="#1e88e5" className="size-8 text-blue-600" />,
    description:
      "Committed to providing clear and accurate information for all property related decisions.",
  },
  {
    title: "Accountability",
    icon: <Bookmark2 color="#d81b60" className="size-8 text-pink-600" />,
    description:
      "Dedicated to holding property managers and landlords accountable for their actions.",
  },
  {
    title: "Community",
    icon: <Profile2User color="#00897b" className="size-8 text-green-600" />,
    description:
      "Building a supportive and collaborative community of renters, leaseholders, landlords.",
  },
  {
    title: "Innovation",
    icon: <LampCharge color="#ffb300" className="size-8 text-amber-600" />,
    description:
      "Continously enhancing our platform based on user feedback to better serve the property market.",
  },
];

function AboutUsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-2xl space-y-10 py-10 pb-0 lg:pb-36">
      <div className="flex h-auto flex-col items-center justify-center overflow-hidden bg-gray-200 lg:flex-row lg:items-center lg:justify-between lg:rounded-2xl lg:pl-12 xl:h-[50vh]">
        <Animate
          dir="up"
          className="mx-auto w-full max-w-2xl space-y-3 px-6 pt-12 lg:px-12"
        >
          <Heading className="text-center text-4xl leading-tight lg:text-left xl:text-6xl">
            Building a transparent property market.
          </Heading>
          <Text className="max-w-lg text-center lg:text-left">
            Empowering tenants, leaseholders, landlords and property agents with
            the tools and information they need for a transparent, accountable
            and trustworthy property experience.
          </Text>
        </Animate>
        <Animate dir="left" className="h-full w-full lg:w-1/2">
          <Image
            width={800}
            height={400}
            src="/isolatedhouse.png"
            alt="About property pledged"
            className="h-full w-full object-cover"
          />
        </Animate>
      </div>

      <section className="flex flex-col items-center gap-3 space-y-4 px-6 py-28 pt-14 lg:items-start lg:pt-28 2xl:px-0">
        <Animate dir="up">
          <Badge className="h-12 rounded-md bg-gray-200 px-4 text-sm font-thin text-primary hover:bg-gray-300">
            Discover our journey
          </Badge>
        </Animate>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Animate
            dir="up"
            duration={0.5}
            useObserver={false}
            initiallyVisible={true}
          >
            <div className="col-span-1 flex flex-col items-center gap-2 lg:items-start">
              <Heading>Our mission and story</Heading>
              <Text className="max-w-lg text-center lg:text-start">
                Our journey towards creating a transparent and accountable
                property market.
              </Text>
              <Image
                width={800}
                height={400}
                src="/missionandstory.png"
                alt="Our mission and story"
                className="h-[400px] w-full rounded object-cover lg:h-[500px] lg:w-3/4"
              />
            </div>
          </Animate>
          <Animate dir="down" duration={0.6}>
            <div className="col-span-1 max-w-lg space-y-6">
              <Text>
                At Property Pledge, our mission is to revolutionize property
                management and create a transparent, accountable, and
                user-friendly environment for all stakeholders.
              </Text>
              <Text>
                Founded by property enthusiasts who have experienced the
                challenges of real estate market firsthand, Property Pledge aims
                to bridge the gap between tenants, leaseholders, landlords, and
                property managers. Our platform was born out of a need for
                reliable information, verified reviews, and a space where
                everyone can share their experiences and find trustworthy
                partners in property management.
              </Text>
              <Text>
                By leveraging advanced technology and a user centric approach,
                we strive to empower our users with the tools they need to make
                informed decisions, improve their living conditions, and foster
                a community of trust and transparency in the property market.
              </Text>
            </div>
          </Animate>
        </div>
      </section>
      <section className="space-y-8 px-6 py-28 pt-0 2xl:px-0">
        <Animate
          dir="up"
          className="flex flex-col items-center justify-center gap-4"
        >
          <Badge className="h-12 rounded-md bg-gray-200 px-4 text-sm font-thin text-primary hover:bg-gray-300">
            Core values
          </Badge>
          <Heading>Our guiding principles</Heading>
          <Text className="max-w-md text-center">
            The foundational value that drive our commitment to revolutionizing
            the property market.
          </Text>
        </Animate>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ListWrapper list={coreValues} keyExtractor={(item) => item.title}>
            {(item, index) => (
              <Animate
                dir="up"
                duration={0.5 * index + 1}
                className="rounded-lg border border-gray-300 p-5"
              >
                <span className="h-8 w-8 bg-blue-200">{item.icon}</span>
                <Heading className="mt-3 text-xl">{item.title}</Heading>
                <Text className="mt-3">{item.description}</Text>
              </Animate>
            )}
          </ListWrapper>
        </div>
      </section>

      <JoinCommunity />
    </div>
  );
}

export default AboutUsPage;
