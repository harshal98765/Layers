import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TrueFocus from "./TrueFocus";
import "../styles/product-section.css";
import watchesImage from "../assets/w2.png";
import CircularText from "../components/circular-text";

export default function ProductSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="product-section">
      <div className="circular-text-product">
        <CircularText
          text="LAYERS*LAYERS*LAYERS*"
          onHover="speedUp"
          spinDuration={20}
          className="custom-class"
          style={{ fontSize: "8px" }}
          size={30}
        />
      </div>

      <div className="product-container">
        <div className="product-content">
          {/* Left: Text */}
          <div className="text-content">
            <h1 className={`main-heading ${isVisible ? "animate-in" : ""}`}>
              {isVisible ? (
                <>
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
                    className="blur-text"
                  >
                    DESIGNED IN LONDON.
                  </motion.span>
                  <br />
                  <div className="truefocus-wrapper">
                    <TrueFocus
                      sentence="MADE FOR INDIA."
                      manualMode={false}
                      blurAmount={5}
                      borderColor="#210978"
                      animationDuration={2}
                      pauseBetweenAnimations={1}
                    />
                  </div>
                </>
              ) : (
                <>
                  <span className="blur-text">DESIGNED IN LONDON.</span>
                  <br />
                  <span className="blur-text highlight-india">
                    MADE FOR INDIA.
                  </span>
                </>
              )}
            </h1>

            <p className={`subtitle ${isVisible ? "animate-in delay-300" : "show"}`}>
              Beauty and geometry converge in perfect harmony to create Anarc's
              distinctive octagonal dial. Each timepiece represents a fusion of
              British design excellence and Indian craftsmanship, embodying
              precision, elegance, and cultural sophistication in every detail.
            </p>

            <div className={`decorative-line ${isVisible ? "animate-in delay-500" : ""}`}>
              <div className="line"></div>
            </div>
          </div>

          {/* Right: Image */}
          <div className={`image-content ${isVisible ? "animate-in-right delay-200" : ""}`}>
            <div className="image-wrapper">
              <img
                src={watchesImage}
                alt="Two luxury smartwatches with octagonal design"
                className="product-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
