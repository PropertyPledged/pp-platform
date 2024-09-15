import Heading from '@/components/atoms/Heading'
import Logo from '@/components/atoms/Logo'
import Text from '@/components/atoms/Text'
import Image from 'next/image'
import React from 'react'

function SuggestionPage() {
    return (
        <div className="relative min-h-screen">
            <div className="absolute -z-0 flex h-screen w-full justify-end">
                <Image
                    src="/wavy.png"
                    width={600}
                    height={600}
                    alt="wavy graphic"
                    className="h-full w-1/3 object-cover"
                />
            </div>
            <div className="mx-auto flex max-w-screen-lg flex-col items-center justify-center gap-4 py-40">
                <div className="h-16 w-16">
                    <Logo />
                </div>
                <div className="space-y-6">
                    <Heading className="text-center">
                        Help us improve Property Pledged
                    </Heading>
                    <Text className="mx-auto max-w-lg text-center">
                        Your feedback is invaluable to us! We&apos;d love to
                        hear your thoughts on how we can make Property Pledge
                        better for you.
                    </Text>
                </div>
                <div>{/* form */}</div>
            </div>
        </div>
    )
}

export default SuggestionPage
