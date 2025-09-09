import React, { useState, useEffect } from "react";
import "../styles/Newsletter.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fade, setFade] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter an email.");
      setFade(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
      setFade(false);
      setEmail("");
    } catch (err) {
      setMessage("Error subscribing. Please try again.");
      setFade(false);
    }
  };

  // Auto fade-out after 3s
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setFade(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <section className="home__newsletter">
      <h2>Stay in the Loop</h2>
      <p>Subscribe for early drops, exclusive offers, and brand updates.</p>
      <form className="newsletter__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>

      {message && (
        <p className={`newsletter__message ${fade ? "fade-out" : ""}`}>
          {message}
        </p>
      )}
    </section>
  );
}
