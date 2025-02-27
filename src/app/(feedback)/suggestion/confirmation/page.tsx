import Animate from "@/components/atoms/Animate";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function SuggestionConfirmation() {
  return (
    <div className="relative h-screen min-h-screen">
      <div className="absolute -z-0 flex h-screen w-full justify-end">
        <Image
          src="/wavy.png"
          width={600}
          height={600}
          alt="wavy graphic"
          className="h-full w-full object-cover lg:w-1/3"
        />
      </div>
      <div className="relative z-10 mx-auto flex max-w-screen-lg flex-col items-center justify-center gap-8 px-6 py-20 lg:px-0 lg:py-40">
        <Animate dir="up" duration={0.3} className="h-[300px] w-[300px]">
          <Image
            width={500}
            height={500}
            src="/suggestionapproval.png"
            alt="Thank you for your suggestion"
          />
        </Animate>
        <Animate dir="up" className="space-y-4">
          <Heading className="text-center">
            Thank you for your feedback!
          </Heading>
          <Text className="mx-auto max-w-lg text-center">
            Thank you for sharing your feedback. We appreciate your time and
            effort in helping us make Property Pledge better for everyone.
          </Text>
        </Animate>
        <Animate
          dir="up"
          duration={0.6}
          className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-center"
        >
          <Button asChild>
            <Link href="/suggestion" passHref>
              Submit suggestion
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/" passHref>
              Go Back home &rarr;
            </Link>
          </Button>
        </Animate>
      </div>
    </div>
  );
}

export default SuggestionConfirmation;
