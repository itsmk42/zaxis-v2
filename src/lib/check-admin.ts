import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Server-side utility to verify if the logged-in user is an admin.
 * Checks against the CLERK_ADMIN_ID environment variable.
 */
export async function checkAdmin() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const adminId = process.env.CLERK_ADMIN_ID;

    if (!adminId) {
        console.warn("CLERK_ADMIN_ID is not set in environment variables.");
        redirect("/");
    }

    if (userId !== adminId) {
        redirect("/");
    }

    return userId;
}
