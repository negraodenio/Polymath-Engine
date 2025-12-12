import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
    const { email, school_id } = await req.json()

    await supabase.from('school_invites').insert({
        email,
        school_id,
    })

    return NextResponse.json({
        invite:
            process.env.NEXT_PUBLIC_BASE_URL +
            '/login?email=' +
            email,
    })
}
