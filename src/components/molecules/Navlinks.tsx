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

type NavlinksProps = {
    cb?: VoidFunction
}

function Navlinks({ cb }: NavlinksProps) {
    const pathname = usePathname()

    return (
        <div className="relative z-10 flex flex-col items-center gap-16 lg:flex-row lg:gap-10">
            <ListWrapper list={links} keyExtractor={(item) => item.label}>
                {(link) => {
                    let isActive = false
                    if (link.href === '/') {
                        isActive = pathname === link.href
                    } else {
                        // remove the initial slash from the pathname
                        const pathnameWithoutSlash = pathname.slice(1)
                        isActive = pathnameWithoutSlash?.includes(
                            link.href.slice(1),
                        )
                    }
                    return (
                        <Link
                            passHref
                            href={link.href}
                            onClick={() => cb && cb()}
                            className={cn('text-2xl lg:text-sm', {
                                'underline underline-offset-[14px]': isActive,
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
