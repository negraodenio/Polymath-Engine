'use client'
import { useState } from 'react'

export default function ReportsPage() {
    const [report, setReport] = useState('')
    const [loading, setLoading] = useState(false)

    async function generate() {
        setLoading(true)
        const res = await fetch('/api/reports/generate', {
            method: 'POST',
        })
        const data = await res.json()
        setReport(data.summary)
        setLoading(false)
    }

    return (
        <div className="max-w-3xl space-y-4 p-6">
            <h1 className="text-xl font-semibold">
                Relatório Semanal
            </h1>

            <button
                onClick={generate}
                disabled={loading}
                className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? 'A gerar...' : 'Gerar relatório'}
            </button>

            {report && (
                <div className="bg-white border p-4 rounded whitespace-pre-line">
                    {report}
                </div>
            )}
        </div>
    )
}
