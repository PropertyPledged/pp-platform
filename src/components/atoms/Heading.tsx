import { cva, type VariantProps } from 'class-variance-authority'
import { createElement } from 'react'

const HeadingVariants = cva('font-sans text-primary', {
    variants: {
        as: {
            h1: 'text-4xl font-bold',
            h2: 'text-3xl font-bold',
            h3: 'text-2xl font-bold',
            h4: 'text-xl font-bold',
            h5: 'text-lg font-bold',
            h6: 'text-base font-bold',
        },
    },
    defaultVariants: {
        as: 'h1',
    },
})

interface HeadingProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof HeadingVariants> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

function Heading({ as = 'h1', className, children, ...props }: HeadingProps) {
    return createElement(
        as,
        {
            className: HeadingVariants({ as, className }),
            ...props,
        },
        children,
    )
}

export default Heading
