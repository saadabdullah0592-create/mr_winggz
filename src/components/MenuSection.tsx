import { useState } from 'react';
import { menuItems, CATEGORIES } from '@/data/menu';
import MenuCard from '@/components/MenuCard';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);

  const filteredItems = menuItems.filter((i) => i.category === activeCategory);

  return (
    <section id="menu" className="relative bg-black py-20 md:py-28">
      {/* Red glow accents */}
      <div className="absolute left-0 top-1/4 h-[400px] w-[400px] rounded-full bg-red-900/10 blur-[120px]" />
      <div className="absolute right-0 bottom-1/4 h-[300px] w-[300px] rounded-full bg-red-700/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span className="font-body text-sm font-medium uppercase tracking-widest text-red-500">
            Our Menu
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            CHOOSE YOUR <span className="text-red-600">FLAVOR</span>
          </h2>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        </div>

        {/* Category tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wider transition-all ${
                activeCategory === cat.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                  : 'border border-white/10 bg-white/5 text-gray-400 hover:border-red-600/50 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
