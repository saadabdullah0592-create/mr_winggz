import { useEffect, useState } from 'react';
import { ShoppingCart, Menu as MenuIcon, X, Flame } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-red-950/20'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-900 shadow-lg shadow-red-900/50">
            <Flame className="h-5 w-5 text-white" strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-bold tracking-wide text-white md:text-2xl">
            MR <span className="text-red-600">WINGGZ</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium uppercase tracking-wider text-gray-300 transition-colors duration-300 hover:text-red-500"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white ring-1 ring-white/10 transition-all hover:bg-red-600 hover:ring-red-500"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white shadow-lg shadow-red-900/50">
                {itemCount}
              </span>
            )}
          </button>

          <a
            href="#menu"
            className="hidden rounded-full bg-red-600 px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-red-900/40 transition-all hover:bg-red-500 hover:shadow-red-700/50 md:inline-block"
          >
            Order Now
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white ring-1 ring-white/10 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-fade-in border-t border-white/5 bg-black/98 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 font-body text-sm font-medium uppercase tracking-wider text-gray-300 transition-colors hover:bg-red-950/30 hover:text-red-500"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#menu"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-red-600 px-6 py-3 text-center font-display text-sm font-semibold uppercase tracking-wider text-white"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
