import { ChevronRight, UtensilsCrossed } from 'lucide-react';

const HERO_IMAGE =
  'https://images.pexels.com/photos/9975765/pexels-photo-9975765.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-black"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Mr Winggz signature burger and fries"
          className="h-full w-full object-cover object-center opacity-50"
        />
        {/* Red glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        {/* Red radial glow */}
        <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-red-700/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-red-900/30 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-20 md:px-8">
        <div className="max-w-2xl">
          {/* Tagline */}
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-950/20 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <span className="font-body text-xs font-medium uppercase tracking-widest text-red-400">
              Premium Fried Chicken · Burgers · Wings
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up font-display text-5xl font-bold leading-[1.05] tracking-tight text-white text-glow-red md:text-7xl lg:text-8xl"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            TASTE THE
            <br />
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              FIRE
            </span>{' '}
            OF FLAVOR
          </h1>

          {/* Description */}
          <p
            className="animate-fade-up mt-6 max-w-xl font-body text-base leading-relaxed text-gray-300 md:text-lg"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            Hand-crafted crispy chicken, legendary wings, and bold burgers —
            made fresh, delivered hot. Experience the Mr Winggz difference.
          </p>

          {/* Buttons */}
          <div
            className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            <a
              href="#menu"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 font-display text-base font-semibold uppercase tracking-wider text-white shadow-xl shadow-red-900/40 transition-all hover:bg-red-500 hover:shadow-red-700/50"
            >
              Order Now
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-display text-base font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-red-500/50 hover:bg-red-950/20"
            >
              <UtensilsCrossed className="h-5 w-5" />
              View Menu
            </a>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-up mt-14 flex flex-wrap gap-x-12 gap-y-6"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            {[
              { value: '3', label: 'Cities' },
              { value: '100%', label: 'Fresh Daily' },
              { value: '20+', label: 'Menu Items' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl font-bold text-red-500">
                  {stat.value}
                </div>
                <div className="mt-1 font-body text-xs uppercase tracking-widest text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-body text-xs uppercase tracking-widest text-gray-500">
          Scroll
        </span>
        <div className="h-12 w-px bg-gradient-to-b from-red-600 to-transparent" />
      </div>
    </section>
  );
}
