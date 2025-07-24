"use client"

import { useState,useEffect } from "react"
import "../styles/MainWatch.css"
import Footer from "./Footer"
import Navbar from "./navbar"
import main from "../assets/main.png"
import boss from "../assets/boss.png"
import z1 from "../assets/z1.png"
import z2 from "../assets/z2.png"
import z3 from "../assets/z3.png"
import z4 from "../assets/z4.png"
import z5 from "../assets/z5.png"
import z6 from "../assets/z6.png"

const ProductPage = () => {
  useEffect(() => {
  document.body.classList.add("Main-page-body");

  return () => {
    document.body.classList.remove("Main-page-body");
  };
}, []);

  const [quantity, setQuantity] = useState(1)

  return (
    <>
    <Navbar />
    <div className="product-container1">
      <div className="product-layout">
        {/* Product Image Section */}
        <div className="product-image-section">
          <div className="product-image-container">
            <img
              src={main}
              alt="Celestial Majesty Timekeeper Elite"
              className="product-image6"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="product-details-section">
          <h1 className="product-title">Celestial Majesty Timekeeper Elite</h1>

          <div className="product-price">$ 395.00 USD</div>

          <div className="product-specs">
            <div className="spec-item">
              <span className="spec-label">Brand Material:</span>
              <span className="spec-value">Silicon Strap</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Case Shape:</span>
              <span className="spec-value">Octagonal</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Display Type:</span>
              <span className="spec-value">Analog</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Water Resistant:</span>
              <span className="spec-value">3 ATM</span>
            </div>
          </div>

          <div className="warranty-info">• 3 year warranty on just dial defects only.</div>

          <div className="purchase-section">
            <div className="quantity-section">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                className="quantity-input"
              />
            </div>
            <button className="add-to-cart-btn">Add to Cart 🛒</button>
          </div>

          <div className="product-meta">
            <div className="sku">
              <span className="meta-label">SKU:</span>
              <span className="meta-value">WT-785-K21</span>
            </div>
            <div className="categories">
              <span className="meta-label">Categories:</span>
              <span className="meta-value">Skeleton Watches</span>
            </div>
          </div>
        </div>
      </div>
    </div>
   <div className="boss">
  <img src={boss} alt="Boss Watch" />
  <div className="boss-text">Designed to be different</div>
</div>

<div className="aunty">
  <h2>Product Description</h2>
  <p>
    Elevate your wristwear collection with the exquisite <strong>Wristy</strong>. Crafted with precision and attention to detail, this stunning timepiece effortlessly blends timeless elegance with modern sophistication. With its water-resistant design and durable construction, the Wristy is built to withstand the rigors of everyday wear. Plus, with a 01-year warranty, you can enjoy peace of mind knowing your investment is protected.
  </p>

  <h3>Key Highlights:</h3>
  <ul>
    <li><strong>Elegant Design:</strong> Stainless steel case with a sleek black dial for a classic yet modern look.</li>
    <li><strong>Functional Features:</strong> Includes chronograph functionality and a date window at the 4 o'clock position.</li>
    <li><strong>Built to Last:</strong> Water-resistant and backed by a 1-year warranty for reliable everyday wear.</li>
  </ul>
</div>

<div className="watch-section5">
  <h2>Static. Dynamic. Analogue.  <span>#watchwonders</span></h2>
  <p>
    #Capture your wristwear adventures and become part of our watch community! 
  </p>
  <div className="watch-gallery5">
    <img src={z1} alt="watch1" />
    <img src={z2} alt="watch2" />
    <img src={z3} alt="watch3" />
    <img src={z4} alt="watch4" />
    <img src={z5} alt="watch5" />
    <img src={z6} alt="watch6" />
  </div>
</div>


    <Footer />
    </>
  )
}

export default ProductPage
