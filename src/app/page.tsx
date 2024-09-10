// import { api, HydrateClient } from '@/trpc/server'
import Heading from '@/components/atoms/Heading'
import ListWrapper from '@/components/atoms/ListWrapper'
import Text from '@/components/atoms/Text'
import { Badge } from '@/components/ui/badge'
import { UsersRound, Lightbulb, Crown, Heart } from 'lucide-react'
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
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

export default async function Home() {
    // const hello = await api.post.hello({ text: "from tRPC" });
    // void api.post.getLatest.prefetch()

    return (
        // <HydrateClient>
        <main className="min-h-screen w-full space-y-10">
            <section className="mx-auto max-w-screen-2xl py-10">
                Hero section
            </section>
            <section
                id="about-us"
                className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:px-0">
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
        </main>
        // </HydrateClient>
    )
}
