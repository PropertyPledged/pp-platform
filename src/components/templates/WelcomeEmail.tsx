import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  render,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import type * as React from "react";

interface WelcomeEmailPropsBase {
  steps?: {
    id: number;
    Description: React.ReactNode;
  }[];
}

interface WelcomeEmailProps extends WelcomeEmailPropsBase {
  user: {
    name: string;
    email: string;
  };
}

const isProduction = process.env.NODE_ENV === "production";

const baseUrl = isProduction
  ? "https://propertypledged.com"
  : "http://localhost:3000";

const PropDefaults: WelcomeEmailPropsBase = {
  steps: [
    {
      id: 1,
      Description: (
        <li className="mb-20 text-sm" key={1}>
          <strong>Expert insights:</strong> Access valuable articles, tips, and
          advice to make smarter property decisions.
        </li>
      ),
    },
    {
      id: 2,
      Description: (
        <li className="mb-20 text-sm" key={2}>
          <strong>Community hightlights: </strong> Stay updated on trending
          discussions and shared experiences from our vibrant community.
        </li>
      ),
    },
    {
      id: 3,
      Description: (
        <li className="mb-20 text-sm" key={3}>
          <strong>Platform updated: </strong> Be the first to know about new
          features, tools, and improvements designed to make your experience
          seamless.
        </li>
      ),
    },
    {
      id: 4,
      Description: (
        <li className="mb-20 text-sm" key={4}>
          <strong>Special opportunities: </strong> Get exclusive invites to
          events, webinars and resources that bring the property world closer to
          you.
        </li>
      ),
    },
  ],
};

export function WelcomeEmail({
  user,
  steps = PropDefaults.steps,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#2250f4",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Preview>Property Pledged Subscription</Preview>
        <Body className="relative bg-white font-sans text-base">
          <Img
            src={`${baseUrl}/pplogo.png`}
            width="35"
            height="40"
            alt="Property Pledged Logo"
            className="mx-auto my-20"
          />

          <Container className="bg-white">
            <Heading className="my-0 py-4 text-center text-2xl font-semibold leading-8">
              You&apos;re all set!
            </Heading>

            <Img
              src={`${baseUrl}/working-together.png`}
              width="250"
              height="250"
              alt="Property pledged working together"
              className="mx-auto"
            />

            <Section>
              <Row>
                <Heading className="px-2 text-lg font-bold">
                  Welcome {user.name ?? ""}
                </Heading>
                <Text className="px-2 text-gray-600">
                  Thank you for subscribing to Property Pledge! We&apos;re
                  excited to keep you updated with all the latest news, tips,
                  and insights straight to your inbox.
                </Text>
              </Row>
              <Row>
                <Text className="px-2">
                  <strong className="text-base">
                    Here&apos;s what you can expect from us:
                  </strong>
                  <br />
                  <span className="text-gray-500">
                    Chill, we&apos;ve got you. Here&apos;s what you can look
                    forward to:
                  </span>
                </Text>
              </Row>
            </Section>

            <ol className="list-decimal px-10">
              {steps?.map(({ Description }) => Description)}
            </ol>

            <Section>
              <Row>
                <Text className="px-2 text-left text-gray-500">
                  We&apos;re excited to have you on board and can&apos;t wait to
                  share valuable updates and content with you.
                </Text>
                <Text className="px-2 text-left text-gray-400">
                  Best regards. <br />{" "}
                  <Link
                    href={baseUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-gray-800"
                  >
                    The Property Pledged Team.
                  </Link>
                </Text>
              </Row>
            </Section>
          </Container>

          <Container className="mt-20">
            <Section>
              <Row>
                <Text className="text-center text-gray-400">
                  If you wish to unsubscribe from these emails, click
                  <Link
                    className="ml-1 text-gray-400 underline"
                    href={`${baseUrl}/unsubscribe?email=${user.email}`}
                  >
                    here
                  </Link>
                </Text>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export const welcomeHtml = render(
  <WelcomeEmail user={{ name: "John Doe", email: "john@doe.com" }} />,
);

export default WelcomeEmail;
