'use server'

import { env } from '@/env'
import { resend } from '@/lib/resend'
import { type CreateContactOptions } from 'resend'

export const addContact = async (contact: CreateContactOptions) => {
    return await resend.contacts.create({
        ...contact,
        audienceId: env.RESEND_AUDIENCE_ID ?? '',
    })
}
