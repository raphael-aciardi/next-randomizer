'use server';

import { cookies } from "next/headers";
import { z } from "zod";

export async function drawAction(data: FormData) {
    const schema = z.object({
        name: z.string().trim().min(3, 'O nome precisa ter pelo menos 3 caracteres'),
        usernameGithub: z.string().trim().min(3, 'O username precisa ter pelo menos 3 caracteres'),
    })
    const parsed = schema.safeParse(Object.fromEntries(data));

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return { success: false, errors }
    }

    const { name, usernameGithub } = parsed.data

    const cookieStore = await cookies()
    const currentList = JSON.parse(cookieStore.get('listPeople')?.value ?? '[]')
    const newList = [...currentList, { name, usernameGithub }]
    
    cookieStore.set('listPeople', JSON.stringify(newList))

    return { success: true, errors: null }
}

export async function getList() {
    const cookieStore = await cookies()
    const currentList = JSON.parse(cookieStore.get('listPeople')?.value ?? '[]')
    return currentList as [{name: string, usernameGithub: string}]
}

