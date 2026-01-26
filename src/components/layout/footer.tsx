import Link from "next/link";
import { Mail, MapPin, Printer } from "lucide-react";

// ============================================
// FOOTER LINKS DATA
// ============================================

const shopLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Custom Orders", href: "/custom" },
  { label: "Bulk Services", href: "/bulk-services" },
  { label: "Track Order", href: "/track-order" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refunds" },
];

// ============================================
// SITE FOOTER
// ============================================

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Branding */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <Printer className="h-5 w-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white">Z Axis Studio</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              Precision 3D Printing & Design in Mangaluru. Bringing your ideas to
              life, layer by layer.
            </p>
          </div>

          {/* Column 2: Shop Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@zaxisstudio.in"
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  hello@zaxisstudio.in
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>
                  Mangaluru, Karnataka
                  <br />
                  India - 575001
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/40">
              © {currentYear} Z Axis Studio. All rights reserved.
            </p>
            <p className="text-sm text-white/40">
              Designed with ♥ in Mangaluru
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

