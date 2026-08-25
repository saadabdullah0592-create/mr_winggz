export interface PriceOption {
  label: string;
  price: number;
  description?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  image: string;
  description?: string;
  priceOptions: PriceOption[];
  popular?: boolean;
}

export interface CartItem {
  id: string;
  itemId: string;
  name: string;
  optionLabel: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
}

export interface Order {
  id: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export type OrderStatus =
  | 'new'
  | 'preparing'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled';

export interface AdminOrderItem {
  name: string;
  option: string;
  quantity: number;
  price: number;
}

export interface AdminOrder {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  notes: string | null;
  items: AdminOrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: OrderStatus;
  created_at: string;
}
