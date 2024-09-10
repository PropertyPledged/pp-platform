import Footer from '@/components/organisms/Footer'
import Navbar from '@/components/organisms/Navbar'
import '@/styles/globals.css'
import { TRPCReactProvider } from '@/trpc/react'
import { type Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
    title: 'Property Pledged',
    description:
        'Discover transparent, reliable feedback on properties and landlords helping you avoid common pitfalls and find your perfect rental.',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={poppins.className}>
            <body>
                <Navbar />
                <TRPCReactProvider>{children}</TRPCReactProvider>
                <Footer />
            </body>
        </html>
    )
}
