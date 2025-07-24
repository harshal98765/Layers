"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import "../styles/ScrollWatch.css";
import v1 from "../assets/v1.webm";
import v2 from "../assets/v2.webm";
import v3 from "../assets/v3.webm";

const sectionsData = [
  {
    video: v1,
    leftText: {
      title: "Precision Engineering",
      description:
        "Crafted with meticulous attention to detail, every component represents the pinnacle of horological excellence.",
    },
    rightText: {
      title: "Timeless Design",
      description:
        "A perfect fusion of classic aesthetics and contemporary innovation, designed to transcend generations.",
    },
  },
  {
    video: v2,
    leftText: {
      title: "Swiss Movement",
      description:
        "Powered by authentic Swiss mechanical movement, ensuring unparalleled accuracy and reliability.",
    },
    rightText: {
      title: "Luxury Materials",
      description:
        "Premium stainless steel case with sapphire crystal glass, built to withstand the test of time.",
    },
  },
  {
    video: v3,
    leftText: {
      title: "Heritage Collection",
      description:
        "Part of our exclusive heritage series, representing decades of watchmaking tradition and expertise.",
    },
    rightText: {
      title: "Limited Edition",
      description:
        "Only 500 pieces worldwide. Own a piece of horological history with this exclusive timepiece.",
    },
  },
];

const ScrollWatch = () => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const section = Math.floor(progress * sectionsData.length);
    setCurrentSection(Math.min(section, sectionsData.length - 1));
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0.8, 1, 1, 1.2]
  );
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <div className="scroll-watch-page">
      <div ref={containerRef} className="scroll-watch-container">
        <div className="scroll-watch-content">
          <div className="watch-section-container">
            {/* Left Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${currentSection}`}
                className="watch-text-block watch-left-text"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2>{sectionsData[currentSection].leftText.title}</h2>
                <p>{sectionsData[currentSection].leftText.description}</p>
              </motion.div>
            </AnimatePresence>

            {/* Image or Video */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`media-${currentSection}`}
                className="watch-image-block"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {sectionsData[currentSection].video ? (
                  <motion.video
                    key={`video-${currentSection}`}
                    src={sectionsData[currentSection].video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="watch-main-image"
                    style={{
                      scale: imageScale,
                      rotate: imageRotate,
                    }}
                  />
                ) : (
                  <motion.img
                    key={`image-${currentSection}`}
                    src={sectionsData[currentSection].image}
                    alt={`Watch ${currentSection + 1}`}
                    className="watch-main-image"
                    style={{
                      scale: imageScale,
                      rotate: imageRotate,
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Right Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${currentSection}`}
                className="watch-text-block watch-right-text"
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 60, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2>{sectionsData[currentSection].rightText.title}</h2>
                <p>{sectionsData[currentSection].rightText.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Dots */}
          <div className="watch-progress-indicator">
            {sectionsData.map((_, idx) => (
              <div
                key={idx}
                className={`watch-progress-dot ${
                  currentSection === idx ? "active" : ""
                }`}
              />
            ))}
          </div>

          {/* Scroll Hint */}
          <motion.div
            className="watch-scroll-hint"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="watch-scroll-arrow">↓</div>
            <span>Scroll to explore</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScrollWatch;
