
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export default   create(
  persist(
    (set, get) => ({
      cart: [],
      addItem: (item) => set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
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
      removeItem: (itemId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== itemId),
      })),
      clearCart: () => set({ cart: [] }),
      getTotalItems: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + item.quantity * item.price, 0);
      },
      getTax: () => {
      
        return 0;
      },
      getEstimateDate: () => {

        return 0;
      },
      getTotalPrice: () => {

        return 100;
      }
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
    },
  ),
)
