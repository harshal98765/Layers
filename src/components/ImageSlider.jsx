// src/components/ImageSlider.jsx
import React from "react";
import "../styles/ImageSlider.css"; // Ensure you have the correct path to your CSS file
import img1 from "../assets/f1.png";
import img2 from "../assets/f2.jpeg";
import img3 from "../assets/f3.jpeg";
import img4 from "../assets/f4.jpeg";
import img5 from "../assets/f5.jpg";

const ImageSlider = () => {
  return (
    <div className="slider-wrapper">
      <section className="slide-option">
        <div className="container">
          <h3 className="no-marg">Slide start to finish infinite loop</h3>
        </div>
        <div id="stffull" className="highway-slider">
          <div className="container highway-barrier">
            <ul className="highway-lane">
              <li className="highway-car" id="red">
                <img src={img1} alt="Slide 1" />
              </li>
              <li className="highway-car" id="orange">
                <img src={img2} alt="Slide 2" />
              </li>
              <li className="highway-car" id="yellow">
                <img src={img3} alt="Slide 3" />
              </li>
              <li className="highway-car" id="green">
                <img src={img4} alt="Slide 4" />
              </li>
              <li className="highway-car" id="blue">
                <img src={img5} alt="Slide 5" />
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="slide-option">
        <div className="container">
          <h3 className="no-marg">Closed infinite loop</h3>
        </div>
        <div id="infinite" className="highway-slider">
          <div className="container highway-barrier">
            <ul className="highway-lane">
              {[
                img1, img2, img3, img4, img5,
                img1, img2, img3, img4, img5
              ].map((img, index) => (
                <li className="highway-car" key={index}>
                  <img src={img} alt={`Slide ${index + 1}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImageSlider;
