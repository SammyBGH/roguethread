import React from "react";
import "../styles/ColorSwatch.css";

export default function ColorSwatch({ options, value, onChange }) {
  return (
    <div className="swatch">
      {options.map((c) => (
        <button
          key={c.hex}
          title={c.name}
          className={
            "swatch__dot" + (value.hex === c.hex ? " is-active" : "")
          }
          style={{ backgroundColor: c.hex }}
          onClick={() => onChange(c)}
        />
      ))}
    </div>
  );
}
