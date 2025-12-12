'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
    return (
        <div className="grid gap-4 max-w-4xl">
            <div className="bg-white p-4 rounded border">
                <h2 className="font-semibold">Assistente IA</h2>
                <p className="text-sm text-gray-600">
                    Planeamento pedagógico inteligente
                </p>
                <a href="/chat" className="underline text-sm">
                    Abrir chat →
                </a>
            </div>

            <div className="bg-white p-4 rounded border">
                <h2 className="font-semibold">Relatórios</h2>
                <p className="text-sm text-gray-600">
                    Em breve
                </p>
            </div>
        </div>
    )
}
