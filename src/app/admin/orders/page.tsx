import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { OrderStatusSelect } from "@/components/admin/order-status-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { OrderDetailsDialog } from "@/components/admin/order-details-dialog";

export default async function OrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            items: true,
            user: {
                select: {
                    name: true,
                    email: true,
                    phone: true,
                }
            }
        },
    });

    return (
        <div className="space-y-6 bg-black min-h-screen p-8 text-white">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-white">Orders</h1>
                <div className="text-sm text-white/60">
                    Total Orders: <span className="font-bold text-white">{orders.length}</span>
                </div>
            </div>

            <Card className="border-white/10 bg-white/5 text-white">
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="border-white/10 hover:bg-transparent">
                                    <TableHead className="text-white">Order ID</TableHead>
                                    <TableHead className="text-white">Date</TableHead>
                                    <TableHead className="text-white">Customer</TableHead>
                                    <TableHead className="text-white">Items</TableHead>
                                    <TableHead className="text-white">Total</TableHead>
                                    <TableHead className="text-white">Payment Proof</TableHead>
                                    <TableHead className="text-white">Status</TableHead>
                                    <TableHead className="text-right text-white">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id} className="border-white/10 hover:bg-white/5">
                                        <TableCell className="font-mono text-xs">
                                            {order.orderNumber}
                                        </TableCell>
                                        <TableCell className="text-white/60">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-white">{order.shippingName}</span>
                                                <div className="flex items-center gap-2 text-xs text-white/50">
                                                    <Phone className="h-3 w-3" />
                                                    {order.shippingPhone}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate text-white/70">
                                            {order.items.map(i => i.productName).join(", ")}
                                        </TableCell>
                                        <TableCell className="font-bold text-white">
                                            {formatPrice(Number(order.grandTotal))}
                                        </TableCell>
                                        <TableCell>
                                            {order.paymentMethod === "UPI" ? (
                                                <div className="flex flex-col gap-1">
                                                    <Badge variant="outline" className="w-fit border-indigo-500/50 bg-indigo-500/10 text-indigo-400">
                                                        UPI
                                                    </Badge>
                                                    <span className="font-mono text-xs text-white/50">
                                                        Ref: {order.transactionId || "N/A"}
                                                    </span>
                                                </div>
                                            ) : (
                                                <Badge variant="secondary" className="bg-white/10 text-white">
                                                    Cash on Delivery
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* View Details Dialog */}
                                                <OrderDetailsDialog order={order} />

                                                {/* WhatsApp Button */}
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-green-500 hover:bg-green-500/10 hover:text-green-400"
                                                    asChild
                                                >
                                                    <a
                                                        href={`https://wa.me/91${order.shippingPhone}?text=Hi ${order.shippingName}, regarding your order #${order.orderNumber} from Z Axis Studio...`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title="Chat on WhatsApp"
                                                    >
                                                        <MessageCircle className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
