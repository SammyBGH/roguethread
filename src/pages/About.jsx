import React, { useEffect } from "react";
import "../styles/About.css";

// Import images from assets
import heroImg from "../assets/images/hero3.jpg";
import gallery1 from "../assets/images/social1.jpg";
import gallery2 from "../assets/images/social2.jpg";
import gallery3 from "../assets/images/social3.jpg";
import founderImg from "../assets/images/founder-image.jpg";

export default function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".animated")
      .forEach((el) => observer.observe(el));
  }, []);

  return (
    <section className="about">
      {/* Hero Section */}
      <div
        className="about__hero animated"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <h1 className="about__hero-title">About RogueThread</h1>
      </div>

      {/* Brand Story */}
      <div className="about__story animated">
        <div className="story__text">
          <h2>Our Story</h2>
          <p>
            RogueThread was founded with a mission to bring bold, expressive,
            and sustainable streetwear to fashion lovers worldwide. Every drop
            is designed with creativity, individuality, and authenticity in
            mind.
          </p>
          <p>
            We challenge the ordinary. From our lookbooks to our shop,
            RogueThread is more than just clothing—it’s a statement. Our
            community thrives on originality and breaking boundaries in fashion.
          </p>
        </div>
        <div className="story__founder">
          <img
            src={founderImg}
            alt="Founder Samuel Boakye"
            className="founder__image"
          />
          <h2>From the Founder</h2>
          <p>
            "RogueThread started as a dream to empower people to express
            themselves freely through fashion. Every piece we create tells a
            story of individuality and passion. Join us on this journey."
          </p>
          <p className="founder__name">— Samuel Boakye, Founder</p>
        </div>
      </div>

      {/* Visual Gallery */}
      <div className="about__gallery animated">
        <h2>Behind the Scenes</h2>
        <div className="gallery__grid">
          <img src={gallery1} alt="Gallery 1" />
          <img src={gallery2} alt="Gallery 2" />
          <img src={gallery3} alt="Gallery 3" />
        </div>
      </div>

      {/* Achievements / Social Proof */}
      <div className="about__achievements animated">
        <h2>Our Achievements</h2>
        <ul>
          <li>Featured in Top Streetwear Magazines</li>
          <li>Over 10,000 satisfied customers worldwide</li>
          <li>Collaborations with renowned urban artists</li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="about__cta animated">
        <h2>Explore the Collection</h2>
        <p>Check out our latest drops and express your individuality.</p>
        <button onClick={() => (window.location.hash = "/shop")}>
          Shop Now
        </button>
      </div>
    </section>
  );
}
