export default function ProductLoading() {
    return (
        <main className="min-h-screen bg-black pt-28 pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Left Column - Image Skeleton */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="aspect-square w-full animate-pulse rounded-2xl bg-gray-200/10" />

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-4 gap-2">
                            <div className="aspect-square animate-pulse rounded-lg bg-gray-200/10" />
                            <div className="aspect-square animate-pulse rounded-lg bg-gray-200/10" />
                            <div className="aspect-square animate-pulse rounded-lg bg-gray-200/10" />
                            <div className="aspect-square animate-pulse rounded-lg bg-gray-200/10" />
                        </div>
                    </div>

                    {/* Right Column - Product Details Skeleton */}
                    <div className="space-y-6">
                        {/* Category Badge */}
                        <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200/10" />

                        {/* Title */}
                        <div className="space-y-3">
                            <div className="h-10 w-3/4 animate-pulse rounded-lg bg-gray-200/10" />
                            <div className="h-10 w-1/2 animate-pulse rounded-lg bg-gray-200/10" />
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-32 animate-pulse rounded bg-gray-200/10" />
                            <div className="h-5 w-20 animate-pulse rounded bg-gray-200/10" />
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-32 animate-pulse rounded-lg bg-gray-200/10" />
                            <div className="h-8 w-24 animate-pulse rounded-lg bg-gray-200/10" />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <div className="h-4 w-full animate-pulse rounded bg-gray-200/10" />
                            <div className="h-4 w-full animate-pulse rounded bg-gray-200/10" />
                            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200/10" />
                            <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200/10" />
                        </div>

                        {/* Specifications */}
                        <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-6">
                            <div className="h-6 w-32 animate-pulse rounded bg-gray-200/10" />
                            <div className="space-y-2">
                                <div className="h-4 w-full animate-pulse rounded bg-gray-200/10" />
                                <div className="h-4 w-full animate-pulse rounded bg-gray-200/10" />
                                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200/10" />
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-32 animate-pulse rounded-lg bg-gray-200/10" />
                            <div className="h-12 flex-1 animate-pulse rounded-lg bg-gray-200/10" />
                        </div>

                        {/* Add to Cart Button */}
                        <div className="h-14 w-full animate-pulse rounded-lg bg-gray-200/10" />

                        {/* Additional Info */}
                        <div className="space-y-2">
                            <div className="h-4 w-48 animate-pulse rounded bg-gray-200/10" />
                            <div className="h-4 w-40 animate-pulse rounded bg-gray-200/10" />
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-20">
                    <div className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-gray-200/10" />
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-4">
                                <div className="aspect-[4/5] animate-pulse rounded-xl bg-gray-200/10" />
                                <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200/10" />
                                <div className="h-5 w-1/2 animate-pulse rounded bg-gray-200/10" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
