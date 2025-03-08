import Animate from "@/components/atoms/Animate";
import Heading from "@/components/atoms/Heading";
import ListWrapper from "@/components/atoms/ListWrapper";
import Text from "@/components/atoms/Text";
import JoinCommunity from "@/components/molecules/JoinCommunity";
import { Badge } from "@/components/ui/badge";
import { ArchiveBook, LampCharge, Profile2User } from "iconsax-react";
import Image from "next/image";
import React from "react";

const communityValues = [
  {
    title: "Knowledge sharing",
    icon: (
      <ArchiveBook className="size-8 text-amber-600" color="currentColor" />
    ),
    description:
      "Gain insights from real-life experiences shared by tenants, landlords and leaseholders.",
  },
  {
    title: "Problem solving",
    icon: (
      <Profile2User className="size-8 text-green-600" color="currentColor" />
    ),
    description:
      "Encounter an issue? Our community is here to help. Work together with other members to tackle prope",
  },
  {
    title: "Networking",
    icon: <LampCharge className="size-8 text-amber-600" color="currentColor" />,
    description:
      "Gain insights from real-life experiences shared by tenants, landlords and leaseholders.",
  },
];

function CommunityPage() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-2xl py-10 pb-0 lg:pb-36">
      <div className="bg relative h-auto min-h-[50dvh] overflow-hidden lg:max-h-[100vh] lg:min-h-[60vh] lg:rounded-xl">
        <Image
          fill
          src="/community.jpeg"
          alt="Community hero"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 flex h-full flex-col justify-center gap-6 bg-black/50 px-6 text-white lg:justify-end lg:p-28 lg:py-40">
          <Animate dir="up" className="space-y-4">
            <Heading className="text-center text-white lg:text-left">
              Join a thriving property community
            </Heading>
            <Text className="max-w-xl text-center text-gray-200 lg:text-left">
              Whether your&apos;re a tenant, landlord or leaseholder, our
              community is here to help you navigate the complexities of
              property management, share valuable insights and find practical
              solutions to everyday challenges.
            </Text>
          </Animate>
        </div>
      </div>
      <section className="space-y-8 px-6 py-28 2xl:px-0">
        <Animate
          dir="up"
          duration={0.6}
          className="flex flex-col items-center justify-center gap-4"
        >
          <Badge variant="pp">Here&apos;s what you can do</Badge>
          <Heading className="text-center">Why join our community?</Heading>
          <Text className="max-w-xl text-center">
            Whether you&apos;re seeking guidance on property management, looking
            to share your experience with others, our community is build to
            foster meaningful discussions.
          </Text>
        </Animate>

        <div className="mx-auto mt-4 grid max-w-screen-xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ListWrapper
            list={communityValues}
            keyExtractor={(item) => item.title}
          >
            {(item, index) => (
              <Animate
                dir="up"
                duration={0.5 * index + 1}
                className="rounded-lg border border-gray-300 p-5"
              >
                {item.icon}
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

export default CommunityPage;
