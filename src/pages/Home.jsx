import React from "react";
import "../styles/Home.css";
import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import Newsletter from "../components/Newsletter.jsx";

import storyImg from "../assets/images/brand-story.jpg";
import social1 from "../assets/images/social1.jpg";
import social2 from "../assets/images/social2.jpg";
import social3 from "../assets/images/social3.jpg";
import social4 from "../assets/images/social4.jpg";

export default function Home({ onNavigate }) {
  return (
    <main className="home">
      {/* Hero Section */}
      <Hero onShop={() => onNavigate?.("/shop")} />

      {/* Highlights Section */}
      <section className="home__highlights">
        <div className="highlight">LIMITED RELEASES</div>
        <div className="highlight">ETHICALLY SOURCED</div>
        <div className="highlight">MADE FOR MOVEMENT</div>
      </section>

      {/* Brand Story Section */}
      <section className="home__story">
        <div className="story__img">
          <img src={storyImg} alt="Our Story" />
        </div>
        <div className="story__text">
          <h2>Our Story</h2>
          <p>
            Born from the streets, built for movement. Our collections blend
            bold design with ethical craftsmanship to create apparel that
            moves with you. Each piece tells a story—your story.
          </p>
        </div>
      </section>

      {/* Social Feed Section */}
      <section className="home__social">
        <h2>Street Style</h2>
        <div className="social__grid">
          {[social1, social2, social3, social4].map((img, i) => (
            <div key={i} className="social__card">
              <img src={img} alt={`Social ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Component */}
      <Newsletter />

      {/* Bottom Marquee */}
      <Marquee text="FREE RETURNS • ETHICAL SOURCING • MADE FOR MOVEMENT • " />
    </main>
  );
}
