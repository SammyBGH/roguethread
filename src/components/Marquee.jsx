import React from "react";
import "../styles/Marquee.css";

export default function Marquee({ text }) {
  return (
    <div className="marquee">
      <div className="marquee__track" aria-hidden>{text.repeat(6)}</div>
    </div>
  );
}
