import { Flame } from 'lucide-react';

const PROMOS = [
  'Free delivery on orders over Rs 2000',
  'Try our Mighty Winger Combo — Rs 900',
  'Family Festival — 4 Winger Burgers + 20 Hot Wings + 1L Drink',
  'Hot Wings — 5 Pcs for Rs 320 · 10 Pcs for Rs 550',
  'Friends & Family Festival — now available',
];

export default function PromoStrip() {
  return (
    <div className="border-y border-red-900/30 bg-gradient-to-r from-red-950 via-red-900/30 to-red-950 py-3">
      <div className="flex overflow-hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] gap-8 whitespace-nowrap">
          {[...PROMOS, ...PROMOS].map((promo, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 font-display text-sm font-medium uppercase tracking-wider text-gray-200"
            >
              <Flame className="h-3.5 w-3.5 text-red-400" />
              {promo}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
