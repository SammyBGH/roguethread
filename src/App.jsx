import React from "react";
import "./styles/App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Lookbook from "./pages/Lookbook.jsx";
import Checkout from "./pages/Checkout.jsx";
import Admin from "./pages/Admin.jsx";
import Cart from "./pages/Cart.jsx";
import About from "./pages/About.jsx"; // ✅ new import

// super-lightweight internal router (no third-party)
function useHashRoute() {
  const [route, setRoute] = React.useState(
    window.location.hash.slice(1) || "/"
  );
  React.useEffect(() => {
    const onHash = () => setRoute(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return [route, (r) => (window.location.hash = r)];
}

export default function App() {
  const [route, navigate] = useHashRoute();
  return (
    <div className="app">
      <Header onNavigate={navigate} />
      {route === "/" && <Home onNavigate={navigate} />}
      {route === "/shop" && <Shop />}
      {route === "/lookbook" && <Lookbook />}
      {route === "/about" && <About />} {/* ✅ new route */}
      {route === "/checkout" && <Checkout />}
      {route === "/cart" && <Cart />}
      {route === "/admin" && <Admin />}
      <Footer onNavigate={navigate} />
    </div>
  );
}
