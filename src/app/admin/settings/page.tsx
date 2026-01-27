import { prisma } from "@/lib/db";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
    // Ensure default settings exist (user requested a seed or check)
    const settings = await prisma.storeSettings.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            upiId: "yourname@oksbi",
            deliveryFee: 100,
            isStoreOpen: true,
            bannerMessage: null
        }
    });

    return (
        <div className="space-y-6 bg-black min-h-screen p-8 text-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Store Settings</h1>
                <p className="text-white/60">Configure your store availability, payments, and fees.</p>
            </div>

            <div className="max-w-2xl">
                <SettingsForm settings={settings} />
            </div>
        </div>
    );
}
