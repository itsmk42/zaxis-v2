import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isAccountRoute = createRouteMatcher(["/account(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();

    // 1. Handle Admin Routes
    if (isAdminRoute(req)) {
        if (!userId) {
            return (await auth()).redirectToSignIn();
        }

        // Redirect non-admins to home
        if (userId !== process.env.CLERK_ADMIN_ID) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // 2. Handle Account Routes
    if (isAccountRoute(req)) {
        if (!userId) {
            return (await auth()).redirectToSignIn();
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
