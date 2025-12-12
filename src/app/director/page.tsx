'use client'
import { useEffect, useState } from 'react'

export default function DirectorDashboard() {
    const [metrics, setMetrics] = useState<any[]>([])

    useEffect(() => {
        fetch('/api/director/metrics')
            .then((r) => r.json())
            .then((data) => {
                if (Array.isArray(data)) setMetrics(data)
            })
            .catch(console.error)
    }, [])

    return (
        <div className="max-w-4xl space-y-4 p-6">
            <h1 className="text-xl font-semibold">
                Dashboard da Direção
            </h1>

            {metrics.length === 0 && <p>A carregar ou sem dados...</p>}

            {metrics.map((m, i) => (
                <div key={i} className="bg-white border p-4 rounded">
                    <p className="font-bold mb-2">Semana: {new Date(m.week).toLocaleDateString()}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-gray-500 text-sm">Professores ativos</span>
                            <p className="text-lg">{m.active_teachers}</p>
                        </div>
                        <div>
                            <span className="text-gray-500 text-sm">Perguntas à IA</span>
                            <p className="text-lg">{m.total_questions}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
