import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const slug = decodeURIComponent(params.slug);

    const category = await prisma.category.findFirst({
        where: {
            slug: {
                equals: slug,
                mode: 'insensitive'
            }
        }
    });

    return {
        title: `${category?.name || "Collection"} | Z Axis Studio`,
        description: category?.description || "Browse our premium 3D printed collection.",
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const slug = decodeURIComponent(params.slug);

    // 1. Fetch category (case-insensitive)
    const category = await prisma.category.findFirst({
        where: {
            slug: {
                equals: slug,
                mode: 'insensitive'
            }
        }
    });

    if (!category) {
        notFound();
    }

    // 2. Fetch products for this category
    const products = await prisma.product.findMany({
        where: {
            categoryId: category.id,
            isActive: true,
        },
        include: {
            category: true,
            images: {
                orderBy: { position: "asc" },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    // Transform Decimal to number for the ProductCard component
    const transformedProducts = products.map((product) => ({
        ...product,
        basePrice: Number(product.basePrice),
        compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    }));

    return (
        <main className="min-h-screen bg-black pt-28 pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb & Header */}
                <div className="mb-12">
                    <Link
                        href="/collections"
                        className="mb-4 inline-flex items-center text-sm font-medium text-white/40 transition-colors hover:text-white"
                    >
                        <span className="mr-2">←</span> Back to All Collections
                    </Link>
                    <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                        {category.name}
                    </h1>
                    {category.description && (
                        <p className="mt-4 max-w-2xl text-lg text-white/60">
                            {category.description}
                        </p>
                    )}
                </div>

                {/* Products Grid */}
                {transformedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
                        {transformedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-24 text-center">
                        <h2 className="text-2xl font-semibold text-white">No products found</h2>
                        <p className="mt-2 text-white/60">
                            We haven't added any products to the {category.name} collection yet.
                        </p>
                        <Button asChild className="mt-8 bg-white text-black hover:bg-white/90">
                            <Link href="/collections">
                                View All Collections
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </main>
    );
}
