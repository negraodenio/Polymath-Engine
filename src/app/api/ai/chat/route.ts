import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { supabase } from '@/lib/supabase'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
    const { prompt } = await req.json()

    // 1. Get User
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Get User Profile & School Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('school_id')
        .eq('id', user.id)
        .single()

    const { data: school } = await supabase
        .from('school_profiles')
        .select('*')
        .eq('school_id', profile?.school_id)
        .single()

    // 3. Construct System Prompt with Context
    const systemPrompt = `
És um assistente pedagógico especializado em matemática escolar em Portugal.

Foco: ${school?.pedagogical_focus ?? 'Geral'}
Nível: ${school?.level ?? 'Ensino Básico e Secundário'}
`

    // 4. Call OpenAI
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system',
                content: systemPrompt,
            },
            { role: 'user', content: prompt },
        ],
    })

    const response = completion.choices[0].message.content ?? ''

    // 5. Log to Supabase
    await supabase.from('ai_chat_logs').insert({
        user_id: user.id,
        prompt,
        response,
    })

    return NextResponse.json({ response })
}
