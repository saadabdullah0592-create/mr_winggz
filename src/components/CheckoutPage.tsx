import { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  User,
  Phone,
  MapPin,
  StickyNote,
  ShoppingBag,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatRuppes } from '@/utils/format';
import { supabase } from '@/lib/supabase';
import type { CustomerInfo } from '@/types';

interface CheckoutPageProps {
  onBack: () => void;
}

export default function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { items, subtotal, deliveryFee, total, clearCart, itemCount } = useCart();
  const [form, setForm] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = (): boolean => {
    const e: Partial<Record<keyof CustomerInfo, string>> = {};
    if (!form.fullName.trim()) e.fullName = 'Please enter your full name';
    if (!form.phone.trim()) e.phone = 'Please enter your phone number';
    if (!form.address.trim()) e.address = 'Please enter your delivery address';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate() || items.length === 0 || submitting) return;

    setSubmitting(true);
    setSubmitError('');

    const orderPayload = {
      customer_name: form.fullName,
      phone: form.phone,
      address: form.address,
      notes: form.notes || null,
      items: items.map((i) => ({
        name: i.name,
        option: i.optionLabel,
        quantity: i.quantity,
        price: i.price,
      })),
      subtotal,
      delivery_fee: deliveryFee,
      total,
    };

    const { data, error } = await supabase
      .from('orders')
      .insert(orderPayload)
      .select('id')
      .maybeSingle();

    if (error || !data) {
      setSubmitting(false);
      setSubmitError(
        'Something went wrong while placing your order. Please try again or call 0311-1500555.'
      );
      return;
    }

    setOrderId(`MRW-${data.id.slice(-6).toUpperCase()}`);
    setPlaced(true);
    clearCart();
    setSubmitting(false);
  };

  const update = (field: keyof CustomerInfo, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // ── Order confirmation ──────────────────────────────────────────
  if (placed) {
    return (
      <div className="min-h-screen bg-black pt-24">
        <div className="mx-auto max-w-2xl px-4 py-12 md:px-8">
          <div className="animate-fade-up rounded-3xl border border-green-600/20 bg-gradient-to-b from-zinc-900 to-black p-8 text-center md:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-600/20 ring-4 ring-green-600/10">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold text-white">
              Order Placed!
            </h2>
            <p className="mt-3 text-gray-400">
              Thank you, {form.fullName.split(' ')[0] || 'valued customer'}! Your
              order has been received.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-wider text-gray-500">
                  Order ID
                </span>
                <span className="font-display text-lg font-bold text-red-500">
                  {orderId}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm text-gray-400">Total Paid</span>
                <span className="font-display text-xl font-bold text-white">
                  {formatRuppes(total)}
                </span>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              We'll call you shortly to confirm your delivery. For any queries,
              call <span className="text-red-500">0311-1500555</span>
            </p>

            <button
              onClick={() => {
                setPlaced(false);
                onBack();
              }}
              className="mt-8 rounded-full bg-red-600 px-8 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-red-500"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Empty cart guard ────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center md:px-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
            <ShoppingBag className="h-8 w-8 text-gray-600" />
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold text-white">
            Your cart is empty
          </h2>
          <p className="mt-2 text-gray-400">
            Add items from the menu before checking out.
          </p>
          <button
            onClick={onBack}
            className="mt-6 rounded-full bg-red-600 px-8 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-red-500"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  // ── Checkout form ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
        {/* Back */}
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </button>

        <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          CHECKOUT
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-8 lg:grid-cols-5"
        >
          {/* Form fields */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-6">
              <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-white">
                Delivery Details
              </h2>

              <div className="mt-6 space-y-5">
                {/* Full Name */}
                <Field
                  label="Full Name"
                  icon={User}
                  error={errors.fullName}
                  value={form.fullName}
                  onChange={(v) => update('fullName', v)}
                  placeholder="Enter your full name"
                />

                {/* Phone */}
                <Field
                  label="Phone Number"
                  icon={Phone}
                  error={errors.phone}
                  value={form.phone}
                  onChange={(v) => update('phone', v)}
                  placeholder="03XX-XXXXXXX"
                  type="tel"
                />

                {/* Address */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      Full Delivery Address
                    </span>
                  </label>
                  <textarea
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    placeholder="House #, Street, Area, City"
                    rows={3}
                    className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors focus:bg-white/10 ${
                      errors.address
                        ? 'border-red-500'
                        : 'border-white/10 focus:border-red-600'
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">
                    <span className="inline-flex items-center gap-2">
                      <StickyNote className="h-4 w-4 text-red-500" />
                      Order Notes <span className="text-gray-600">(optional)</span>
                    </span>
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    placeholder="Any special instructions for your order..."
                    rows={2}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors focus:border-red-600 focus:bg-white/10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-6">
              <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-white">
                Order Summary
              </h2>

              {/* Items */}
              <div className="mt-4 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.optionLabel}</p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        Qty: {item.quantity} × {formatRuppes(item.price)}
                      </p>
                    </div>
                    <span className="font-display text-sm font-semibold text-red-500">
                      {formatRuppes(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">{formatRuppes(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="text-white">{formatRuppes(deliveryFee)}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 text-base">
                  <span className="font-display font-semibold text-white">
                    Grand Total
                  </span>
                  <span className="font-display font-bold text-red-500">
                    {formatRuppes(total)}
                  </span>
                </div>
              </div>

              {/* Place order */}
              {submitError && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-950/20 px-4 py-3 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {submitError}
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-red-600 py-4 font-display text-base font-semibold uppercase tracking-wider text-white shadow-lg shadow-red-900/40 transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
              <p className="mt-3 text-center text-xs text-gray-600">
                You'll receive a confirmation call shortly after placing your order.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Reusable field component ───────────────────────────────────────
interface FieldProps {
  label: string;
  icon: React.ElementType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
}

function Field({ label, icon: Icon, value, onChange, placeholder, error, type = 'text' }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-300">
        <span className="inline-flex items-center gap-2">
          <Icon className="h-4 w-4 text-red-500" />
          {label}
        </span>
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors focus:bg-white/10 ${
          error ? 'border-red-500' : 'border-white/10 focus:border-red-600'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
