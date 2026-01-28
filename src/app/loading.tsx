export default function GlobalLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black">
            <div className="text-center">
                {/* Pulsing Z Logo */}
                <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                    <span className="animate-pulse text-5xl font-bold text-white">Z</span>
                </div>

                {/* Loading Text */}
                <p className="text-sm text-white/60">Loading...</p>

                {/* Animated Dots */}
                <div className="mt-4 flex justify-center gap-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-white/40" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-white/40" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-white/40" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    );
}
