import Image from 'next/image'
import React from 'react'
import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import SubscriptionForm from './SubscriptionForm'

function JoinCommunity() {
    return (
        <section className="flex max-h-[50vh] items-center justify-between rounded-lg bg-gray-200 p-28">
            <Image
                width={800}
                height={400}
                src="/listenfeedback.png"
                alt="Join our community"
                className="h-[200px] w-1/4 rounded object-contain"
            />
            <div className="flex w-1/2 flex-col items-center justify-center gap-y-5">
                <Heading className="text-center">Join our community!</Heading>
                <Text className="mx-auto max-w-xl text-center">
                    Whether you&apos;re a tenant, leaseholder, landlord, or
                    property agent., become part of Property Pledge to
                    contribute to and benefit from our growing community
                    dedicated to a better property experience.
                </Text>
                <SubscriptionForm bgMode="light" hideLabel />
            </div>
            <Image
                width={800}
                height={400}
                src="/workchat.png"
                alt="Join our community chat"
                className="h-[200px] w-1/4 rounded object-contain"
            />
        </section>
    )
}

export default JoinCommunity
