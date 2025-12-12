export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b px-6 py-3 flex justify-between">
                <span className="font-bold">Matemática.ai</span>
                <a href="/dashboard" className="text-sm">
                    Dashboard
                </a>
            </header>
            <main className="p-6">{children}</main>
        </div>
    )
}
