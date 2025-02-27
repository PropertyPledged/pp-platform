import Animate from "@/components/atoms/Animate";
import Heading from "@/components/atoms/Heading";
import Logo from "@/components/atoms/Logo";
import Text from "@/components/atoms/Text";
import SuggestionForm from "@/components/organisms/SuggestionForm";
import { sanityFetch } from "@/sanity/utils/fetch";
import { suggestionsQuery } from "@/sanity/utils/queries";
import type { SuggestionsQueryResult } from "sanity.types";
import Image from "next/image";
import React from "react";

async function SuggestionPage() {
  const suggestions = await sanityFetch<SuggestionsQueryResult>({
    query: suggestionsQuery,
  });

  return (
    <div className="min-h-screen">
      <div className="absolute -z-0 h-screen w-full justify-end md:flex">
        <Image
          src="/wavy.png"
          width={600}
          height={600}
          alt="wavy graphic"
          className="h-full w-full object-cover lg:w-1/3"
        />
      </div>
      <div className="relative z-10 mx-auto flex w-full flex-col items-center justify-center gap-4 px-6 py-20 lg:max-w-screen-lg 2xl:px-0">
        <Animate dir="down" duration={0.6} className="h-16 w-16">
          <Logo />
        </Animate>
        <Animate dir="down" className="space-y-6">
          <Heading className="text-center">
            Help us improve Property Pledged
          </Heading>
          <Text className="mx-auto max-w-lg text-center">
            Your feedback is invaluable to us! We&apos;d love to hear your
            thoughts on how we can make Property Pledge better for you.
          </Text>
        </Animate>
        <Animate dir="up" className="w-full">
          <SuggestionForm suggestions={suggestions} />
        </Animate>
      </div>
    </div>
  );
}

export default SuggestionPage;
