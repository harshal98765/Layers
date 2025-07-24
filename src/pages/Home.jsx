"use client"
import "../styles/home.css"
import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "framer-motion"
import { Search, User, ShoppingCart, Menu, X } from "lucide-react"
import small from "../assets/small.png"
import ProductSection from "./product-section.jsx"
import ScrollVelocity from "../components/ScrollVelocity.jsx"
import Page3 from "./Page3.jsx"
import FlowingMenu from "../components/FlowingMenu"
import t1 from "../assets/t1.jpg"
import t2 from "../assets/t2.png"
import t3 from "../assets/t3.jpg"
import t4 from "../assets/t4.png"
import CircularGallery from "../components/CircularGallery.jsx"
import Carousel from "./Carousel.jsx"
import SmartwatchShowcase from "./SmartwatchShowcase.jsx"
import DesignComponent from "./DesignComponent.jsx"
import WatchPage from "./WatchPage.jsx"
import Lastsec from "./Lastsec.jsx"
import Footer from "./Footer.jsx"
import { useNavigate, Link } from "react-router-dom"

const LightRay = ({ delay, angle, length }) => {
  return (
    <motion.div
      className="light-ray"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "2px",
        height: `${length}px`,
        background: "linear-gradient(to top, rgba(0, 102, 255, 0.8), rgba(0, 102, 255, 0))",
        transformOrigin: "bottom center",
        transform: `translate(-50%, -100%) rotate(${angle}deg)`,
      }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{
        scaleY: [0, 1, 0.8, 1],
        opacity: [0, 1, 0.7, 1],
      }}
      transition={{
        duration: 2,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  )
}

const WatchLabel = ({ delay, position, title, description, direction = "right" }) => {
  return (
    <motion.div
      className={`watch-label ${direction}`}
      style={{
        position: "absolute",
        ...position,
      }}
      initial={{ opacity: 0, scale: 0.8, x: direction === "right" ? -20 : 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeOut",
      }}
    >
      <motion.div
        className="label-line"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.6,
          delay: delay + 0.2,
          ease: "easeOut",
        }}
      />
      <motion.div
        className="label-content"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: delay + 0.4,
          ease: "easeOut",
        }}
      >
        <div className="label-title">{title}</div>
        <div className="label-description">{description}</div>
      </motion.div>
    </motion.div>
  )
}

const Home = () => {
  useEffect(() => {
    document.body.classList.add("home-page-body")
    return () => {
      document.body.classList.remove("home-page-body")
    }
  }, [])

  const navigate = useNavigate()
  const items = [
    {
      image: "https://picsum.photos/300/300?grayscale",
      link: "https://google.com/",
      title: "Item 1",
      description: "This is pretty cool, right?",
    },
    {
      image: "https://picsum.photos/400/400?grayscale",
      link: "https://google.com/",
      title: "Item 2",
      description: "This is pretty cool, right?",
    },
    {
      image: "https://picsum.photos/500/500?grayscale",
      link: "https://google.com/",
      title: "Item 3",
      description: "This is pretty cool, right?",
    },
    {
      image: "https://picsum.photos/600/600?grayscale",
      link: "https://google.com/",
      title: "Item 4",
      description: "This is pretty cool, right?",
    },
  ]

  const flowingMenuItems = [
    {
      link: "#model1",
      text: "Powerfull",
      image: t1,
    },
    {
      link: "#model2",
      text: "Accurate",
      image: t2,
    },
    {
      link: "#model3",
      text: "Unique",
      image: t3,
    },
    {
      link: "#model4",
      text: "Next-gen Interface",
      image: t4,
    },
  ]

  const [showOverlay, setShowOverlay] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowOverlay(false)
    }, 1300)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Generate light rays - more focused upward
  const lightRays = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    angle: i * 22.5 + Math.random() * 5, // More evenly distributed
    length: 120 + Math.random() * 80,
    delay: i * 0.08,
  }))

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="transition-overlay"
            initial={{ opacity: 1, scale: 1.2 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.3,
              ease: "easeInOut",
            }}
          />
        )}
      </AnimatePresence>

      {/* Add custom-cursor-area class to hide default cursor in main content */}
      <div className="home-container custom-cursor-area" ref={containerRef}>
        {/* Enhanced Navigation */}
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
                onClick={() => navigate("/ProductsPage")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                Collection
              </motion.div>
              <a href="#flowing-menu" className="nav-link">
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
              <Link to="/mainwatch">
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
    </Link>

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
              <motion.div
                className="nav-link"
                onClick={() => navigate("/ProductsPage")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                Collection
              </motion.div>
              <a href="#" className="mobile-nav-link">
                Smart Features
              </a>
              <a href="#" className="mobile-nav-link">
                Our Blog
              </a>
              <a href="#" className="mobile-nav-link">
                EN
              </a>
              <Link to="/mainwatch">
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
    </Link>
            </div>
          </motion.div>
        </motion.nav>

        {/* Hero Section */}
        <motion.div className="hero-section" style={{ y, opacity }}>
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              NEXT-GENERATION SMARTWATCHES
            </motion.p>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.4 }}
            >
              INCOMPARABLE TIMEPIECES
            </motion.h1>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.6 }}
            >
              Layers smartwatches aren't ordinary — they're crafted classics. Timeless. Exceptional. Join the legacy. Be
              an ambassador.
            </motion.p>
            <motion.button
              className="cta-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.8 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0, 102, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Discover Models →
            </motion.button>
          </motion.div>

          {/* Watch Display */}
          <motion.div
            className="watch-display"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 3 }}
          >
            {/* Light Rays */}
            {/* <div className="light-rays-container">
              {lightRays.map((ray) => (
                <LightRay key={ray.id} delay={ray.delay + 3.5} angle={ray.angle} length={ray.length} />
              ))}
            </div> */}

            {/* Watch Image */}
            <motion.div
              className="watch-image-container"
              animate={{
                rotateY: [0, 5, -5, 0],
                rotateX: [0, 2, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                transform: `rotateY(${(mousePosition.x / window.innerWidth - 0.5) * 10}deg) rotateX(${-(mousePosition.y / window.innerHeight - 0.5) * 5}deg)`,
              }}
            >
              <Link to="/MainWatch">
                <img src={small || "/placeholder.svg"} alt="Layers Smartwatch" className="watch-image" />
              </Link>

              
              <WatchLabel
                delay={4.5}
                position={{ top: "-10%", right: "-210px" }}
                title="700 NITS"
                description="Bright Display"
                direction="right"
              />
              <WatchLabel
                className="watch-label"
                delay={5}
                position={{ top: "20%", left: "-270px" }}
                title="60 HZ"
                description="Refresh Rate"
                direction="left"
              />
              <WatchLabel
                delay={5.5}
                position={{ bottom: "60%", right: "-330px" }}
                title="METALLIC"
                description="Premium Body"
                direction="right"
              />
            </motion.div>

            {/* Glow Effect */}
            <motion.div
              className="watch-glow"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 4 }}
        >
          <motion.div
            className="scroll-line"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        <ProductSection />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <ScrollVelocity texts={["React Bits", "Scroll Down"]} velocity={100} className="custom-scroll-text" />
        </motion.div>
        <Page3 />
        <div style={{ height: "500px", position: "relative" }}>
          <FlowingMenu items={flowingMenuItems} />
        </div>
        <SmartwatchShowcase />
        <div style={{ height: "600px", position: "relative" }}>
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} />
        </div>
        <Carousel />
        <DesignComponent />
        <WatchPage />
        <Lastsec />
        <Footer />
      </div>
    </>
  )
}

export default Home
