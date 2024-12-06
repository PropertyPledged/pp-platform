'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    suggestionSchema,
    type SuggestionType,
} from '@/schemas/suggestionSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import Text from '../atoms/Text'
import { Button } from '../ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'

function SuggestionForm() {
    const form = useForm<SuggestionType>({
        resolver: zodResolver(suggestionSchema),
        defaultValues: {
            name: '',
            email: '',
            feedback: [],
        },
    })

    const onSubmit = form.handleSubmit((data) => {
        console.log(data)
    })

    return (
        <div className="mx-auto w-full max-w-2xl">
            <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Jane Doe"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email *</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="janedoe@gmail.com"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Text className="text-lg font-semibold">
                        Select a category to share your thoughts and help us
                        improve
                    </Text>
                    <div className="space-y-4">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Experience</FormLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Ease of navigation" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Ease of navigation">
                                                Ease of navigation
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button variant="outline" className="w-full">
                            Add another category
                        </Button>
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Ease of navigation: How easy is it for
                                        you to find what you&apos;re looking for
                                        on the platform?
                                    </FormLabel>

                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Type here"
                                            className="placeholder:text-gray-300"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-4">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Platform features</FormLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Review system" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Review system">
                                                Review system
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Review system: How well does the review
                                        system work for your needs?
                                    </FormLabel>

                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Type here"
                                            className="placeholder:text-gray-300"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-4">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Customer support</FormLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Response time" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Response time">
                                                Response time
                                            </SelectItem>
                                            <SelectItem value="Helpfulness of support">
                                                Helpfulness of support
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Customer support: How helpful is our
                                        customer support?
                                    </FormLabel>

                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Type here"
                                            className="placeholder:text-gray-300"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={
                            !form.formState.isDirty || !form.formState.isValid
                        }>
                        Submit feedback
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SuggestionForm
