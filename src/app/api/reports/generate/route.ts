import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { supabase } from '@/lib/supabase'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST() {
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: chats } = await supabase
        .from('ai_chat_logs')
        .select('prompt,response')
        .eq('user_id', user.id)
        .limit(20)

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system',
                content:
                    'Gera um relatório pedagógico semanal curto para um professor.',
            },
            {
                role: 'user',
                content: JSON.stringify(chats),
            },
        ],
    })

    const summary =
        completion.choices[0].message.content ?? ''

    await supabase.from('teacher_reports').insert({
        teacher_id: user.id,
        week_start: new Date(),
        summary,
    })

    return NextResponse.json({ summary })
}
