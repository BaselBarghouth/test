import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export default create(
  persist(
    (set, get) => ({
      cart: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) =>
              cartItem.id === item.id && cartItem.sizes.id === item.sizes.id
          );
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
            };
          }
        }),
      removeItem: (product) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              item.id !== product.id && item.sizes.id !== product.sizes.id
          ),
        })),
      clearCart: () => set({ cart: [] }),
      getTotalItems: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        const state = get();
        return state.cart.reduce((total, item) => {
          const qty = Number(item.sizes.qty);
          const price = Number(item.sizes.price.replace(',', '.'));
          return total + item.quantity * qty * price;
        }, 0).toFixed(2);
      },
      getTax: () => {
        return 0;
      },
      getEstimateDate: () => {
        return 0;
      },
    }),
    {
      name: "cart-storage", // name of the item in the storage (must be unique)
    }
  )
);
