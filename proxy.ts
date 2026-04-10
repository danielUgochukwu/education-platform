import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
    canAccessPath,
    getDefaultRedirectPath,
    isProtectedPath,
    resolveUserRoleForSession,
} from "@/lib/auth/roles";

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    response = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;
    const isAuthRoute = pathname === "/login" || pathname === "/signup";

    if (!user && isProtectedPath(pathname)) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set(
            "next",
            `${pathname}${request.nextUrl.search}`
        );
        return NextResponse.redirect(loginUrl);
    }

    if (!user) {
        return response;
    }

    const requiresRoleCheck = isAuthRoute || isProtectedPath(pathname);
    if (!requiresRoleCheck) {
        return response;
    }

    let role;
    try {
        role = await resolveUserRoleForSession(supabase, user);
    } catch (e: any) {
        if (e?.message === "MissingDatabaseProfile") {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("error", "database_sync_failed");

            // Note: Since proxy executes on the edge/server natively we clear Next request session cookies here if passing through
            const newRes = NextResponse.redirect(loginUrl);
            newRes.cookies.delete("sb-" + (process.env.NEXT_PUBLIC_SUPABASE_URL || "").split("//")[1]?.split(".")[0] + "-auth-token");
            return newRes;
        }
        throw e;
    }

    if (isAuthRoute) {
        return NextResponse.redirect(new URL(getDefaultRedirectPath(role), request.url));
    }

    if (!canAccessPath(pathname, role)) {
        return NextResponse.redirect(new URL(getDefaultRedirectPath(role), request.url));
    }

    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
