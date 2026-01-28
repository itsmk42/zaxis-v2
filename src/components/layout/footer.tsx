import Link from "next/link";
import { Mail, MapPin, Printer, Instagram, Facebook, Twitter, Phone } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Custom Lamps", href: "/collections/lamps" },
    { label: "Lithophanes", href: "/collections/lithophanes" },
    { label: "3D Models", href: "/collections/models" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Track Order", href: "/track-order" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/z_axis._studio", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/zaxisstudio", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/zaxisstudio", label: "Twitter" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/5 bg-black pt-16 pb-8 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-12">
          {/* Brand Section */}
          <div className="text-center lg:text-left lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center justify-center lg:justify-start gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white transition-transform duration-500 group-hover:scale-110">
                <Printer className="h-6 w-6 text-black" />
              </div>
              <div>
                <span className="block text-xl font-bold tracking-tight text-white">Z Axis Studio</span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">Mangaluru, India</span>
              </div>
            </Link>
            <p className="max-w-xs mx-auto lg:mx-0 text-sm leading-relaxed text-white/50">
              Engineering art into reality. We create premium 3D printed masterpieces and personalized gifts that tell your unique story.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-white/60 hover:text-white"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-x-8 lg:col-span-8">
            <div className="text-center sm:text-left">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white mb-6">Shop</h3>
              <ul className="space-y-4">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white mb-6">Support</h3>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-full sm:col-span-1 text-center sm:text-left">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white mb-6">Contact</h3>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:hello@zaxisstudio.in" className="group flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors">
                    <Mail className="h-4 w-4 text-white/20 group-hover:text-white transition-colors" />
                    hello@zaxisstudio.in
                  </a>
                </li>
                <li>
                  <a href="tel:+919483654329" className="group flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors">
                    <Phone className="h-4 w-4 text-white/20 group-hover:text-white transition-colors" />
                    +91 94836 54329
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/40">
                  <MapPin className="h-4 w-4 mt-0.5 text-white/20" />
                  <span>Mangaluru, KA, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[11px] text-white/30 uppercase tracking-widest font-medium">
            © {currentYear} Z Axis Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="text-[11px] text-white/30 hover:text-white uppercase tracking-widest font-medium transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
