// import { api, HydrateClient } from '@/trpc/server'
import Heading from '@/components/atoms/Heading'
import ListWrapper from '@/components/atoms/ListWrapper'
import Text from '@/components/atoms/Text'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    UsersRound,
    Lightbulb,
    Crown,
    Heart,
    ChevronLeft,
    ChevronRight,
    Building2,
    ShieldCheck,
    MapPin,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
    CardFooter,
} from '@components/ui/card'

const abouts = [
    {
        title: 'Who we are',
        description:
            'Property pledge connects tenants, lease-holders, landlords and property managers with reliable, verified property reviews.',
        icon: <UsersRound size={32} className="text-green-600" />,
    },
    {
        title: 'Our mission',
        description:
            'We aim to bring transparency and accountability to the rental market through honest feedback and real experiences.',
        icon: <Lightbulb size={32} className="text-amber-700" />,
    },
    {
        title: 'What we offer',
        description:
            'Our platform provides detailed reviews and insights to help you find the best properties and improve your rental experience.',
        icon: <Crown size={32} className="text-pink-500" />,
    },
    {
        title: 'Join our community',
        description:
            'Share your experiences, find trustworthy properties, and connect with others to make informed decisions.',
        icon: <Heart size={32} className="text-red-700" />,
    },
]

const flows = [
    {
        title: 'Step 1: Sign Up or Log in',
        description:
            'Create an account or log in using your Google or Facebook account. Choose whether you are a tenant, landlord, or property agent. This helps us tailor you experience.',
    },
    {
        title: 'Step 2: Browse Reviews',
        description:
            'Use our search bar to find reviews based on keywords, locations, or specific properties. Filter and sort reviews to narrow down your search.',
    },
    {
        title: 'Step 3: Write a Review',
        description:
            'Share your experiences by writing a review of your current or previous property. Upload supporting documents like lease agreements or payment receipts for verification.',
    },
    {
        title: 'Step 4: Verify your Review',
        description:
            'Property Pledge uses AI and third-party verification to authenticate reviews This ensures that all reviews that are posted on the platform are genuine and trustworthy.',
    },
    {
        title: 'Step 5: Engage with the Community',
        description:
            'Interact with other users by commenting on reviews and marking them as helpful. Respond to feedback and improve your property management practices.',
    },
    {
        title: 'Step 6: Use Analytics (For Landlords)',
        description:
            'Access the analytics dashboard to monitor trends in tenant feedback, identify common issues and improve your property management service.',
    },
]

export default async function Home() {
    // const hello = await api.post.hello({ text: "from tRPC" });
    // void api.post.getLatest.prefetch()

    return (
        // <HydrateClient>
        <main className="min-h-screen w-full space-y-10">
            <section
                id="hero"
                className="relative mx-auto gap-10 px-6 lg:h-[60vh] 2xl:px-0">
                <div className="relative mx-auto h-full max-w-screen-2xl space-y-5">
                    <div className="mx-auto flex h-full flex-col items-start justify-center space-y-6">
                        <Heading className="max-w-xl text-6xl">
                            Make smart property choices now
                        </Heading>
                        <Text className="max-w-xl text-lg text-gray-500">
                            Discover transparent, reliable feedback on
                            properties and landlords, helping you avoid common
                            pitfalls and find your perfect rental.
                        </Text>
                        <Button className="w-48">Get Started</Button>
                    </div>
                    <div className="absolute -bottom-28 z-10 flex h-40 w-full flex-col justify-center space-y-4 rounded-xl border border-gray-200 bg-white px-10 shadow-sm">
                        <Heading as="h3">Search for reviews</Heading>
                        <div className="flex items-center justify-between gap-12">
                            <div className="flex w-full flex-1 items-center gap-x-8">
                                <div className="relative flex w-full items-center">
                                    <label htmlFor="search" className="sr-only">
                                        Search for properties
                                    </label>

                                    <Input
                                        placeholder="Search by location e.g Manchester, UK"
                                        className="border-gray-300 bg-transparent placeholder:text-gray-300"
                                    />
                                    <MapPin
                                        size={24}
                                        className="absolute right-3 text-gray-300"
                                    />
                                </div>
                                <div className="relative flex w-full items-center">
                                    <label htmlFor="search" className="sr-only">
                                        Search for properties
                                    </label>

                                    <Input
                                        placeholder="Search by property type e.g Apartment"
                                        className="border-gray-300 bg-transparent placeholder:text-gray-300"
                                    />
                                    <Building2
                                        size={24}
                                        className="absolute right-3 text-gray-300"
                                    />
                                </div>
                            </div>
                            <Button className="w-48">Search Now</Button>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 flex h-full w-full justify-end">
                    <Image
                        width={600}
                        height={600}
                        alt="Property Pledge"
                        src="/heroimg.png"
                        className="h-full w-1/2 bg-gradient-to-r"
                        unoptimized
                    />
                </div>
            </section>
            <section
                id="about-us"
                className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:px-0 2xl:py-48">
                <div className="col-span-1 space-y-3">
                    <Badge className="h-12 rounded-md bg-gray-200 px-4 text-sm font-thin text-primary">
                        About us
                    </Badge>

                    <Heading>Here&apos;s what we do</Heading>
                    <Text className="text-gray-500">
                        We are your trusted partner in property rentals,
                        offering verified reviews and insights for a smarter
                        living.
                    </Text>
                </div>
                <div className="col-span-1 grid grid-cols-1 gap-12 md:grid-cols-2 lg:col-span-2">
                    <ListWrapper
                        list={abouts}
                        keyExtractor={(about) => about.title}>
                        {(about) => (
                            <Card className="border-gray-200 p-5 shadow-sm">
                                <CardHeader>
                                    <span>{about.icon}</span>
                                    <CardTitle>
                                        <Heading
                                            as="h3"
                                            className="font-medium">
                                            {about.title}
                                        </Heading>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        <Text>{about.description}</Text>
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        )}
                    </ListWrapper>
                </div>
            </section>
            <section
                id="reviews"
                className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center gap-10 px-6 py-10 lg:py-24 2xl:px-0">
                <div className="flex w-full flex-col items-center justify-center gap-4">
                    <Badge className="h-12 rounded-md bg-gray-200 px-4 text-sm font-thin text-primary">
                        Reviews
                    </Badge>

                    <Heading>Real experiences, real feedback</Heading>
                    <Text className="max-w-lg text-center text-lg text-gray-500">
                        Read what others are saying about their own personal
                        experiences.
                    </Text>
                </div>
                <div className="col-span-1 grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-3">
                    <ListWrapper
                        list={Array.from({ length: 3 }, (_, i) => ({ i }))}
                        keyExtractor={(about) => about.i}>
                        {() => (
                            <Card className="border-gray-200 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between gap-3">
                                    <CardTitle className="flex items-center gap-x-5">
                                        <Building2
                                            size={18}
                                            className="text-primary"
                                        />
                                        <Heading
                                            as="h3"
                                            className="text-base font-semibold text-primary">
                                            Maple Apartments, London
                                        </Heading>
                                    </CardTitle>
                                    <ShieldCheck
                                        size={24}
                                        className="text-green-500"
                                    />
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        <Text className="text-base text-gray-500">
                                            Great place to live, responsive
                                            landlord, and excellent facilities!
                                            Although i got into a bit of an
                                            altercation in the beginning with my
                                            landlord, everything else was
                                            perfect.
                                            <Link
                                                href="/review-slug"
                                                className="text-bold ml-2 text-base text-primary">
                                                Read More.
                                            </Link>
                                        </Text>
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="flex flex-row items-start justify-between gap-3">
                                    <Text className="text-sm text-gray-500">
                                        May 23, 2024
                                    </Text>
                                    <span className="flex flex-col">
                                        <Text className="text-base text-primary">
                                            Laura T.
                                        </Text>
                                        <Text className="text-sm text-gray-500">
                                            Tenant
                                        </Text>
                                    </span>
                                </CardFooter>
                            </Card>
                        )}
                    </ListWrapper>
                </div>
                <div className="flex items-center justify-center gap-8">
                    <Button
                        variant="outline"
                        className="flex h-10 w-10 items-center justify-center rounded-full p-2">
                        <ChevronLeft className="h-full w-full" />
                    </Button>
                    <Button
                        variant="outline"
                        className="flex h-10 w-10 items-center justify-center rounded-full p-2">
                        <ChevronRight className="h-full w-full" />
                    </Button>
                </div>
            </section>
            <section
                id="how-to"
                className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center gap-10 px-6 py-10 lg:py-24 2xl:px-0">
                <div className="flex w-full flex-col items-center justify-center gap-4">
                    <Badge className="h-12 rounded-md bg-gray-200 px-4 text-sm font-thin text-primary">
                        How to
                    </Badge>

                    <Heading>Here&apos;s how you can use our platform</Heading>
                    <Text className="max-w-lg text-center text-lg text-gray-500">
                        Follow these simple steps to navigate the platform, find
                        reliable property reviews, and share your own
                        experiences with ease.
                    </Text>
                </div>
                <div className="col-span-1 grid w-full grid-cols-1 gap-12 md:grid-cols-2">
                    <ListWrapper
                        list={flows}
                        keyExtractor={(flow) => flow.title}>
                        {(flow) => (
                            <div className="col-span-1 w-full space-y-3 rounded-sm border-l-4 border-primary px-6 py-12">
                                <Heading
                                    as="h3"
                                    className="font-semibold text-primary">
                                    {flow.title}
                                </Heading>
                                <Text className="max-w-lg text-gray-500">
                                    {flow.description}
                                </Text>
                            </div>
                        )}
                    </ListWrapper>
                </div>
            </section>
            <section
                id="how-to"
                className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-10 px-6 py-10 lg:py-28 2xl:px-0">
                <div className="bg-blue flex w-full flex-col items-start justify-center gap-6">
                    <Heading className="max-w-xl">
                        Got an idea? We definitely want to hear from you!
                    </Heading>
                    <Text className="max-w-2xl text-lg text-gray-500">
                        Help us make Property Pledge even better. Your insights
                        and suggestions can shape the future of Property Pledge.
                        Share your thoughts and help us create a platform that
                        meets all your needs.
                    </Text>

                    <Button className="w-48">Share your ideas</Button>
                </div>
                <div className="flex items-center justify-center">
                    <Image
                        width={400}
                        height={400}
                        alt="Listen to feedback"
                        src="/listenfeedback.png"
                        className="object-contain"
                    />
                </div>
            </section>
        </main>
        // </HydrateClient>
    )
}
