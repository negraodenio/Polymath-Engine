'use client'
import { useState } from 'react'

export default function ChatPage() {
    const [prompt, setPrompt] = useState('')
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    async function send() {
        if (!prompt) return

        setLoading(true)

        const res = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        })

        const data = await res.json()

        setMessages([
            ...messages,
            { role: 'user', text: prompt },
            { role: 'ai', text: data.response },
        ])

        setPrompt('')
        setLoading(false)
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-4">
            <h1 className="text-xl font-semibold">Assistente Pedagógico</h1>

            <div className="space-y-2">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`p-3 rounded ${m.role === 'ai'
                                ? 'bg-gray-100'
                                : 'bg-black text-white'
                            }`}
                    >
                        {m.text}
                    </div>
                ))}
            </div>

            <textarea
                className="border w-full p-2 rounded"
                placeholder="Faça uma pergunta…"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />

            <button
                onClick={send}
                disabled={loading}
                className="bg-black text-white px-4 py-2 rounded"
            >
                {loading ? 'A responder…' : 'Enviar'}
            </button>
        </div>
    )
}
