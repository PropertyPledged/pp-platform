"use client";

import useCopy from "@/hooks/useCopy";
import { cn } from "@/lib/utils";
import { Check, Copy, Facebook, Twitter } from "lucide-react";
import React, { useEffect, useState } from "react";
import Heading from "../atoms/Heading";
import ListWrapper from "../atoms/ListWrapper";
import { Button } from "../ui/button";

type ShareProps = {
  title: string;
} & React.HTMLProps<HTMLDivElement>;

function Share({ title, className }: ShareProps) {
  const [newUrl, setnewUrl] = useState("");
  const { copied, onCopy } = useCopy();

  useEffect(() => {
    if (typeof window !== undefined) {
      const url = window.location.href;
      const encoded = encodeURIComponent(url);
      setnewUrl(encoded);
    }
  }, []);

  const shares = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${newUrl}&quote=${title}&display=page&caption=${title}`,
      icon: <Facebook className="h-full w-full" />,
      label: "Facebook",
    },
    {
      href: `http://twitter.com/share?url=${newUrl}\n&text=${title}&hashtags=aesopske&via=Aesopsk`,
      icon: <Twitter className="h-full w-full" />,
      label: "Twitter",
    },
    {
      href: `whatsapp://send?text=${newUrl} ${title}`,
      icon: <Whatsapp className="h-full w-full" />,
      label: "Whatsapp",
    },
  ];

  return (
    <div className={cn("relative space-y-2 self-center", className)}>
      <Heading as="h5" className="font-semibold capitalize">
        Share
      </Heading>
      <div className="flex w-full gap-2">
        <ListWrapper list={shares} keyExtractor={(share) => share.label}>
          {(share) => (
            <Button
              variant="outline"
              size="icon"
              asChild
              className="size-12 rounded-full border-2 p-3"
            >
              <a
                title={share.label}
                href={share.href}
                key={share?.label}
                target="_blank"
                rel="noreferrer noopener"
              >
                {share.icon}
              </a>
            </Button>
          )}
        </ListWrapper>

        <Button
          title={`Copy ${title}`}
          data-active={copied}
          onClick={() => {
            onCopy(decodeURIComponent(newUrl));
          }}
          size="icon"
          variant="outline"
          className="size-12 rounded-full border-2 p-3"
        >
          {copied ? (
            <Check className="h-full w-full" />
          ) : (
            <Copy className="h-full w-full" />
          )}
        </Button>
      </div>
    </div>
  );
}

function Whatsapp({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      className={className}
      viewBox="0 0 32 32"
    >
      <path
        d="M25.873,6.069c-2.619-2.623-6.103-4.067-9.814-4.069C8.411,2,2.186,8.224,2.184,15.874c-.001,2.446,.638,4.833,1.852,6.936l-1.969,7.19,7.355-1.929c2.026,1.106,4.308,1.688,6.63,1.689h.006c7.647,0,13.872-6.224,13.874-13.874,.001-3.708-1.44-7.193-4.06-9.815h0Zm-9.814,21.347h-.005c-2.069,0-4.099-.557-5.87-1.607l-.421-.25-4.365,1.145,1.165-4.256-.274-.436c-1.154-1.836-1.764-3.958-1.763-6.137,.003-6.358,5.176-11.531,11.537-11.531,3.08,.001,5.975,1.202,8.153,3.382,2.177,2.179,3.376,5.077,3.374,8.158-.003,6.359-5.176,11.532-11.532,11.532h0Zm6.325-8.636c-.347-.174-2.051-1.012-2.369-1.128-.318-.116-.549-.174-.78,.174-.231,.347-.895,1.128-1.098,1.359-.202,.232-.405,.26-.751,.086-.347-.174-1.464-.54-2.788-1.72-1.03-.919-1.726-2.054-1.929-2.402-.202-.347-.021-.535,.152-.707,.156-.156,.347-.405,.52-.607,.174-.202,.231-.347,.347-.578,.116-.232,.058-.434-.029-.607-.087-.174-.78-1.88-1.069-2.574-.281-.676-.567-.584-.78-.595-.202-.01-.433-.012-.665-.012s-.607,.086-.925,.434c-.318,.347-1.213,1.186-1.213,2.892s1.242,3.355,1.416,3.587c.174,.232,2.445,3.733,5.922,5.235,.827,.357,1.473,.571,1.977,.73,.83,.264,1.586,.227,2.183,.138,.666-.1,2.051-.839,2.34-1.649,.289-.81,.289-1.504,.202-1.649s-.318-.232-.665-.405h0Z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
}

export default Share;
