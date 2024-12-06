'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import ListWrapper from '@components/atoms/ListWrapper'

const links = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'About Us',
        href: '/about-us',
    },
    {
        label: 'Community',
        href: '/community',
    },
    {
        label: 'Blog',
        href: '/blog',
    },
]

function Navlinks() {
    const pathname = usePathname()

    return (
        <div className="space-x-12">
            <ListWrapper list={links} keyExtractor={(item) => item.label}>
                {(link) => {
                    const active = pathname === link.href
                    return (
                        <Link
                            href={link.href}
                            passHref
                            className={cn('text-sm', {
                                'underline underline-offset-[14px]': active,
                            })}>
                            {link.label}
                        </Link>
                    )
                }}
            </ListWrapper>
        </div>
    )
}

export default Navlinks
