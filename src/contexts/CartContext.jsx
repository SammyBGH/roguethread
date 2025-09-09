// contexts/CartContext.jsx
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ Add item to cart
  const addToCart = (product, selection = {}, quantity = 1) => {
    if (!product || !product.sku) {
      console.error("Invalid product passed to addToCart:", product);
      return;
    }

    const normalizedSelection = {
      size: selection?.size || null,
      color: selection?.color || null,
    };

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.sku === product.sku &&
          item.selection.size === normalizedSelection.size &&
          item.selection.color === normalizedSelection.color
      );

      if (existingIndex !== -1) {
        // If item exists, increase its quantity
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      }

      // Otherwise, add a new entry
      return [
        ...prevCart,
        {
          product, // full product object
          selection: normalizedSelection,
          quantity,
        },
      ];
    });
  };

  // ✅ Remove item
  const removeFromCart = (sku, selection = {}) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.sku === sku &&
            item.selection.size === (selection?.size || null) &&
            item.selection.color === (selection?.color || null)
          )
      )
    );
  };

  // ✅ Update quantity
  const updateQuantity = (sku, selection = {}, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.sku === sku &&
        item.selection.size === (selection?.size || null) &&
        item.selection.color === (selection?.color || null)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // ✅ Clear the entire cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
