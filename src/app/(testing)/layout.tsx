import Heading from '@/components/atoms/Heading'
import React from 'react'

function TestingLayout({ children }: { children: Readonly<React.ReactNode> }) {
    return (
        <div className="space-y-3 p-4">
            <Heading>This pages are only for testing ...</Heading>

            {children}
        </div>
    )
}

export default TestingLayout
