import React from "react";
import "../styles/Lookbook.css";

// Import your images
import imgA from "../assets/images/social1.jpg";
import imgB from "../assets/images/social2.jpg";
import imgC from "../assets/images/social3.jpg";
import imgD from "../assets/images/social4.jpg";
import imgE from "../assets/images/social5.jpg";

export default function Lookbook() {
  const images = [
    { src: imgA, className: "look__cell tall", alt: "Look A" },
    { src: imgB, className: "look__cell", alt: "Look B" },
    { src: imgC, className: "look__cell wide", alt: "Look C" },
    { src: imgD, className: "look__cell", alt: "Look D" },
    { src: imgE, className: "look__cell tall", alt: "Look E" },
  ];

  return (
    <section className="look">
      <h2>Lookbook</h2>
      <p>Editorial layouts to showcase fits.</p>

      <div className="look__mosaic">
        {images.map((img, i) => (
          <div key={i} className={img.className}>
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>
    </section>
  );
}
