import React, { useState } from "react";
import "../styles/intro.css";
import LightRays from "../components/LightRays"; // Adjust the import path as necessary
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import clickSound from "../assets/click.mp3";

const Intro = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    new Audio(clickSound).play();

    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  return (
    <section className="body-intro">
      <section className="intro-section2">
       

        {/* LightRays background layer */}
        <div className="light-rays-wrapper">
          <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>

        <h1 className="animated-heading">
          {"LAYERS".split("").map((char, i) => (
            <span
              key={i}
              style={{
                animationDelay: `${2 + i * 0.25}s`,
                color: char === "L" || char === "E" ? "#186aa0" : "#fff",
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        <motion.button
          className="be-ready-button"
          onClick={handleClick}
          disabled={isAnimating}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          BE READY
        </motion.button>

        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className="transition-overlay"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </section>
    </section>
  );
};

export default Intro;
