'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Navlinks from '@components/molecules/Navlinks'
import { Button } from '@components/ui/button'
import Logo from '../atoms/Logo'

function Navbar() {
    const pathname = usePathname()
    const hidden = ['/suggestion']

    if (hidden.includes(pathname)) return null
    return (
        <nav className="h-20 w-full px-6 2xl:px-0">
            <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between gap-x-4">
                <Logo />
                <div className="flex flex-1 items-center justify-end gap-x-14">
                    <Navlinks />
                    <div className="space-x-4">
                        <Button variant="outline" className="w-36">
                            Join Us
                        </Button>
                        <Button className="w-36">Write a review</Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
