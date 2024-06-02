import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product, quantity) =>
    set((state) => {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        const newCart = [...state.cart];
        newCart[existingProductIndex].quantity += quantity;
        return { cart: newCart };
      } else {
        return { cart: [...state.cart, { ...product, quantity }] };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
