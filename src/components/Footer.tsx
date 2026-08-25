import { Flame, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-900">
                <Flame className="h-5 w-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-display text-xl font-bold tracking-wide text-white">
                MR <span className="text-red-600">WINGGZ</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Premium fried chicken, burgers and wings. Crafted fresh, delivered
              hot.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Menu', href: '#menu' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-red-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="h-4 w-4 text-red-500" />
                0311-1500555
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="h-4 w-4 text-red-500" />
                041-111-500-555
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="h-4 w-4 text-red-500" />
                Faisalabad · Sargodha · Islamabad
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Mr Winggz. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-gray-500">
              Crafted with <span className="text-red-500">fire</span> for flavor lovers.
            </p>
            <a
              href="#admin"
              className="text-xs text-gray-600 transition-colors hover:text-red-500"
            >
              Staff Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
