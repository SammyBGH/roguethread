import React from "react";
import "../styles/StickerButton.css";

export default function StickerButton({ label, onClick, id }) {
  return (
    <button id={id} onClick={onClick} className="sticker">
      <span>{label}</span>
    </button>
  );
}
