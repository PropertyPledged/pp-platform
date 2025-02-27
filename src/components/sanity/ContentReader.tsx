import { urlForImage } from "@/sanity/utils/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { BlockContent, SanityImageAsset } from "sanity.types";
import BlockHeading from "@components/sanity/BlockHeading";
import BlockImage from "./BlockImage";

const components = {
  block: {
    h1: ({ children }) => <BlockHeading type="h1">{children}</BlockHeading>,
    h2: ({ children }) => <BlockHeading type="h2">{children}</BlockHeading>,
    h3: ({ children }) => <BlockHeading type="h3">{children}</BlockHeading>,
    h4: ({ children }) => <BlockHeading type="h4">{children}</BlockHeading>,
    h5: ({ children }) => <BlockHeading type="h5">{children}</BlockHeading>,
    h6: ({ children }) => <BlockHeading type="h6">{children}</BlockHeading>,

    normal: ({ children }) => (
      <p className="my-2 font-sans text-base leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-brandprimary-600 my-4 border-l-2 px-2 font-sans text-base">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImageAsset }) => {
      const src = value ? urlForImage(value) : "";
      return (
        <BlockImage
          src={src}
          alt={value.altText ?? ""}
          caption={value?.altText ?? ""}
        />
      );
    },
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <ul className="my-2 ml-6 list-disc font-sans">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-2 ml-6 list-decimal font-sans">{children}</ol>
    ),

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }) => (
      <ol className="ml-6 font-sans">✔{children}</ol>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value: { href: string; blank: string };
    }) => {
      return (
        <a
          href={value?.href}
          rel="noopener noreferrer"
          target={value?.blank ? "_blank" : "_self"}
          className="text-brandprimary-700 font-medium underline decoration-dashed underline-offset-4"
        >
          {children}
        </a>
      );
    },
    internalLink: ({ children }) => {
      return <p>{children}</p>;
    },
  },
} as PortableTextComponents;

function ContentReader({ content }: { content: BlockContent | undefined }) {
  if (!content) return null;
  return <PortableText value={content} components={components} />;
}

export default ContentReader;
