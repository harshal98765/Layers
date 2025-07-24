import { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import "../styles/ScrollVelocity.css";

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setWidth(ref.current.offsetWidth);
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [ref]);

  return width;
}

const VelocityText = ({
  children,
  baseVelocity = 50,
  scrollContainerRef,
  className = "",
  damping = 60,
  stiffness = 250,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 4] },
  parallaxClassName = "parallax",
  scrollerClassName = "scroller",
  parallaxStyle,
  scrollerStyle,
}) => {
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping,
    stiffness,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false }
  );

  const copyRef = useRef(null);
  const copyWidth = useElementWidth(copyRef);

  function wrap(min, max, v) {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, (v) =>
    copyWidth === 0 ? "0px" : `${wrap(-copyWidth, 0, v)}px`
  );

  const directionFactor = useRef(1);
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={parallaxClassName} style={parallaxStyle}>
      <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <span key={i} className={className} ref={i === 0 ? copyRef : null}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const ScrollVelocity = (props) => {
  return (
    <section>
      <VelocityText {...props}>
        LAYERS&nbsp;
      </VelocityText>
    </section>
  );
};

export default ScrollVelocity;
