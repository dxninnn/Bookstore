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
  placeOrder: () => Promise<void>; // ✅ Added placeOrder to the store
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log("Session Data:", session);
      
      if (error) {
        console.error("Error getting session:", error);
        return;
      }
      
      const userId = session?.user.id;
      if (!userId) {
        console.error('User not authenticated');
        return;
      }
  
      console.log('Adding item to cart with ID:', item.id); // Debugging log
  
      // ✅ Validate if `item.id` is a proper UUID before inserting
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(item.id)) {
        console.error('❌ Invalid UUID format for book_id:', item.id);
        return;
      }
  
    
      supabase
        .from('cart_items')
        .insert([{ user_id: userId, book_id: item.id, quantity: 1 }])
        .then(({ data, error }) => {
          if (error) {
            console.error("Error adding item to cart:", error);
          } else {
            console.log("Item successfully added to cart:", data);
    
            set((state) => {
              console.log("Item being added:", item);
              const existingItem = state.items.find((i) => i.id === item.id);
              if (existingItem) {
                return {
                  items: state.items.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                  ),
                };
              }
              return { items: [...state.items, { ...item, quantity: 1 }] };
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
  // ✅ Updated placeOrder function
  placeOrder: async () => {
    const { items, clearCart } = get();
    const userSession = await supabase.auth.getSession();

    if (!userSession.data.session?.user) {
      console.error("❌ User not authenticated.");
      return;
    }

    const userId = userSession.data.session.user.id;

    if (items.length === 0) {
      console.error("❌ Cart is empty.");
      return;
    }

    try {
      // 1️⃣ Insert new order into `orders` table
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([{ user_id: userId, date: new Date(), total: get().total }])
        .select()
        .single();

      if (orderError) {
        console.error("❌ Error creating order:", orderError);
        return;
      }

      console.log("✅ Order created:", order);

      // 2️⃣ Ensure order_id is valid
      if (!order || !order.id) {
        console.error("❌ Order ID is missing. Cannot insert order items.");
        return;
      }

      // 3️⃣ Check if book IDs exist before inserting into `order_items`
      const bookIds = items.map((item) => item.id);
      const { data: existingBooks, error: booksError } = await supabase
        .from("books")
        .select("id")
        .in("id", bookIds);

      if (booksError || !existingBooks || existingBooks.length !== bookIds.length) {
        console.error("❌ Some book IDs do not exist in `books` table:", booksError || bookIds);
        return;
      }

      console.log("✅ All book IDs exist in `books` table.");

      // 4️⃣ Insert cart items into `order_items` table
      const orderItems = items.map((item) => ({
        order_id: order.id, // ✅ Ensure correct order_id is passed
        book_id: item.id, // ✅ Ensure this matches `books.id` in Supabase
        quantity: item.quantity,
      }));

      console.log("🛒 Order items to be inserted:", orderItems);

      const { error: orderItemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (orderItemsError) {
        console.error("❌ Error adding items to order:", orderItemsError);
        return;
      }

      console.log("✅ Order items added successfully");

      // 5️⃣ Clear the cart after successful order
      await supabase.from("cart_items").delete().eq("user_id", userId);
      clearCart();
      console.log("🛒 Cart cleared after order.");
    } catch (error) {
      console.error("❌ Unexpected error during checkout:", error);
    }
  },
  
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
