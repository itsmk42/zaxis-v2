"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrderStatus } from "@prisma/client";
import { updateOrderStatus } from "@/actions/admin";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

interface OrderStatusSelectProps {
    orderId: string;
    initialStatus: OrderStatus;
}

const statuses: OrderStatus[] = [
    "PENDING",
    "PENDING_COD",
    "PENDING_VERIFICATION",
    "PAYMENT_CONFIRMED",
    "PROCESSING",
    "QUALITY_CHECK",
    "READY_TO_SHIP",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "REFUNDED"
];

export function OrderStatusSelect({ orderId, initialStatus }: OrderStatusSelectProps) {
    const [isPending, startTransition] = useTransition();

    function onValueChange(value: string) {
        const newStatus = value as OrderStatus;
        startTransition(async () => {
            const result = await updateOrderStatus(orderId, newStatus);
            if (result.success) {
                toast.success(`Order status updated to ${newStatus}`);
            } else {
                toast.error("Failed to update status");
            }
        });
    }

    return (
        <div className="flex items-center gap-2">
            <Select defaultValue={initialStatus} onValueChange={onValueChange} disabled={isPending}>
                <SelectTrigger className="w-[180px] h-8 bg-white/5 border-white/10 text-white text-xs">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                            {status.replace(/_/g, " ")}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {isPending && <Loader2 className="h-3 w-3 animate-spin text-white/50" />}
        </div>
    );
}
