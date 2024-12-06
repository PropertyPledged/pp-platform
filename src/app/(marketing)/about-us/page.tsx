import Heading from '@/components/atoms/Heading'
import ListWrapper from '@/components/atoms/ListWrapper'
import Text from '@/components/atoms/Text'
import JoinCommunity from '@/components/molecules/JoinCommunity'
import { Badge } from '@/components/ui/badge'
import { Bookmark2, Eye, LampCharge, Profile2User } from 'iconsax-react'
import Image from 'next/image'
import React from 'react'

const coreValues = [
    {
        title: 'Transparency',
        icon: <Eye className="size-8 text-blue-600" />,
        description:
            'Committed to providing clear and accurate information for all property related decisions.',
    },
    {
        title: 'Accountability',
        icon: <Bookmark2 className="size-8 text-pink-600" />,
        description:
            'Dedicated to holding property managers and landlords accountable for their actions.',
    },
    {
        title: 'Community',
        icon: <Profile2User className="size-8 text-green-600" />,
        description:
            'Building a supportive and collaborative community of renters, leaseholders, landlords.',
    },
    {
        title: 'Innovation',
        icon: <LampCharge className="size-8 text-amber-600" />,
        description:
            'Continously enhancing our platform based on user feedback to better serve the property market.',
    },
]

function AboutUsPage() {
    return (
        <div className="mx-auto min-h-screen max-w-screen-2xl space-y-10 px-6 py-10 pb-36 xl:px-0">
            <div className="flex h-[50vh] items-center justify-between overflow-hidden rounded-2xl bg-gray-200 pl-12">
                <div className="w-full max-w-2xl space-y-3">
                    <Heading className="text-6xl leading-tight">
                        Building a transparent property market.
                    </Heading>
                    <Text className="max-w-xl">
                        Empowering tenants, leaseholders, landlords and property
                        agents with the tools and information they need for a
                        transparent, accountable and trustworthy property
                        experience.
                    </Text>
                </div>
                <Image
                    width={800}
                    height={400}
                    src="/isolatedhouse.png"
                    alt="About property pledged"
                    className="h-full w-1/2 object-cover"
                />
            </div>

            <section className="space-y-4 py-28">
                <Badge className="h-12 rounded-md bg-gray-200 px-4 text-sm font-thin text-primary">
                    Discover our journey
                </Badge>
                <div className="grid grid-cols-2">
                    <div className="col-span-1 space-y-3">
                        <Heading>Our mission and story</Heading>
                        <Text className="max-w-lg">
                            Our journey towards creating a transparent and
                            accountable property market.
                        </Text>
                        <Image
                            width={800}
                            height={400}
                            src="/missionandstory.png"
                            alt="Our mission and story"
                            className="h-[500px] w-3/4 rounded object-cover"
                        />
                    </div>
                    <div className="col-span-1 max-w-lg space-y-6">
                        <Text>
                            At Property Pledge, our mission is to revolutionize
                            property management and create a transparent,
                            accountable, and user-friendly environment for all
                            stakeholders.
                        </Text>
                        <Text>
                            Founded by property enthusiasts who have experienced
                            the challenges of real estate market firsthand,
                            Property Pledge aims to bridge the gap between
                            tenants, leaseholders, landlords, and property
                            managers. Our platform was born out of a need for
                            reliable information, verified reviews, and a space
                            where everyone can share their experiences and find
                            trustworthy partners in property management.
                        </Text>
                        <Text>
                            By leveraging advanced technology and a user centric
                            approach, we strive to empower our users with the
                            tools they need to make informed decisions, improve
                            their living conditions, and foster a community of
                            trust and transparency in the property market.
                        </Text>
                    </div>
                </div>
            </section>
            <section className="space-y-8 py-28">
                <div className="flex flex-col items-center justify-center gap-4">
                    <Badge className="h-12 rounded-md bg-gray-200 px-4 text-sm font-thin text-primary">
                        Core values
                    </Badge>
                    <Heading>Our guiding principles</Heading>
                    <Text className="max-w-md text-center">
                        The foundational value that drive our commitment to
                        revolutionizing the property market.
                    </Text>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <ListWrapper
                        list={coreValues}
                        keyExtractor={(item) => item.title}>
                        {(item) => (
                            <div className="rounded-lg border border-gray-300 p-5">
                                {item.icon}
                                <Heading className="mt-3 text-xl">
                                    {item.title}
                                </Heading>
                                <Text className="mt-3">{item.description}</Text>
                            </div>
                        )}
                    </ListWrapper>
                </div>
            </section>

            <JoinCommunity />
        </div>
    )
}

export default AboutUsPage
