import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Intro from "./pages/Intro"
import Home from "./pages/Home"
import RibbonCursor from "./components/Ribbons"
import LoginSignup from "./pages/LoginSignup"
import Signup from "./pages/Signup"
import ProductsPage from "./pages/ProductsPage" // ✅ This is correct
import MainWatch from "./pages/MainWatch" // ✅ This is correct


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/LoginSignup" element={<LoginSignup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ProductsPage" element={<ProductsPage />} /> {/* ✅ Use the right component */}
        <Route path="/MainWatch" element={<MainWatch />} />
      </Routes>

      {/* Global ribbon cursor effect */}
      <RibbonCursor
        colors={["#0066ff"]}
        baseThickness={30}
        speedMultiplier={0.2}
        maxAge={500}
        enableFade={true}
        enableShaderEffect={true}
      />
    </Router>
  )
}

export default App
