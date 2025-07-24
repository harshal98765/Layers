import React from "react";
import "../styles/Page3.css";
import GlitchText from "../components/GlitchText"; // Adjust path if needed
import vid1 from "../assets/vid1.webm";

const Page3 = () => {
  return (
    <div className="page3-container">
      <div className="page3-left">
        <h1>
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="glitch-inline"
          >
            FORGED IN STAINLESS STEEL
          </GlitchText>
        </h1>
        <p className="page3-description">
          Unmatched design and a functional crown with haptics that keeps up with
          you.
        </p>
        <hr className="page3-underline" />
      </div>

      <div className="page3-right">
        <video autoPlay muted loop className="page3-video">
          <source src={vid1} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Page3;
