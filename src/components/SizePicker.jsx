import React from "react";
import "../styles/SizePicker.css";

export default function SizePicker({ options, value, onChange }) {
  return (
    <div className="sizes">
      {options.map((s)=>(
        <button key={s} className={"sizes__btn"+(s===value?" is-on":"")}
          onClick={()=>onChange(s)}>{s}</button>
      ))}
    </div>
  );
}
