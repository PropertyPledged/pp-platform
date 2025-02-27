'use server'

import { env } from '@/env'
import { resend } from '@/lib/resend'
import { type CreateContactOptions } from 'resend'
import { draftMode } from 'next/headers'

export const addContact = async (contact: CreateContactOptions) => {
    return await resend.contacts.create({
        ...contact,
        audienceId: env.RESEND_AUDIENCE_ID ?? '',
    })
}

export async function disableDraftMode() {
    const disable = (await draftMode()).disable()
    const delay = new Promise((resolve) => setTimeout(resolve, 1000))
    await Promise.allSettled([disable, delay])
}
