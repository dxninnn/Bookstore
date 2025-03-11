import { create } from 'zustand';
import { supabase } from '../utils/supabaseClient';

export interface CartItem {
  id: string;
  title: string;
  author: string;
  cover: string;
  price: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
        return;
      }

      const userId = session?.user.id;
      if (!userId) {
        console.error('User not authenticated');
        return;
      }

      supabase
        .from('cart')
        .insert([{ user_id: userId, product_id: item.id, quantity: 1 }])
        .then(({ error }) => {
          if (error) {
            console.error('Error adding item to cart:', error);
          } else {
            set((state) => {
              console.log('Item being added:', item);
              const existingItem = state.items.find((i) => i.id === item.id);
              if (existingItem) {
                return {
                  items: state.items.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                  ),
                };
              }
              return { items: [...state.items, JSON.parse(JSON.stringify({ ...item, quantity: 1 }))] };
            });
          }
        });
    });
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? JSON.parse(JSON.stringify({ ...item, quantity })) : item
      ),
    }));
  },
  clearCart: () => set({ items: [] }),
  get subtotal() {
    return get().items.reduce(
      (sum, item) => {
        console.log('Original price:', item.price);
        const priceWithoutCurrency = item.price.replace(/[^0-9.]/g, '');
        console.log('Price without currency:', priceWithoutCurrency);
        const numericPrice = parseFloat(priceWithoutCurrency);
        console.log('Numeric price:', numericPrice);
        if (isNaN(numericPrice)) {
          console.error('Invalid price:', item.price);
          return sum;
        }
        return sum + (numericPrice * item.quantity);
      },
      0
    );
  },
  get shipping() {
    const subtotal = get().subtotal;
    return subtotal > 50 ? 0 : 5.99;
  },
  get tax() {
    return get().subtotal * 0.08; // 8% tax rate
  },
  get total() {
    return get().subtotal + get().shipping + get().tax;
  },
}));
