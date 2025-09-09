import React from "react";
import "../styles/ProductCard.css";

export default function ProductCard({ product, onClick }) {
  return (
    <article className="card" onClick={() => onClick(product)}>
      <div className="card__img">
        <img src={product.image} alt={product.name} />
      </div>
    </article>
  );
}
