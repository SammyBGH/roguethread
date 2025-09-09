import React from "react";
import ColorSwatch from "./ColorSwatch.jsx";
import SizePicker from "./SizePicker.jsx";
import StickerButton from "./StickerButton.jsx";
import "../styles/ProductModal.css";

export default function ProductModal({ product, onClose, onAdd }) {
  const [color, setColor] = React.useState(product.colors?.[0] || { name: "Default", hex: "#ccc" });
  const [size, setSize] = React.useState(product.sizes?.[0] || "");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="modal-meta">
          <h3>{product.name}</h3>
          <p>${product.price.toFixed(2)}</p>

          {product.colors?.length > 0 && (
            <ColorSwatch options={product.colors} value={color} onChange={setColor} />
          )}

          {product.sizes?.length > 0 && (
            <SizePicker options={product.sizes} value={size} onChange={setSize} />
          )}

          <StickerButton
            label="Add to Cart"
            onClick={() => onAdd(product, { color, size })}
          />
        </div>
      </div>
    </div>
  );
}
