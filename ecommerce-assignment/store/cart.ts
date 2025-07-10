// store/cart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        const existing = get().cart.find((i) => i.id === item.id);
        if (existing) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...item, quantity: 1 }],
          });
        }
      },

      removeFromCart: (id) =>
        set({ cart: get().cart.filter((item) => item.id !== id) }),

      updateQuantity: (id, qty) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);
