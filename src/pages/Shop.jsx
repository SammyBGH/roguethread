import React, { useState, useEffect } from "react";
import "../styles/Shop.css";
import ProductCard from "../components/ProductCard.jsx";
import ProductModal from "../components/ProductModal.jsx";
import { useCart } from "../contexts/CartContext.jsx";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050/api";

    fetch(`${API_URL}/products`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch products");
        return r.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load products.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="shop__loading">Loading products...</p>;
  if (error) return <p className="shop__error">{error}</p>;

  const handleAddToCart = (product, selection) => {
    addToCart(product, selection, 1);
    setSelectedProduct(null); // close modal after adding
  };

  return (
    <section className="shop">
      <h2 className="shop__title">Shop Collection</h2>
      <div className="shop__grid">
        {products.length === 0 ? (
          <p>No products available right now.</p>
        ) : (
          products.map((p) => (
            <ProductCard
              key={p.sku}
              product={p}
              onClick={setSelectedProduct} // open modal
            />
          ))
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={handleAddToCart}
        />
      )}
    </section>
  );
}
