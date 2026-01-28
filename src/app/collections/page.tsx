import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Collections | Z Axis Studio",
    description: "Explore our premium 3D printed collections, from custom lithophanes to designer lamps.",
};

export default async function CollectionsPage() {
    // 1. Fetch all products with their categories and images
    const products = await prisma.product.findMany({
        where: { isActive: true },
        include: {
            category: true,
            images: {
                take: 1,
                orderBy: { position: "asc" },
            },
        },
    });

    // 2. Group them by category using JavaScript as requested
    const collectionsMap = new Map<string, {
        name: string;
        slug: string;
        image: string;
        count: number;
    }>();

    products.forEach((product) => {
        if (product.category) {
            const catId = product.category.id;
            if (!collectionsMap.has(catId)) {
                collectionsMap.set(catId, {
                    name: product.category.name,
                    slug: product.category.slug,
                    image: product.images[0]?.url || product.category.image || "/images/placeholder-category.jpg",
                    count: 0,
                });
            }
            const current = collectionsMap.get(catId)!;
            current.count++;
        }
    });

    const collections = Array.from(collectionsMap.values());

    return (
        <main className="min-h-screen bg-black pt-28 pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                        Collections
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-white/60">
                        Handcrafted series organized by category. From memory-capturing lithophanes to artful home decor.
                    </p>
                </div>

                {/* Collections Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {collections.map((collection) => (
                        <Link
                            key={collection.slug}
                            href={`/collections/${collection.slug}`}
                            className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
                        >
                            <Image
                                src={collection.image}
                                alt={collection.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Premium Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                            {/* Hover Border Effect */}
                            <div className="absolute inset-0 border border-white/0 transition-colors duration-300 group-hover:border-white/20" />

                            <div className="absolute bottom-8 left-8 right-8">
                                <h2 className="text-3xl font-bold text-white">
                                    {collection.name}
                                </h2>
                                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-white/60 transition-colors group-hover:text-white/90">
                                    Explore {collection.count} Products
                                    <span className="inline-block transform transition-transform group-hover:translate-x-1">→</span>
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {collections.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-xl text-white/40">No collections found yet.</p>
                        <Link href="/shop" className="mt-4 text-white hover:underline">
                            Browse all products
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
