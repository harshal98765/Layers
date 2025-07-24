"use client"
import { useState, useEffect } from "react"
import { ChevronRight, Search, Filter, ShoppingCart } from "lucide-react"
import "../styles/ProductsPage.css"
import Footer from "./Footer"
import Navbar from "./navbar"

import p1 from "../assets/p1.png"
import p2 from "../assets/p2.png"
import p3 from "../assets/p3.png"
import p4 from "../assets/p4.png"
import p5 from "../assets/p5.png"
import p6 from "../assets/p6.png"
import p7 from "../assets/p7.png"
import p8 from "../assets/p8.png"
import p9 from "../assets/p9.png"
import p10 from "../assets/p10.png"
import p12 from "../assets/p12.png"

const Products = () => {
  useEffect(() => {
    document.body.classList.add("Pproducts-page-body")
    return () => {
      document.body.classList.remove("Pproducts-page-body")
    }
  }, [])

  const [page, setPage] = useState(1)

  const watchData = [
    {
      id: 1,
      title: "Regency Royale Digital",
      price: 374.0,
      image: p1,
      slug: "regency-royale-digital",
    },
    {
      id: 2,
      title: "Elite Enigma Digital",
      price: 290.0,
      image: p2,
      slug: "elite-enigma-digital",
    },
    {
      id: 3,
      title: "Royal Crest Sovereign Signature",
      price: 320.0,
      image: p3,
      slug: "royal-crest-sovereign",
    },
    {
      id: 4,
      title: "Zenith Zephyr",
      price: 210.0,
      image: p4,
      slug: "zenith-zephyr",
    },
    {
      id: 5,
      title: "Regency Royale Digital",
      price: 374.0,
      image: p5,
      slug: "regency-royale-digital",
    },
    {
      id: 6,
      title: "Elite Enigma Digital",
      price: 290.0,
      image: p6,
      slug: "elite-enigma-digital",
    },
    {
      id: 7,
      title: "Royal Crest Sovereign Signature",
      price: 320.0,
      image: p7,
      slug: "royal-crest-sovereign",
    },
    {
      id: 8,
      title: "Zenith Zephyr",
      price: 210.0,
      image: p8,
      slug: "zenith-zephyr",
    },
    {
      id: 9,
      title: "Elite Enigma Digital",
      price: 290.0,
      image: p9,
      slug: "elite-enigma-digital",
    },
    {
      id: 10,
      title: "Royal Crest Sovereign Signature",
      price: 320.0,
      image: p10,
      slug: "royal-crest-sovereign",
    },
    {
      id: 11,
      title: "Zenith Zephyr",
      price: 210.0,
      image: p1,
      slug: "zenith-zephyr",
    },
    {
      id: 12,
      title: "Zenith Zephyr",
      price: 210.0,
      image: p12,
      slug: "zenith-zephyr",
    },
  ]

  return (
    <>
      <Navbar />

      <div className="products-page4">
        <div className="page-title4">
          <div className="container4">
            <div className="sub-title">UNIQUES</div>
            <h1 className="main-title">Latest Products</h1>
          </div>
        </div>

        <div className="page-data">
          <section className="products">
            <div className="container4">
              {/* Icons Row */}
              <div className="top-actions">
                <div className="action-icons">
                  <Search className="icon" />
                  <Filter className="icon" />
                  <ShoppingCart className="icon" />
                </div>
              </div>

              <div className="product-list">
                {watchData.map((watch) => (
                  <div key={watch.id} className="product-item">
                    <a href={`/product/${watch.slug}`} className="product-block">
                      <div className="product-img4">
                        <img src={watch.image} alt={watch.title} className="product-image" />
                      </div>
                      <div className="product-data">
                        <div className="product-title4">{watch.title}</div>
                        <div className="price-wrap">
                          <div>${watch.price.toFixed(2)} USD</div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              <div className="pagination">
                <button className="primary-btn next-btn" onClick={() => setPage(page + 1)}>
                  <div>Next</div>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>

          <h1 className="last">LAYERS</h1>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Products
