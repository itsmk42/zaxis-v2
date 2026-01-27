"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StoreSettings } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { updateStoreSettings } from "@/actions/admin";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

const settingsSchema = z.object({
    upiId: z.string().min(3, "UPI ID is required"),
    deliveryFee: z.coerce.number().min(0),
    isStoreOpen: z.boolean(),
    bannerMessage: z.string().optional().nullable(),
});

interface SettingsFormProps {
    settings: StoreSettings;
}

export function SettingsForm({ settings }: SettingsFormProps) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            upiId: settings.upiId,
            deliveryFee: settings.deliveryFee,
            isStoreOpen: settings.isStoreOpen,
            bannerMessage: settings.bannerMessage || "",
        },
    });

    function onSubmit(data: z.infer<typeof settingsSchema>) {
        startTransition(async () => {
            const result = await updateStoreSettings(data);
            if (result.success) {
                toast.success("Settings updated successfully");
            } else {
                toast.error("Failed to update settings");
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 rounded-xl border border-white/10 bg-white/5 p-6">

                {/* UPI ID */}
                <FormField
                    control={form.control}
                    name="upiId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">UPI VPA</FormLabel>
                            <FormControl>
                                <Input placeholder="yourname@oksbi" {...field} className="bg-black/50 border-white/10 text-white" />
                            </FormControl>
                            <FormDescription className="text-white/40">
                                The UPI ID shown to customers at checkout for payments.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Delivery Fee */}
                <FormField
                    control={form.control}
                    name="deliveryFee"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Delivery Fee (₹)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} className="bg-black/50 border-white/10 text-white" />
                            </FormControl>
                            <FormDescription className="text-white/40">
                                Standard delivery fee applied to orders below ₹1000.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Banner Message */}
                <FormField
                    control={form.control}
                    name="bannerMessage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Announcement Banner</FormLabel>
                            <FormControl>
                                {/* Dealing with potentially null value from DB vs string in input */}
                                <Input
                                    placeholder="e.g. Diwali Sale is Live!"
                                    {...field}
                                    value={field.value || ""}
                                    className="bg-black/50 border-white/10 text-white"
                                />
                            </FormControl>
                            <FormDescription className="text-white/40">
                                Optional text shown at the top of the site.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Store Open/Close Toggle */}
                <FormField
                    control={form.control}
                    name="isStoreOpen"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base text-white">Store Open</FormLabel>
                                <FormDescription className="text-white/40">
                                    Turn off to temporarily disable checkout.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending} className="bg-white text-black hover:bg-white/90">
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </form>
        </Form>
    );
}
