import React from "react";
import "../styles/Checkout.css";
import { useCart } from "../contexts/CartContext.jsx";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    address: "",
    payment: "momo",
  });
  const [status, setStatus] = React.useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setStatus("Your cart is empty.");
      setTimeout(() => setStatus(""), 4000);
      return;
    }

    try {
      const backendURL = `${process.env.REACT_APP_API_URL}/orders`;

      const response = await fetch(backendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: form, items: cart }),
      });

      if (!response.ok) throw new Error("Failed to place order");

      const data = await response.json();
      setStatus("Order placed successfully! #" + data.id);

      setForm({ name: "", email: "", address: "", payment: "momo" });
      clearCart();

      setTimeout(() => setStatus(""), 5000);
    } catch (err) {
      console.error(err);
      setStatus("Error placing order. Please try again.");
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <section className="chk">
      <h2>Checkout</h2>
      <form className="chk__form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Payment Method
          <select name="payment" value={form.payment} onChange={handleChange}>
            <option value="momo">Mobile Money</option>
            <option value="card">Credit Card</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </label>
        <button type="submit">Place Order</button>
      </form>
      {status && <div className="chk__status">{status}</div>}
    </section>
  );
}
