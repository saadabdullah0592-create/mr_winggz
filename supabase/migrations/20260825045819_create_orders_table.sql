/*
# Create orders table for Mr Winggz restaurant

## Purpose
Stores every customer order placed through the website checkout.
This is a single-tenant restaurant app — no customer sign-in.
Customers place orders anonymously; only admin staff sign in to manage orders.

## New Tables

### orders
- id (uuid, primary key) — auto-generated unique order ID
- customer_name (text, not null) — full name from checkout form
- phone (text, not null) — customer phone number
- address (text, not null) — delivery address
- notes (text, nullable) — optional order notes
- items (jsonb, not null) — array of cart items with name, option, qty, price
- subtotal (integer, not null) — sum of all item prices before delivery
- delivery_fee (integer, not null) — flat delivery fee
- total (integer, not null) — subtotal + delivery_fee
- status (text, not null, default 'new') — order workflow status
- created_at (timestamptz, default now()) — order placement time

## Security
- RLS enabled on orders.
- Customers (anon role) can INSERT new orders only — they cannot read or modify orders.
- Authenticated admin staff can SELECT, UPDATE status, and manage all orders.
- DELETE is blocked for both anon and authenticated (orders are never hard-deleted).

## Order Status Values
- new — freshly placed, not yet acknowledged
- preparing — kitchen is working on it
- out_for_delivery — on the way to customer
- completed — delivered successfully
- cancelled — order cancelled
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  notes text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal integer NOT NULL DEFAULT 0,
  delivery_fee integer NOT NULL DEFAULT 0,
  total integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'new' CHECK (
    status IN ('new', 'preparing', 'out_for_delivery', 'completed', 'cancelled')
  ),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for admin sorting by newest first
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);

-- Index for filtering by status
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders (status);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Customers (anon) can only INSERT — they create orders but cannot see them
DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders"
ON orders FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admin (authenticated) can read all orders
DROP POLICY IF EXISTS "admin_select_orders" ON orders;
CREATE POLICY "admin_select_orders"
ON orders FOR SELECT
TO authenticated
USING (true);

-- Admin (authenticated) can update order status
DROP POLICY IF EXISTS "admin_update_orders" ON orders;
CREATE POLICY "admin_update_orders"
ON orders FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);
