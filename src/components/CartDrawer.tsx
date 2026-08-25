import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatRuppes } from '@/utils/format';

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const {
    items,
    isCartOpen,
    closeCart,
    increment,
    decrement,
    removeItem,
    subtotal,
    deliveryFee,
    total,
    itemCount,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className="animate-fade-in absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="animate-slide-in-right absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-zinc-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-red-500" />
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-white">
              Your Cart
            </h2>
            {itemCount > 0 && (
              <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
                <ShoppingBag className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-white">
                  Your cart is empty
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Add some delicious items to get started
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 rounded-full bg-red-600 px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-red-500"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-xl border border-white/5 bg-white/5 p-3"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                  />

                  {/* Details */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-display text-sm font-semibold text-white">
                          {item.name}
                        </h4>
                        <p className="mt-0.5 text-xs text-gray-400">
                          {item.optionLabel}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-red-950/30 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Controls + price */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrement(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-gray-300 transition-colors hover:border-red-500 hover:text-red-500"
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={3} />
                        </button>
                        <span className="w-6 text-center font-display text-sm font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increment(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-gray-300 transition-colors hover:border-red-500 hover:text-red-500"
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                        </button>
                      </div>
                      <span className="font-display text-sm font-bold text-red-500">
                        {formatRuppes(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / summary */}
        {items.length > 0 && (
          <div className="border-t border-white/10 bg-black/50 px-5 py-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span className="font-medium text-white">{formatRuppes(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Delivery Fee</span>
                <span className="font-medium text-white">{formatRuppes(deliveryFee)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-base">
                <span className="font-display font-semibold text-white">Grand Total</span>
                <span className="font-display font-bold text-red-500">
                  {formatRuppes(total)}
                </span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-red-600 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-red-900/40 transition-all hover:bg-red-500"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={closeCart}
              className="mt-2 w-full rounded-full py-2.5 text-center font-body text-sm text-gray-400 transition-colors hover:text-white"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
