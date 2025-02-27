import { cva, type VariantProps } from "class-variance-authority";
import { createElement } from "react";

const TextVariants = cva("font-sans", {
  variants: {
    as: {
      p: "text-base",
      span: "text-sm",
      small: "text-xs",
    },
    variant: {
      muted: "text-gray-400",
    },
  },
  defaultVariants: {
    as: "p",
  },
});

interface TextProps
  extends React.HTMLAttributes<
      HTMLParagraphElement | HTMLSpanElement | HTMLDivElement
    >,
    VariantProps<typeof TextVariants> {
  as?: "p" | "span" | "small";
}

function Text({ as = "p", children, className, variant, ...props }: TextProps) {
  return createElement(
    as,
    {
      className: TextVariants({ as, variant: variant, className }),
      ...props,
    },
    children,
  );
}

export default Text;
