export default function ProductLoading() {
    return (
        <main className="min-h-screen bg-black pt-28 pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Mobile-first responsive grid */}
                <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
                    {/* Left Column - Image Skeleton */}
                    <div className="w-full space-y-4">
                        {/* Main Image - Responsive height */}
                        <div className="h-[300px] w-full animate-pulse rounded-2xl bg-gray-200/10 sm:h-[400px] lg:aspect-square lg:h-auto" />

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-4 gap-2">
                            <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200/10" />
                            <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200/10" />
                            <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200/10" />
                            <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200/10" />
                        </div>
                    </div>

                    {/* Right Column - Product Details Skeleton */}
                    <div className="w-full space-y-6">
                        {/* Category Badge */}
                        <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200/10" />

                        {/* Title - Mobile optimized */}
                        <div className="space-y-3">
                            <div className="h-8 w-full animate-pulse rounded-lg bg-gray-200/10 sm:h-10 sm:w-3/4" />
                            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-gray-200/10 sm:h-10 sm:w-1/2" />
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-32 animate-pulse rounded bg-gray-200/10" />
                            <div className="h-5 w-20 animate-pulse rounded bg-gray-200/10" />
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200/10 sm:h-12 sm:w-32" />
                            <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-200/10 sm:w-24" />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <div className="h-4 w-full animate-pulse rounded bg-gray-200/10" />
                            <div className="h-4 w-full animate-pulse rounded bg-gray-200/10" />
                            <div className="h-4 w-full animate-pulse rounded bg-gray-200/10 sm:w-5/6" />
                            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200/10 sm:w-4/6" />
                        </div>

                        {/* Specifications */}
                        <div className="w-full space-y-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6">
                            <div className="h-6 w-32 animate-pulse rounded bg-gray-200/10" />
                            <div className="space-y-2">
                                <div className="h-4 w-full animate-pulse rounded bg-gray-200/10" />
                                <div className="h-4 w-full animate-pulse rounded bg-gray-200/10" />
                                <div className="h-4 w-full animate-pulse rounded bg-gray-200/10 sm:w-3/4" />
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                            <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200/10 sm:w-32" />
                            <div className="h-12 w-full flex-1 animate-pulse rounded-lg bg-gray-200/10" />
                        </div>

                        {/* Add to Cart Button */}
                        <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200/10 sm:h-14" />

                        {/* Additional Info */}
                        <div className="space-y-2">
                            <div className="h-4 w-full animate-pulse rounded bg-gray-200/10 sm:w-48" />
                            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200/10 sm:w-40" />
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-12 sm:mt-20">
                    <div className="mb-6 h-7 w-full animate-pulse rounded-lg bg-gray-200/10 sm:mb-8 sm:h-8 sm:w-48" />
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-full space-y-3 sm:space-y-4">
                                <div className="aspect-[4/5] w-full animate-pulse rounded-xl bg-gray-200/10" />
                                <div className="h-5 w-full animate-pulse rounded bg-gray-200/10 sm:h-6 sm:w-3/4" />
                                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200/10 sm:h-5 sm:w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
