'use client'
import { useState, Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { useSearchParams } from 'next/navigation'

function LoginForm() {
    const searchParams = useSearchParams()
    const [email, setEmail] = useState(searchParams.get('email') || '')
    const [sent, setSent] = useState(false)

    async function login() {
        await supabase.auth.signInWithOtp({ email })
        setSent(true)
    }

    return (
        <div className="space-y-4 w-80">
            {sent ? (
                <p>Verifique o email 📩</p>
            ) : (
                <>
                    <input
                        className="border p-2 w-full"
                        placeholder="email@escola.pt"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        onClick={login}
                        className="bg-black text-white w-full p-2"
                    >
                        Entrar
                    </button>
                </>
            )}
        </div>
    )
}

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <Suspense fallback={<div>Carregando...</div>}>
                <LoginForm />
            </Suspense>
        </main>
    )
}
