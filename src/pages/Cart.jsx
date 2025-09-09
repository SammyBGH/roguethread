import React from "react";
import "../styles/Cart.css";
import { useCart } from "../contexts/CartContext.jsx";

export default function Cart({ onNavigate }) {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Safely calculate subtotal
  const subtotal = cart.reduce((acc, item) => {
    if (!item || !item.product || typeof item.product.price !== "number") return acc;
    return acc + item.product.price * (item.quantity || 1);
  }, 0);

  // Fallback navigation if onNavigate is not passed
  const safeNavigate = (path) => {
    if (typeof onNavigate === "function") onNavigate(path);
    else window.location.hash = path; // fallback
  };

  if (!cart || cart.length === 0) {
    return (
      <section className="cart">
        <h2 className="cart__title">Your Cart</h2>
        <p className="cart__empty">Your cart is currently empty.</p>
      </section>
    );
  }

  return (
    <section className="cart">
      <h2 className="cart__title">Your Shopping Cart</h2>

      <div className="cart__items">
        {cart.map((item, index) => {
          if (!item || !item.product) return null;
          const { product, selection, quantity } = item;
          const selectedColor =
            product.colors?.find((c) => c.name === selection?.color) || null;

          return (
            <div
              className="cart__item"
              key={`${product.sku}-${selection?.size || "nosize"}-${selection?.color || "nocolor"}-${index}`}
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="cart__item-image"
              />

              {/* Item Details */}
              <div className="cart__item-details">
                <h3 className="cart__item-name">{product.name}</h3>

                {/* Size & Color */}
                <p className="cart__item-meta">
                  Size: <strong>{selection?.size || "—"}</strong> | Color:{" "}
                  {selectedColor ? (
                    <>
                      <span
                        className="cart__color-swatch"
                        style={{
                          backgroundColor: selectedColor.hex,
                          display: "inline-block",
                          width: "14px",
                          height: "14px",
                          border: "1px solid #1a1a1a",
                          borderRadius: "50%",
                          marginRight: "6px",
                          verticalAlign: "middle",
                        }}
                      />
                      <strong>{selectedColor.name}</strong>
                    </>
                  ) : (
                    <strong>—</strong>
                  )}
                </p>

                {/* Price */}
                <p className="cart__item-price">
                  ${typeof product.price === "number" ? product.price.toFixed(2) : "N/A"}
                </p>

                {/* Quantity + Remove */}
                <div className="cart__item-controls">
                  <label>
                    Qty:
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        updateQuantity(
                          product.sku,
                          selection,
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </label>
                  <button
                    className="cart__remove-btn"
                    onClick={() => removeFromCart(product.sku, selection)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      <div className="cart__summary">
        <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
        <button
          className="cart__checkout-btn"
          onClick={() => safeNavigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
}
