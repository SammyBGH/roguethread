import React from "react";
import "../styles/Hero.css";
import Marquee from "./Marquee.jsx";
import { palette } from "../theme/colors";
import heroImg from "../assets/images/hero1.jpg"; 

export default function Hero({ onShop }) {
  return (
    <section className="hero">
      <div className="hero__text">
        <h1>
          Street‑ready <span style={{ color: palette.mustard }}>silhouettes</span><br />
          cut with <span style={{ color: palette.chili }}>heat</span>.
        </h1>
        <p>Made for movement. Built to pop. Zero boring colors.</p>
        <button className="hero__cta" onClick={onShop}>
          Shop the Drop
        </button>
      </div>

      <div className="hero__visual">
        <div className="hero__img-wrapper">
          <img src={heroImg} alt="Hero visual" className="hero__img" />
        </div>
        <Marquee text="LIMITED RELEASE • HAND‑FINISHED • SIZE‑INCLUSIVE • " />
      </div>
    </section>
  );
}
