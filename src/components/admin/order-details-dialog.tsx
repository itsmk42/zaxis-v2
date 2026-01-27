import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { OrderStatusSelect } from "./order-status-select";

export function OrderDetailsDialog({ order }: { order: any }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/10" title="View Details">
                    <Eye className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-zinc-950 border-white/10 text-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">Order #{order.orderNumber}</DialogTitle>
                    <DialogDescription className="text-white/60">
                        Placed on {new Date(order.createdAt).toLocaleString()}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Status & Payment */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between rounded-lg bg-white/5 p-4 border border-white/10">
                        <div className="space-y-1">
                            <span className="text-xs text-white/40 uppercase tracking-widest">Status</span>
                            <div className="flex items-center gap-2">
                                <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-white/40 uppercase tracking-widest">Payment</span>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-white/10 text-white">
                                    {order.paymentMethod || "COD"}
                                </Badge>
                                {order.transactionId && (
                                    <span className="font-mono text-xs text-white/60">Ref: {order.transactionId}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/80 font-semibold">
                            <MapPin className="h-4 w-4" />
                            Shipping Address
                        </div>
                        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/70 space-y-1">
                            <p className="font-bold text-white text-base">{order.shippingName}</p>
                            <p>{order.shippingLine1}</p>
                            {order.shippingLine2 && <p>{order.shippingLine2}</p>}
                            <p>{order.shippingCity}, {order.shippingState} - {order.shippingPincode}</p>
                            {order.shippingLandmark && <p className="text-white/50 text-xs mt-1">Landmark: {order.shippingLandmark}</p>}
                            <p className="mt-2 text-white pt-2 border-t border-white/10">Phone: {order.shippingPhone}</p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/80 font-semibold">
                            <Truck className="h-4 w-4" />
                            Items ({order.items.length})
                        </div>
                        <div className="rounded-lg border border-white/10 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-white/5 text-white/60">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium">Item</th>
                                        <th className="px-4 py-2 text-center font-medium">Qty</th>
                                        <th className="px-4 py-2 text-right font-medium">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {order.items.map((item: any) => (
                                        <tr key={item.id} className="text-white/80">
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-white">{item.productName}</p>
                                                <p className="text-xs text-white/50 capitalize">{item.productType.toLowerCase()}</p>
                                            </td>
                                            <td className="px-4 py-3 text-center">{item.quantity}</td>
                                            <td className="px-4 py-3 text-right">{formatPrice(Number(item.lineTotal))}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="flex flex-col gap-2 border-t border-white/10 pt-4 text-sm">
                        <div className="flex justify-between text-white/60">
                            <span>Subtotal</span>
                            <span>{formatPrice(Number(order.subtotal))}</span>
                        </div>
                        <div className="flex justify-between text-white/60">
                            <span>Shipping</span>
                            <span>{formatPrice(Number(order.shippingCost))}</span>
                        </div>
                        <div className="flex justify-between text-white/60">
                            <span>GST</span>
                            <span>{formatPrice(Number(order.totalGst))}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-white pt-2">
                            <span>Total</span>
                            <span>{formatPrice(Number(order.grandTotal))}</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
