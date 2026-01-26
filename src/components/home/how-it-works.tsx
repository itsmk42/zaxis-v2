import { MousePointerClick, Printer, Truck } from "lucide-react";

// ============================================
// STEPS DATA
// ============================================

const steps = [
  {
    number: "01",
    title: "Select or Upload",
    description:
      "Browse our curated collection of lamps and figurines, or upload your own photo for a custom lithophane or 3D model.",
    icon: MousePointerClick,
  },
  {
    number: "02",
    title: "Precision Printing",
    description:
      "We use industry-leading Bambu Lab printers with premium materials for flawless quality and stunning detail in every piece.",
    icon: Printer,
  },
  {
    number: "03",
    title: "Fast Delivery",
    description:
      "Secure packaging protects your creation during transit. We ship across India with tracking and careful handling.",
    icon: Truck,
  },
];

// ============================================
// HOW IT WORKS SECTION
// ============================================

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            From Digital to Physical
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Our streamlined process turns your ideas into tangible creations in
            just three simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
            >
              {/* Step Number */}
              <div className="mb-6 flex items-center justify-between">
                <span className="text-5xl font-bold text-white/10">
                  {step.number}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-colors group-hover:bg-white group-hover:text-black">
                  <step.icon className="h-6 w-6" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {step.description}
              </p>

              {/* Connector Line (except last) */}
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-gradient-to-r from-white/20 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

