import React from 'react'
import Heading from '../atoms/Heading'

type BlockHeadingProps = {
    children: React.ReactNode
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

function BlockHeading({ children, type }: BlockHeadingProps) {
    if (!children) return null
    return <Heading as={type}>{children}</Heading>
}

export default BlockHeading
