'use client'

import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheckBig, Loader } from 'lucide-react'
import { z } from 'zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

type SubscriptionFormProps = {
    hideLabel?: boolean
    bgMode?: 'dark' | 'light'
} & React.ComponentProps<'form'>

const subscribeSchema = z.object({
    email: z.string().email(),
})

function SubscriptionForm({
    bgMode = 'dark',
    hideLabel = false,
    ...props
}: SubscriptionFormProps) {
    const [showDone, setShowDone] = useState(false)
    const form = useForm<z.infer<typeof subscribeSchema>>({
        resolver: zodResolver(subscribeSchema),
        defaultValues: {
            email: '',
        },
    })
    const subscribe = api.subscription.subscribe.useMutation({
        onSettled: () => {
            setShowDone(true)
            form.reset({
                email: '',
            })
            setTimeout(() => {
                setShowDone(false)
            }, 4000)
        },
    })

    const onSubmit = form.handleSubmit(async (values) => {
        subscribe.mutate({ ...values })
    })
    return (
        <Form {...form}>
            <form
                className="flex items-end gap-6"
                {...props}
                onSubmit={onSubmit}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel
                                htmlFor="email"
                                className={cn('text-base', {
                                    'sr-only': hideLabel,
                                })}>
                                Your email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter your email"
                                    className={cn(
                                        'h-12 w-96 border-gray-100 bg-white/10 placeholder:text-gray-300',
                                        {
                                            'border-primary placeholder:text-gray-400':
                                                bgMode === 'light',
                                        },
                                    )}
                                />
                            </FormControl>
                            <FormMessage className="absolute -bottom-8" />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    variant="default"
                    disabled={
                        subscribe.isPending ||
                        !form.formState.isDirty ||
                        !form.formState.isValid
                    }
                    className={cn(
                        'min-w-36 space-x-2 bg-white px-4 py-2 text-primary',
                        {
                            'bg-primary text-white': bgMode === 'light',
                        },
                    )}>
                    {subscribe.isPending && (
                        <Loader className="mr-2 size-4 animate-spin" />
                    )}{' '}
                    {showDone && (
                        <CircleCheckBig className="animate-ease mr-2 size-4" />
                    )}{' '}
                    {showDone ? 'Subscribed!' : 'Subscribe'}
                </Button>
            </form>
        </Form>
    )
}

export default SubscriptionForm
