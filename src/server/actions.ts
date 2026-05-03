'use server'

import { env } from '@/env'
import { resend } from '@/lib/resend'
import { type CreateContactOptions } from 'resend'
import { draftMode } from 'next/headers'
import { db } from '@/server/db'
import { users } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@/server/auth'

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

export async function markUserAsOnboarded() {
    const session = await auth.api.getSession({
        headers: await import('next/headers').then(m => m.headers()),
    })
    
    if (!session?.user?.id) {
        throw new Error('Not authenticated')
    }
    
    await db.update(users)
        .set({ onboarded: true })
        .where(eq(users.id, session.user.id))
}
