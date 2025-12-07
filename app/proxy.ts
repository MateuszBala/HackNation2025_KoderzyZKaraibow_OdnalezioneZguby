import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin')) {
        const user = request.cookies.get('user');

        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (pathname.startsWith('/login')) {
        const user = request.cookies.get('user');

        if (user) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}