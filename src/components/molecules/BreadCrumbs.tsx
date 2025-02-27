'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getBreadcrumbs, type PATH } from '@/lib/getBreadcrumbs'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { Slash } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import ListWrapper from '../atoms/ListWrapper'

const colorVariant = cva('', {
    variants: {
        color: {
            default: 'text-brandprimary-900',
            primary: 'text-brandprimary-700',
            light: 'text-brandaccent-50',
        },
    },
    defaultVariants: {
        color: 'default',
    },
})

type BreadCrumbsProps = {
    color?: 'default' | 'primary' | 'light'
}

function BreadCrumbs({ color = 'default' }: BreadCrumbsProps) {
    const [paths, setPaths] = useState<PATH[]>([])

    useEffect(() => {
        if (typeof window === 'undefined') return
        const path = window.location.pathname
        const breadcrumbs = getBreadcrumbs(path)
        setPaths(breadcrumbs)
    }, [])
    return (
        <Breadcrumb>
            <BreadcrumbList className={cn(colorVariant({ color }))}>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        href="/"
                        data-active={
                            typeof window !== 'undefined'
                                ? window?.location.pathname === '/'
                                : false
                        }
                        className="font-sans data-[active=false]:text-current">
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Slash size={16} />
                </BreadcrumbSeparator>
                <ListWrapper list={paths} keyExtractor={(path) => path.name}>
                    {(path) => (
                        <Fragment>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href={path.href}
                                    aria-disabled={path.active}
                                    data-active={path.active}
                                    className="font-sans capitalize aria-disabled:pointer-events-none aria-disabled:text-current aria-disabled:opacity-60 data-[active=false]:text-current">
                                    {path.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="last:hidden">
                                <Slash size={16} />
                            </BreadcrumbSeparator>
                        </Fragment>
                    )}
                </ListWrapper>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
export default BreadCrumbs
