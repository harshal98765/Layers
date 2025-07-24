import '../styles/lastsec.css';
import c1 from '../assets/c1.png';
import c2 from '../assets/c2.jpg';
import c3 from '../assets/c3.jpg';
import GQ from '../assets/GQ_Logo.png';
import VOGUE from '../assets/VOGUE_Logo.png';

function App() {
  return (
    <div className="container7">
      <header>
        <h1>Chaotic Essentials</h1>
      </header>
      
      <div className="products-grid1">
        <div className="product-card1">
          <div className="product-image1">
            <img src={c1} alt="Mobile Skins" />
          </div>
          <div className="product-info">
            <h2>Mobile Skins</h2>
            <p>Express your style with unique phone cases.</p>
          </div>
        </div>
        
        <div className="product-card1">
          <div className="product-image1">
            <img src={c2} alt="Arc Straps" />
          </div>
          <div className="product-info">
            <h2>Arc Straps</h2>
            <p>Straps that match your vibe.</p>
          </div>
        </div>
        
        <div className="product-card1">
          <div className="product-image1">
            <img src={c3} alt="Laptop/Tablet Skins" />
          </div>
          <div className="product-info">
            <h2>Laptop/Tablet Skins</h2>
            <p>Style your laptop or tablet effortlessly.</p>
          </div>
        </div>
      </div>
      
      <div className="featured-section">
        <h2>Featured In</h2>
        <div className="featured-logos">
          <div className="logo">
            <img src={GQ} alt="GQ Logo" />
          </div>
          <div className="logo">
            <img src={VOGUE} alt="VOGUE Logo" />
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;