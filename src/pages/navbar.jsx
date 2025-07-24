"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, User, ShoppingCart, Menu, X } from "lucide-react"
import { useNavigate } from "react-router-dom"


const Navbar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      <div className="nav-content">
        <motion.div
          className="logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          transition={{ type: "spring", stiffness: 400 }}
        >
          LAYERS
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          <a href="#" className="nav-link">
            Our Story
          </a>
          <motion.div
            className="nav-link"
            onClick={() => navigate("/Products")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ cursor: "pointer" }}
          >
            Collection
          </motion.div>
          <a href="#" className="nav-link">
            Smart Features
          </a>
          <a href="#" className="nav-link">
            Our Blog
          </a>
          <a href="#" className="nav-link">
            EN
          </a>
        </div>

        {/* Right Side Actions */}
        <div className="nav-actions">
          {/* Search */}
          <motion.button
            className="nav-icon-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="nav-icon" />
          </motion.button>

          {/* Profile/Login */}
          <motion.button
            className="nav-icon-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/LoginSignup")}
          >
            <User className="nav-icon" />
          </motion.button>

          {/* Cart */}
          <motion.button className="nav-icon-btn cart-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <ShoppingCart className="nav-icon" />
            <span className="cart-badge">2</span>
          </motion.button>

          {/* Buy Now Button */}
          <motion.button
            className="buy-now-btn"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0, 102, 255, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Buy Now
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="mobile-menu-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="nav-icon" /> : <Menu className="nav-icon" />}
          </motion.button>
        </div>
      </div>

      {/* Search Bar */}
      <motion.div
        className="search-bar"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isSearchOpen ? "auto" : 0,
          opacity: isSearchOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="search-content">
          <div className="search-input-container">
            <Search className="search-input-icon" />
            <input
              type="text"
              placeholder="Search for smartwatches, features, or accessories..."
              className="search-input"
            />
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <motion.div
        className="mobile-menu"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="mobile-menu-content">
          <a href="#" className="mobile-nav-link">
            Our Story
          </a>
          <a href="#" className="mobile-nav-link">
            Collection
          </a>
          <a href="#" className="mobile-nav-link">
            Smart Features
          </a>
          <a href="#" className="mobile-nav-link">
            Our Blog
          </a>
          <a href="#" className="mobile-nav-link">
            EN
          </a>
          <motion.button className="mobile-buy-btn" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Buy Now
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar
