import Heading from '@/components/atoms/Heading'
import ListWrapper from '@/components/atoms/ListWrapper'
import Text from '@/components/atoms/Text'
import HeroSection from '@/components/templates/HeroSection'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { disableCore } from '@/lib/flags'
import { cn } from '@/lib/utils'
// import { api, HydrateClient } from '@/trpc/server'
import {
    Profile2User,
    Crown1,
    LampCharge,
    Heart,
    Building3,
    ArrowLeft2,
    ArrowRight2,
    ShieldTick,
} from 'iconsax-react'
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
        icon: <Profile2User size={34} className="text-green-600" />,
    },
    {
        title: 'Our mission',
        description:
            'We aim to bring transparency and accountability to the rental market through honest feedback and real experiences.',
        icon: <LampCharge size={34} className="text-amber-600" />,
    },
    {
        title: 'What we offer',
        description:
            'Our platform provides detailed reviews and insights to help you find the best properties and improve your rental experience.',
        icon: <Crown1 size={34} className="text-pink-500" />,
    },
    {
        title: 'Join our community',
        description:
            'Share your experiences, find trustworthy properties, and connect with others to make informed decisions.',
        icon: <Heart size={34} className="text-red-700" />,
    },
]

export default async function Home() {
    // const hello = await api.post.hello({ text: "from tRPC" });
    // void api.post.getLatest.prefetch()
    const coreDisable = await disableCore()

    return (
        // <HydrateClient>
        <main className="min-h-screen w-full space-y-10">
            <HeroSection />
            <section
                id="about-us"
                className={cn(
                    'mx-auto mt-20 grid max-w-screen-2xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:px-0 2xl:py-48',
                    { '2xl:py-36': coreDisable },
                )}>
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
                                    <CardDescription>
                                        <Text>{about.description}</Text>
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        )}
                    </ListWrapper>
                </div>
            </section>
            {coreDisable ? null : (
                <section
                    id="reviews"
                    className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center gap-10 px-6 py-10 lg:py-10 2xl:px-0">
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
                                            <Building3
                                                size={18}
                                                className="text-primary"
                                            />
                                            <Heading
                                                as="h3"
                                                className="text-base font-semibold text-primary">
                                                Maple Apartments, London
                                            </Heading>
                                        </CardTitle>
                                        <ShieldTick
                                            size={26}
                                            className="text-green-500"
                                        />
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            <Text className="text-base text-gray-500">
                                                Great place to live, responsive
                                                landlord, and excellent
                                                facilities! Although i got into
                                                a bit of an altercation in the
                                                beginning with my landlord,
                                                everything else was perfect.
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
                            className="flex h-10 w-10 items-center justify-center rounded-full p-2 hover:bg-gray-100">
                            <ArrowLeft2 className="h-full w-full" />
                        </Button>
                        <Button
                            variant="outline"
                            className="flex h-10 w-10 items-center justify-center rounded-full p-2 hover:bg-gray-100">
                            <ArrowRight2 className="h-full w-full" />
                        </Button>
                    </div>
                </section>
            )}
            <section
                id="how-to"
                className="mx-auto flex flex-col items-center justify-center gap-10 px-6 py-10 md:max-w-screen-xl lg:py-24 2xl:px-0">
                <div className="flex w-full flex-col items-center justify-center gap-4">
                    <Badge className="h-12 rounded-md bg-gray-200 px-4 text-sm font-thin text-primary">
                        Features
                    </Badge>

                    <Heading>Explore what we offer</Heading>
                    <Text className="max-w-lg text-center text-lg text-gray-500">
                        Your trusted platform for effortless property
                        management, expert guidance, and a smoother rental
                        journey for everyone.
                    </Text>
                </div>
                <div className="w-full max-w-screen-lg columns-2 gap-10">
                    <div className="flex h-auto flex-1 basis-1/3 flex-col items-center justify-center rounded-xl bg-gray-200 p-8 pb-10">
                        <Image
                            width={600}
                            height={500}
                            alt="Listen to feedback"
                            src="/reviewfeature.png"
                            className="object-contain"
                        />

                        <div className="flex flex-col items-start justify-center gap-2">
                            <Heading as="h3">Verified property reviews</Heading>
                            <Text className="max-w-md text-gray-500">
                                Read trusted reviews from verified tenants and
                                landlords to make informed decisions.
                            </Text>
                        </div>
                    </div>
                    <div className="mt-10 flex h-auto flex-col items-center justify-center rounded-xl bg-gray-200 p-5 pb-10">
                        <Image
                            width={600}
                            height={500}
                            alt="Listen to feedback"
                            src="/responsivefeature.png"
                            className="object-contain"
                        />

                        <div className="flex flex-col items-start justify-center gap-2">
                            <Heading as="h3">
                                Responsive landlord & tenant communication
                            </Heading>
                            <Text className="max-w-md text-gray-500">
                                Promote transparency and timely communication
                                between landlords and tenants for a smoother
                                experience.
                            </Text>
                        </div>
                    </div>
                    <div className="mt-10 flex h-auto flex-col items-center justify-center rounded-xl bg-gray-200 p-5 pb-10">
                        <Image
                            width={500}
                            height={500}
                            alt="Listen to feedback"
                            src="/accountfeature.png"
                            className="object-contain"
                        />

                        <div className="flex flex-col items-start justify-center gap-2">
                            <Heading as="h3">Seamless account creation</Heading>
                            <Text className="max-w-md text-gray-500">
                                Quickly create an account and start sharing your
                                experience or searching for reviews with ease.
                            </Text>
                        </div>
                    </div>

                    <div className="mt-10 h-auto flex-col items-center justify-center rounded-xl bg-gray-200 p-5 pb-10">
                        <Image
                            width={600}
                            height={500}
                            alt="Stay informed"
                            src="/stayinformedfeature.png"
                            className="object-contain"
                        />

                        <div className="flex flex-col items-start justify-center gap-2">
                            <Heading as="h3">
                                Stay informed with our expert blog.
                            </Heading>
                            <Text className="max-w-md text-gray-500">
                                Your go-to resource for property tips, market
                                trends and expert advice on all things real
                                estate.
                            </Text>
                        </div>
                    </div>
                </div>
            </section>
            <section
                id="hear-from-you"
                className="mx-auto grid max-w-screen-lg grid-cols-2 gap-10 px-6 py-10 lg:max-w-screen-xl lg:py-28 2xl:px-0">
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

                    <Link
                        href="/suggestion"
                        passHref
                        className="w-48 rounded-md bg-primary p-4 px-6 text-sm text-white hover:bg-primary/80">
                        Share your ideas
                    </Link>
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
