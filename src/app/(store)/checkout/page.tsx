import { CheckoutForm } from "@/components/checkout/checkout-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in?redirect_url=/checkout");
    }

    return (
        <div className="min-h-screen bg-black pt-24 pb-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-3xl font-bold tracking-tight text-white">Checkout</h1>
                <CheckoutForm />
            </div>
        </div>
    );
}
