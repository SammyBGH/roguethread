import React from "react";
import "../styles/CartDrawer.css";

export default function CartDrawer({ items, onClose }) {
  const total = items.reduce((s,i)=> s + i.product.price * i.qty, 0);
  return (
    <aside className="drawer">
      <div className="drawer__head">
        <h3>Cart</h3>
        <button onClick={onClose}>×</button>
      </div>
      <div className="drawer__list">
        {items.map((i,idx)=>(
          <div key={idx} className="drawer__row">
            <div className="drawer__thumb">[{i.product.sku}]</div>
            <div className="drawer__txt">
              <strong>{i.product.name}</strong>
              <div>{i.variant.size} • {i.variant.color.name}</div>
            </div>
            <div>${i.product.price}</div>
          </div>
        ))}
      </div>
      <div className="drawer__foot">
        <div>Total: <strong>${total.toFixed(2)}</strong></div>
        <a className="drawer__checkout" href="/#/checkout">Checkout</a>
      </div>
    </aside>
  );
}
