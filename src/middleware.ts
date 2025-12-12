import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const loggedIn = req.cookies.get('sb-access-token')

    if (
        !loggedIn &&
        (req.nextUrl.pathname.startsWith('/dashboard') ||
            req.nextUrl.pathname.startsWith('/chat'))
    ) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}
