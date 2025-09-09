import React from "react";
import "../styles/Footer.css";

export default function Footer({ onNavigate }) {
  return (
    <footer className="ftr">
      <div className="ftr__brand">RogueThread © {new Date().getFullYear()}</div>
      <div className="ftr__nav">
        <a href="#/shop">Shop</a>
        <a href="#/lookbook">Lookbook</a>
        <a href="#/about">About</a>
      </div>
      <div className="ftr__note">Crafted with warm colors only.</div>
    </footer>
  );
}
