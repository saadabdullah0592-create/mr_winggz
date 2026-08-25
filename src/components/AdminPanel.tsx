import { useState, useEffect, useCallback } from 'react';
import {
  Flame,
  LogOut,
  RefreshCw,
  Phone,
  MapPin,
  Clock,
  StickyNote,
  ChevronDown,
  ChevronUp,
  Loader2,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { formatRuppes } from '@/utils/format';
import type { AdminOrder, OrderStatus } from '@/types';

interface AdminPanelProps {
  onBack: () => void;
}

const STATUS_TABS: { id: OrderStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'All Orders' },
  { id: 'new', label: 'New' },
  { id: 'preparing', label: 'Preparing' },
  { id: 'out_for_delivery', label: 'Out for Delivery' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

const STATUS_FLOW: OrderStatus[] = [
  'new',
  'preparing',
  'out_for_delivery',
  'completed',
  'cancelled',
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  new: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  preparing: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  out_for_delivery: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  completed: 'bg-green-500/15 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  new: 'New',
  preparing: 'Preparing',
  out_for_delivery: 'Out for Delivery',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('en-PK', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const { signOut } = useAdminAuth();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data as AdminOrder[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    setUpdatingId(orderId);
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (!error) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
    }
    setUpdatingId(null);
  };

  const filteredOrders =
    activeTab === 'all' ? orders : orders.filter((o) => o.status === activeTab);

  const counts = orders.reduce(
    (acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-900">
              <Flame className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <div>
              <h1 className="font-display text-lg font-bold tracking-wide text-white">
                MR <span className="text-red-600">WINGGZ</span>
              </h1>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Admin Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400 transition-colors hover:border-red-600/50 hover:text-white sm:flex"
            >
              <ExternalLink className="h-4 w-4" />
              View Site
            </button>
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:border-red-600/50 hover:text-white"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {STATUS_FLOW.map((status) => (
            <div
              key={status}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-4"
            >
              <div className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[status]}`}>
                {STATUS_LABELS[status]}
              </div>
              <div className="mt-2 font-display text-2xl font-bold text-white">
                {counts[status] || 0}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 font-display text-sm font-semibold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white'
                  : 'border border-white/10 bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
              {tab.id !== 'all' && counts[tab.id] ? (
                <span className="ml-2 text-xs opacity-80">({counts[tab.id]})</span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Orders */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-red-500" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
              <ShoppingBag className="h-7 w-7 text-gray-600" />
            </div>
            <p className="font-display text-lg text-gray-400">No orders yet</p>
            <p className="text-sm text-gray-600">
              New customer orders will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                expanded={expandedId === order.id}
                onToggle={() =>
                  setExpandedId(expandedId === order.id ? null : order.id)
                }
                onStatusChange={(status) => updateStatus(order.id, status)}
                updating={updatingId === order.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Order Row ──────────────────────────────────────────────────────
interface OrderRowProps {
  order: AdminOrder;
  expanded: boolean;
  onToggle: () => void;
  onStatusChange: (status: OrderStatus) => void;
  updating: boolean;
}

function OrderRow({ order, expanded, onToggle, onStatusChange, updating }: OrderRowProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black">
      {/* Summary row */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/5"
      >
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold text-red-500">
                MRW-{order.id.slice(-6).toUpperCase()}
              </span>
              <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
                {STATUS_LABELS[order.status]}
              </span>
            </div>
            <p className="mt-1 text-sm text-white">{order.customer_name}</p>
            <p className="text-xs text-gray-500">{formatDateTime(order.created_at)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-display text-lg font-bold text-white">
              {formatRuppes(order.total)}
            </p>
            <p className="text-xs text-gray-500">
              {order.items.reduce((s, i) => s + i.quantity, 0)} item(s)
            </p>
          </div>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="animate-fade-in border-t border-white/10 px-5 py-5">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Customer info */}
            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gray-400">
                Customer Details
              </h4>
              <div className="mt-3 space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                  <a href={`tel:${order.phone}`} className="text-white hover:text-red-500">
                    {order.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                  <span className="text-gray-300">{order.address}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                  <span className="text-gray-300">{formatDateTime(order.created_at)}</span>
                </div>
                {order.notes && (
                  <div className="flex items-start gap-3 text-sm">
                    <StickyNote className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                    <span className="text-gray-300">{order.notes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order items */}
            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gray-400">
                Order Items
              </h4>
              <div className="mt-3 space-y-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.option} · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="font-display text-sm font-semibold text-red-500">
                      {formatRuppes(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">{formatRuppes(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="text-white">{formatRuppes(order.delivery_fee)}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="font-display font-semibold text-white">Total</span>
                  <span className="font-display font-bold text-red-500">
                    {formatRuppes(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status controls */}
          <div className="mt-6 border-t border-white/10 pt-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gray-400">
              Update Status
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {STATUS_FLOW.map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(status)}
                  disabled={updating || order.status === status}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    order.status === status
                      ? `${STATUS_COLORS[status]} border`
                      : 'border border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                  } disabled:cursor-not-allowed`}
                >
                  {updating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    STATUS_LABELS[status]
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
