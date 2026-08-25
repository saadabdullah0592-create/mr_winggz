import { Phone, MapPin, Flame, Truck, Award, Users } from 'lucide-react';

const ABOUT_IMAGE =
  'https://images.pexels.com/photos/6402399/pexels-photo-6402399.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200';

const FEATURES = [
  {
    icon: Flame,
    title: 'Freshly Fried',
    text: 'Every piece of chicken is cooked to order for maximum crunch and flavor.',
  },
  {
    icon: Truck,
    title: 'Hot Delivery',
    text: 'Fast home delivery across Faisalabad, Sargodha and Islamabad.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    text: 'Only the finest ingredients, never frozen, always fresh.',
  },
  {
    icon: Users,
    title: 'Family Feast',
    text: 'Generous portions designed to share with the whole family.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-zinc-950 py-20 md:py-28">
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-red-900/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <img
                src={ABOUT_IMAGE}
                alt="Mr Winggz crispy fried chicken platter"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Red glow behind */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl bg-gradient-to-tr from-red-900/40 to-transparent" />
            {/* Floating stat */}
            <div className="absolute -left-4 bottom-8 rounded-2xl border border-white/10 bg-black/90 px-6 py-4 backdrop-blur-md shadow-2xl">
              <div className="font-display text-3xl font-bold text-red-500">100%</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">
                Fresh Daily
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="font-body text-sm font-medium uppercase tracking-widest text-red-500">
              About Mr Winggz
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              CRAFTED WITH <span className="text-red-600">PASSION</span>,
              <br />
              SERVED WITH FIRE
            </h2>
            <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-red-600 to-transparent" />

            <p className="mt-6 font-body text-base leading-relaxed text-gray-300">
              Mr Winggz brings you premium fried chicken, legendary burgers, and
              fiery wings — crafted fresh and delivered hot to your door. From
              quick solo meals to full family festivals, every order is made with
              the same commitment to quality and flavor.
            </p>

            {/* Feature grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:border-red-600/30"
                >
                  <f.icon className="h-6 w-6 text-red-500" />
                  <h3 className="mt-3 font-display text-base font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Branches */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-r from-red-950/20 to-transparent p-6 md:p-8">
          <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-white">
            Our Branches
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {['Faisalabad', 'Sargodha', 'Islamabad / Other Locations'].map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
              >
                <MapPin className="h-4 w-4 text-red-500" />
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
