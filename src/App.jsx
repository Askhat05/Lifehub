import "./App.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { drinks } from "./data";
import { FiShoppingCart } from "react-icons/fi";

export default function App() {
  const [index, setIndex] = useState(0);

  const drink = drinks[index];

  const next = () => {
    setIndex((index + 1) % drinks.length);
  };

  const prev = () => {
    setIndex((index - 1 + drinks.length) % drinks.length);
  };
  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">Splash.</div>

        <div className="menu">
          <a href="#home" className="active">
            Home
          </a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <a href="#products" className="icons">
          <FiShoppingCart />
        </a>
      </header>

      <section
        id="home"
        className="hero"
        style={{
          background: `linear-gradient(135deg, ${drink.color}, #1e1e1e)`,
        }}
      >
        <div className="circle one"></div>
        <div className="circle two"></div>

        <AnimatePresence mode="wait">
          <motion.h1
            key={drink.name}
            className="bg-title"
            initial={{ opacity: 0, y: 80, scale: 0.8 }}
            animate={{ opacity: 0.12, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.7 }}
          >
            {drink.name}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.img
            key={drink.image}
            src={drink.image}
            className="drink"
            initial={{ scale: 0.4, rotate: -25, opacity: 0 }}
            animate={{
              scale: 1,
              rotate: 0,
              opacity: 1,
              y: [-10, 10, -10],
            }}
            exit={{
              opacity: 0,
              rotate: 25,
              scale: 0.5,
            }}
            transition={{
              duration: 0.8,
              y: {
                repeat: Infinity,
                duration: 5,
              },
            }}
          />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={drink.id}
            className="hero-info"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
          >
            <p>Summer Collection</p>

            <h2>{drink.subtitle}</h2>

            <span>{drink.price}</span>

            <button className="btn">Order Now</button>
          </motion.div>
        </AnimatePresence>

        <div className="slider-controls">
          <button onClick={prev}>←</button>

          <span>{String(index + 1).padStart(2, "0")} / 04</span>

          <button onClick={next}>→</button>
        </div>
      </section>

      <section id="products" className="products">
        <h2>Popular Cocktails</h2>

        <div className="cards">
          {drinks.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.image} />

              <h3>{item.name}</h3>

              <p>{item.price}</p>

              <button className="btn">View</button>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="about">
        <div className="about-left">
          <p className="about-tag">ABOUT US</p>

          <h2>Crafted for Summer.</h2>

          <p className="about-text">
            Every cocktail is made from fresh fruits and premium ingredients. We
            focus on taste, beautiful presentation and unforgettable summer
            vibes.
          </p>

          <button className="btn">Explore Menu</button>
        </div>

        <div className="about-right">
          <div className="feature">
            <span>🍓</span>
            <div>
              <h3>Fresh Fruits</h3>
              <p>Natural ingredients every day.</p>
            </div>
          </div>

          <div className="feature">
            <span>🥤</span>
            <div>
              <h3>Premium Drinks</h3>
              <p>Unique recipes with perfect balance.</p>
            </div>
          </div>

          <div className="feature">
            <span>⚡</span>
            <div>
              <h3>Fast Service</h3>
              <p>Ready in just a few minutes.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Visit Splash.</h2>

        <p>Open every day 10:00 - 22:00</p>

        <button className="btn">Order Now</button>
      </section>

      <footer>
        <p>© 2026 Splash. All rights reserved.</p>

        <div>
          <a href="#">Instagram</a>

          <a href="#">TikTok</a>

          <a href="#">Facebook</a>
        </div>
      </footer>
    </div>
  );
}
