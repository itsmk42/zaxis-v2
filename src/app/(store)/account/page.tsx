import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Package, MapPin, User, Settings, ArrowRight, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function AccountPage() {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        redirect("/sign-in");
    }

    const orders = await prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { items: { include: { product: true } } }
    });

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
                    {/* Sidebar Navigation */}
                    <div className="space-y-1">
                        <button className="flex w-full items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white transition-colors">
                            <Package className="h-5 w-5" />
                            Order History
                        </button>
                        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white">
                            <MapPin className="h-5 w-5" />
                            Saved Addresses
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-3 space-y-6">
                        {orders.length === 0 ? (
                            /* Empty State */
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
                        ) : (
                            /* Order List */
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-white">Your Orders</h2>
                                {orders.map((order) => (
                                    <div key={order.id} className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/20">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-sm text-white/60">#{order.orderNumber}</span>
                                                    <Badge variant="outline" className="border-white/20 bg-white/5 text-white">
                                                        {order.status.replace(/_/g, " ")}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-white/40">
                                                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-white">
                                                    {formatPrice(Number(order.grandTotal))}
                                                </p>
                                                <p className="text-xs text-white/40">
                                                    {order.items.length} {order.items.length === 1 ? "Item" : "Items"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                                            <div className="flex -space-x-2 overflow-hidden">
                                                {order.items.slice(0, 4).map((item) => (
                                                    <div key={item.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-zinc-800 flex items-center justify-center text-[10px] text-white">
                                                        {/* Placeholder for image if missing */}
                                                        {item.productName.charAt(0)}
                                                    </div>
                                                ))}
                                                {order.items.length > 4 && (
                                                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-zinc-800 flex items-center justify-center text-[10px] text-white">
                                                        +{order.items.length - 4}
                                                    </div>
                                                )}
                                            </div>

                                            <Button variant="ghost" asChild className="text-white hover:text-white/80 gap-2">
                                                <Link href={`/account/orders/${order.id}`}>
                                                    View Details <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
