import { HeartHandshake, Leaf, Wrench, Shield, Clock, Award } from "lucide-react";

// ============================================
// FEATURES DATA
// ============================================

const features = [
  {
    title: "Local Mangaluru Support",
    description:
      "We're real people, not bots. Get personalized support via WhatsApp from our team right here in Mangaluru.",
    icon: HeartHandshake,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Eco-Friendly Materials",
    description:
      "We use biodegradable PLA and sustainable practices. Beautiful prints that don't cost the earth.",
    icon: Leaf,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Custom Engineering",
    description:
      "We don't just print—we design. Our team can help engineer custom solutions for your unique needs.",
    icon: Wrench,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    title: "Quality Guaranteed",
    description:
      "Every piece is inspected before shipping. If you're not satisfied, we'll make it right.",
    icon: Shield,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Fast Turnaround",
    description:
      "Most orders ship within 3-5 business days. Rush orders available for urgent projects.",
    icon: Clock,
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
  },
  {
    title: "Premium Equipment",
    description:
      "We use Bambu Lab printers—the industry standard for precision, speed, and reliability.",
    icon: Award,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
];

// ============================================
// WHY CHOOSE US SECTION
// ============================================

export function Features() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Why Choose Z Axis Studio?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            We're not just another 3D printing service. Here's what makes us
            different.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
            >
              {/* Icon */}
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor} ${feature.color} transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="mt-4 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

