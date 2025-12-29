import Link from "next/link";
import React from "react";
import Heading from "../atoms/Heading";
import ListWrapper from "../atoms/ListWrapper";
import Text from "../atoms/Text";
import SocialIcon from "../molecules/SocialIcon";
import SubscriptionForm from "../molecules/SubscriptionForm";

const quickLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/about-us",
  },
  {
    title: "Community",
    href: "/community",
  },
  {
    title: "Blogs",
    href: "/blog",
  },
  {
    title: "Your feedback",
    href: "/suggestion",
  },
  {
    title: "Sitemap",
    href: "/sitemap.xml",
  },
  // {
  //   title: "Write Review",
  //   href: "#",
  // },
];

const socialLinks = [
  {
    title: "Facebook",
    href: "https://facebook.com",
    icon: "facebook",
  },
  {
    title: "X (formerly Twitter)",
    href: "https://twitter.com",
    icon: "x",
  },
  {
    title: "Instagram",
    href: "https://instagram.com",
    icon: "instagram",
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com",
    icon: "linkedin",
  },
];

const legalLinks = [
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    title: "Terms of Service",
    href: "/terms-of-service",
  },
  {
    title: "Cookie Policy",
    href: "/cookie-policy",
  },
];

function Footer() {
  return (
    <section id="pp.footer" className="bg-primary/80 min-h-96 py-10 pt-28">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 px-6 py-28 pt-0 md:grid-cols-2 md:gap-2 2xl:px-0">
        <div className="col-span-1 space-y-5 text-white">
          <Heading as="h3" className="text-white">
            Contact Us
          </Heading>
          <Text className="flex flex-col">
            <span>Have questions or need support?</span>
            <span>Reach out to us at:</span>
          </Text>
          <Text>
            Email:
            <a
              href="mailto:info@propertypledged.com"
              className="ml-2 text-white"
            >
              info@propertypledged.com
            </a>
          </Text>
          <Text>
            Phone:
            <a href="tel:+447438349172" className="ml-2 text-white">
              +44 7438 349 172
            </a>
          </Text>
          <Text className="max-w-sm">
            Address: 1 Highcliffe Gardens, Redbridge, London, United Kingdom
          </Text>
        </div>
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <Heading as="h3" className="text-white">
                Quick Links
              </Heading>
              <ul className="space-y-2">
                <ListWrapper
                  list={quickLinks}
                  keyExtractor={(link) => link.title}
                >
                  {(link) => (
                    <li key={link.title} className="space-x-2">
                      <Link href={link.href} className="text-white">
                        {link.title}
                      </Link>
                    </li>
                  )}
                </ListWrapper>
              </ul>
            </div>

            <div className="space-y-4">
              <Heading as="h3" className="text-white">
                Legal
              </Heading>
              <ul className="space-y-3">
                <ListWrapper
                  list={legalLinks}
                  keyExtractor={(link) => link.title}
                >
                  {(link) => (
                    <li className="space-x-2">
                      <Link href={link.href} className="text-white">
                        {link.title}
                      </Link>
                    </li>
                  )}
                </ListWrapper>
              </ul>
            </div>
            <div className="space-y-4">
              <Heading as="h3" className="text-white">
                Socials
              </Heading>
              <ul className="space-y-4">
                <ListWrapper
                  list={socialLinks}
                  keyExtractor={(link) => link.title}
                >
                  {(link) => (
                    <li className="flex items-center gap-3 text-white">
                      <SocialIcon
                        icon={
                          link.icon as
                            | "x"
                            | "linkedin"
                            | "instagram"
                            | "facebook"
                        }
                        className="size-5"
                      />
                      <Link href={link.href} className="text-white">
                        {link.title}
                      </Link>
                    </li>
                  )}
                </ListWrapper>
              </ul>
            </div>
          </div>
          <div className="max-w-lg space-y-5 text-white">
            <Text className="max-w-md">
              Get the latest updates, tips and exclusive offers delivered to
              your inbox
            </Text>
            <SubscriptionForm />
          </div>
        </div>
      </div>
      <Text className="block py-4 text-center text-white">
        &copy; 2024 Property Pledge. All rights reserved
      </Text>
    </section>
  );
}

export default Footer;
