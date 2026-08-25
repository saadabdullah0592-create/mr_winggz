import type { MenuItem } from '@/types';

export const CATEGORIES = [
  { id: 'burgers', label: 'MrWinggz Burgers' },
  { id: 'festival', label: 'Fried Festival' },
  { id: 'pizza', label: 'Royal Crust Pizza' },
] as const;

export const DELIVERY_FEE = 150;

export const menuItems: MenuItem[] = [
  // ── MRWINGGZ BURGERS ──────────────────────────────────────────────
  {
    id: 'crispy-burger',
    name: 'Crispy Burger',
    category: 'burgers',
    image:
      'https://images.pexels.com/photos/5474836/pexels-photo-5474836.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Crispy fried chicken patty in a soft bun.',
    popular: true,
    priceOptions: [
      { label: 'Burger', price: 260 },
      { label: 'Crispy with Fries N Drink', price: 460 },
      {
        label: 'Crispy Combo',
        price: 490,
        description: 'Includes 1 Pc Chicken + Regular Drink',
      },
    ],
  },
  {
    id: 'krunch-burger',
    name: 'Krunch Burger',
    category: 'burgers',
    image:
      'https://images.pexels.com/photos/9975765/pexels-photo-9975765.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Crunchy chicken fillet with signature sauce.',
    priceOptions: [
      { label: 'Burger', price: 240 },
      { label: 'Krunch with Fries N Drink', price: 470 },
      {
        label: 'Krunch Combo',
        price: 500,
        description: 'Includes 1 Pc Chicken + Regular Drink',
      },
    ],
  },
  {
    id: 'winger-burger',
    name: 'Winger Burger',
    category: 'burgers',
    image:
      'https://images.pexels.com/photos/11299738/pexels-photo-11299738.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Double the chicken, double the flavour.',
    popular: true,
    priceOptions: [
      { label: 'Burger', price: 450 },
      { label: 'Winger with Fries N Drink', price: 680 },
      {
        label: 'Winger Combo',
        price: 710,
        description: 'Includes 1 Pc Chicken + Regular Drink',
      },
    ],
  },
  {
    id: 'mighty-winger',
    name: 'Mighty Winger',
    category: 'burgers',
    image:
      'https://images.pexels.com/photos/15076692/pexels-photo-15076692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'The biggest, boldest winger burger we make.',
    priceOptions: [
      { label: 'Burger', price: 640 },
      { label: 'Mighty Winger with Fries N Drink', price: 870 },
      {
        label: 'Mighty Combo',
        price: 900,
        description: 'Includes 1 Pc Chicken + Regular Drink',
      },
    ],
  },
  {
    id: 'hot-wings',
    name: 'Hot Wings',
    category: 'burgers',
    image:
      'https://images.pexels.com/photos/14382401/pexels-photo-14382401.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Fiery, crispy chicken wings tossed in our signature glaze.',
    popular: true,
    priceOptions: [
      { label: '5 Pcs Hot Wings', price: 320 },
      { label: '10 Pcs Hot Wings', price: 550 },
    ],
  },
  {
    id: 'chicken-box',
    name: 'Chicken Box',
    category: 'burgers',
    image:
      'https://images.pexels.com/photos/5474676/pexels-photo-5474676.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Three pieces of our perfectly seasoned fried chicken.',
    priceOptions: [{ label: '3 Pcs Chicken', price: 550 }],
  },
  {
    id: 'boneless-box',
    name: 'Boneless Box',
    category: 'burgers',
    image:
      'https://images.pexels.com/photos/33068077/pexels-photo-33068077.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: '4 Spicy Chicken Strips + Regular Fries + Regular Drink.',
    priceOptions: [
      {
        label: 'Boneless Box',
        price: 590,
        description: '4 Spicy Chicken Strips + Regular Fries + Regular Drink',
      },
    ],
  },

  // ── MRWINGGZ FRIED FESTIVAL ───────────────────────────────────────
  {
    id: 'wow-box',
    name: 'Wow Box',
    category: 'festival',
    image:
      'https://images.pexels.com/photos/12362926/pexels-photo-12362926.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: '5 Pcs Chicken + Regular Fries + 1.0 Ltr Drink.',
    popular: true,
    priceOptions: [
      {
        label: 'Wow Box',
        price: 1100,
        description: '5 Pcs Chicken + Regular Fries + 1.0 Ltr Drink',
      },
    ],
  },
  {
    id: 'value-meal',
    name: 'Value Meal',
    category: 'festival',
    image:
      'https://images.pexels.com/photos/6697493/pexels-photo-6697493.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: '9 Pcs Chicken — the ultimate chicken feast.',
    priceOptions: [{ label: 'Value Meal', price: 1750, description: '9 Pcs Chicken' }],
  },
  {
    id: 'xtreme',
    name: 'Xtreme',
    category: 'festival',
    image:
      'https://images.pexels.com/photos/38896826/pexels-photo-38896826.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: '2 Pcs Chicken + 2 Winger Burgers + 1.0 Ltr Drink.',
    priceOptions: [
      {
        label: 'Xtreme',
        price: 1340,
        description: '2 Pcs Chicken + 2 Winger Burgers + 1.0 Ltr Drink',
      },
    ],
  },
  {
    id: 'krunch-family-festival',
    name: 'Krunch Family Festival',
    category: 'festival',
    image:
      'https://images.pexels.com/photos/11414300/pexels-photo-11414300.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: '4 Krunch Burgers + 4 Pcs Chicken + 1.0 Ltr Drink.',
    priceOptions: [
      {
        label: 'Krunch Family Festival',
        price: 1890,
        description: '4 Krunch Burgers + 4 Pcs Chicken + 1.0 Ltr Drink',
      },
    ],
  },
  {
    id: 'friends-family-festival',
    name: 'Friends & Family Festival',
    category: 'festival',
    image:
      'https://images.pexels.com/photos/15910249/pexels-photo-15910249.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: '4 Winger Burgers + 4 Pcs Chicken + 1.0 Ltr Drink.',
    popular: true,
    priceOptions: [
      {
        label: 'Friends & Family Festival',
        price: 2290,
        description: '4 Winger Burgers + 4 Pcs Chicken + 1.0 Ltr Drink',
      },
    ],
  },
  {
    id: 'crispy-festival',
    name: 'Crispy Festival',
    category: 'festival',
    image:
      'https://images.pexels.com/photos/14773000/pexels-photo-14773000.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: '4 Krunch Burgers + 10 Pcs Hot Wings + 1.0 Ltr Drink.',
    priceOptions: [
      {
        label: 'Crispy Festival',
        price: 1650,
        description: '4 Krunch Burgers + 10 Pcs Hot Wings + 1.0 Ltr Drink',
      },
    ],
  },
  {
    id: 'family-festival',
    name: 'Family Festival',
    category: 'festival',
    image:
      'https://images.pexels.com/photos/11975899/pexels-photo-11975899.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: '4 Winger Burgers + 20 Pcs Hot Wings + 1.0 Ltr Drink.',
    priceOptions: [
      {
        label: 'Family Festival',
        price: 2880,
        description: '4 Winger Burgers + 20 Pcs Hot Wings + 1.0 Ltr Drink',
      },
    ],
  },

  // ── ROYAL CRUST PIZZA ────────────────────────────────────────────
  {
    id: 'royal-crust-pizza',
    name: 'Royal Crust Pizza',
    category: 'pizza',
    image:
      'https://images.pexels.com/photos/31587565/pexels-photo-31587565.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'A unique blend of grilled chicken, onions, capsicum, olives and mozzarella cheese with hot BBQ Tandoori Sauce.',
    popular: true,
    priceOptions: [
      { label: 'Regular', price: 699 },
      { label: 'Large', price: 950 },
      { label: 'XL / 17" Extra Large', price: 1299 },
    ],
  },
];
