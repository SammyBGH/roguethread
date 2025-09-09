import React, { useState, useEffect, useRef } from "react";
import { palette } from "../theme/colors.js";
import "../styles/Header.css";
import StickerButton from "./StickerButton.jsx";
import TicketTag from "./TicketTag.jsx";
import { useCart } from "../contexts/CartContext.jsx";

export default function Header({ onNavigate }) {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="hdr">
      {/* Brand / Logo */}
      <div className="hdr__brand" onClick={() => onNavigate("/")}>
        <span className="hdr__logo">
          Rogue<span style={{ color: palette.chili }}>●</span>Thread
        </span>
        <TicketTag text="NEW DROP" />
      </div>

      {/* Right side: Cart + Hamburger */}
      <div className="hdr__cta">
        {/* Cart button */}
        <StickerButton
          label={`Cart (${cartCount})`}
          id="open-cart"
          onClick={() => onNavigate("/cart")}
        />

        {/* Hamburger toggle (mobile) */}
        <div
          ref={toggleRef}
          className="hdr__menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav
        ref={menuRef}
        className={`hdr__nav ${menuOpen ? "active" : ""}`}
      >
        <button
          onClick={() => {
            onNavigate("/shop");
            setMenuOpen(false);
          }}
          className="hdr__link"
        >
          Shop
        </button>
        <button
          onClick={() => {
            onNavigate("/lookbook");
            setMenuOpen(false);
          }}
          className="hdr__link"
        >
          Lookbook
        </button>
        <button
          onClick={() => {
            onNavigate("/about");
            setMenuOpen(false);
          }}
          className="hdr__link"
        >
          About
        </button>
      </nav>
    </header>
  );
}
