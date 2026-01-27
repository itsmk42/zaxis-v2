import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
            <div className="rounded-full bg-green-500/10 p-6 mb-6">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                Order Placed Successfully!
            </h1>

            <p className="max-w-md text-lg text-white/60 mb-8">
                Thank you for your purchase. We have received your order and will begin processing it shortly. You will receive an email confirmation soon.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                    <Link href="/account">View My Order</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                    <Link href="/shop">Continue Shopping</Link>
                </Button>
            </div>
        </div>
    );
}
