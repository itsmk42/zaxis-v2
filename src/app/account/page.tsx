import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Package, MapPin, User, Settings } from "lucide-react";

export default async function AccountPage() {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        redirect("/sign-in");
    }

    return (
        <div className="min-h-screen bg-black pt-24 pb-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                        Welcome back, {user.firstName || "Customer"}
                    </h1>
                    <p className="text-white/60">
                        Manage your orders, addresses, and account settings.
                    </p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Navigation (Tabs) */}
                    <div className="space-y-1">
                        <button className="flex w-full items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white transition-colors">
                            <Package className="h-5 w-5" />
                            Order History
                        </button>
                        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white">
                            <MapPin className="h-5 w-5" />
                            Saved Addresses
                        </button>
                        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white">
                            <User className="h-5 w-5" />
                            Profile Details
                        </button>
                        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white">
                            <Settings className="h-5 w-5" />
                            Settings
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-3 space-y-6">
                        {/* Order History Empty State */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                                <Package className="h-8 w-8 text-white/40" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">No orders found yet</h3>
                            <p className="text-sm text-white/40 mb-6">
                                You haven't placed any orders yet. Start shopping to bring your ideas to life!
                            </p>
                            <a
                                href="/shop"
                                className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-8 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95"
                            >
                                Start Shopping
                            </a>
                        </div>

                        {/* Account Info Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Email Address</h4>
                                <p className="text-white">{user.emailAddresses[0].emailAddress}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Account Type</h4>
                                <p className="text-white">Standard Customer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
