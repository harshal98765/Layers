import React from 'react';
import '../styles/SmartwatchShowcase.css'; // Assuming you have a CSS file for styles
import v1 from '../assets/v1.webm';
import v2 from '../assets/v2.webm';
import v3 from '../assets/v3.webm';

const SmartwatchShowcase = () => {
  return (
    <div className="showcase-wrapper">
      <div className="text-section">
        <h1>
          Flagship chipset that’s<br />
          <span className="highlight">high on performance.</span>
        </h1>
        <p>For a seamless experience as you transition from work to play and everything in between.</p>
      </div>

      <div className="video-section">
        <div className="watch-video">
          <video src= {v1} autoPlay loop muted playsInline />
        </div>
        <div className="watch-video">
          <video src={v2} autoPlay loop muted playsInline />
        </div>
        <div className="watch-video">
          <video src={v3} autoPlay loop muted playsInline />
        </div>
      </div>
    </div>
  );
};

export default SmartwatchShowcase;
