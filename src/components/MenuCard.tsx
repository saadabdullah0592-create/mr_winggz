import { useState } from 'react';
import { Plus, Check, Flame, Clock } from 'lucide-react';
import type { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatRuppes } from '@/utils/format';

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const { addToCart } = useCart();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const isComingSoon = item.priceOptions.length === 0;
  const selectedOption = item.priceOptions[selectedIdx];

  const handleAdd = () => {
    if (!selectedOption) return;
    addToCart(item, selectedOption);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="card-hover group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Popular badge */}
        {item.popular && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/50">
            <Flame className="h-3 w-3" />
            Popular
          </span>
        )}

        {/* Coming soon badge */}
        {isComingSoon && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            <Clock className="h-3 w-3" />
            Soon
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold tracking-wide text-white">
          {item.name}
        </h3>
        {item.description && (
          <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-gray-400">
            {item.description}
          </p>
        )}

        {/* Coming soon state */}
        {isComingSoon ? (
          <div className="mt-4 flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 bg-white/5 py-6">
            <Clock className="h-6 w-6 text-red-500" />
            <p className="font-display text-sm uppercase tracking-wider text-gray-400">
              Menu Coming Soon
            </p>
          </div>
        ) : (
          <>
            {/* Price options */}
            {item.priceOptions.length > 1 ? (
              <div className="mt-4 space-y-2">
                {item.priceOptions.map((opt, idx) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedIdx(idx)}
                    className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left transition-all ${
                      selectedIdx === idx
                        ? 'border-red-600 bg-red-950/30'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                          selectedIdx === idx
                            ? 'border-red-500 bg-red-600'
                            : 'border-white/30'
                        }`}
                      >
                        {selectedIdx === idx && (
                          <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                        )}
                      </span>
                      <span className="font-body text-sm text-gray-200">
                        {opt.label}
                      </span>
                    </div>
                    <span className="font-display text-sm font-semibold text-white">
                      {formatRuppes(opt.price)}
                    </span>
                  </button>
                ))}
                {selectedOption?.description && (
                  <p className="px-1 text-xs italic text-gray-500">
                    {selectedOption.description}
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
                <span className="font-body text-sm text-gray-200">
                  {selectedOption?.label}
                </span>
                <span className="font-display text-lg font-bold text-red-500">
                  {selectedOption && formatRuppes(selectedOption.price)}
                </span>
              </div>
            )}

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              disabled={justAdded}
              className={`mt-4 flex items-center justify-center gap-2 rounded-full py-3 font-display text-sm font-semibold uppercase tracking-wider text-white transition-all ${
                justAdded
                  ? 'bg-green-600'
                  : 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/30 hover:shadow-red-700/40'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="h-4 w-4" strokeWidth={3} />
                  Added
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" strokeWidth={3} />
                  Add to Cart
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
