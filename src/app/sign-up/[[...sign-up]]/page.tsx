import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black py-20">
            <SignUp
                appearance={{
                    elements: {
                        formButtonPrimary: "bg-white text-black hover:bg-white/90",
                        card: "bg-[#111] border border-white/10",
                        headerTitle: "text-white",
                        headerSubtitle: "text-white/60",
                        socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
                        dividerLine: "bg-white/10",
                        dividerText: "text-white/40",
                        formFieldLabel: "text-white/60",
                        formFieldInput: "bg-white/5 border border-white/10 text-white",
                        footerActionText: "text-white/40",
                        footerActionLink: "text-white hover:text-white/80"
                    }
                }}
            />
        </div>
    );
}
