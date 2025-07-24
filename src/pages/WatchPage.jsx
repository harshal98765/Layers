import '../styles/WatchPage.css';
import h1 from '../assets/h1.png';
import { useNavigate } from "react-router-dom"; 

function SmartWatchPage() {
  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    navigate("/mainwatch");
  };
  return (
    <div className="watch-container">
      <div className="watch-content">
        <h1 className="watch-heading">
          Are you ready to be<br />
          an agent of chaos?
        </h1>
        
        <div className="watch-showcase">
          <img 
            src={h1}
            alt="Smartwatch" 
            className="watch-image1" 
          />
        </div>
        
        <div className="watch-cta">
          <button className="buy-button" onClick={handleBuyNowClick}>
            Buy Now at ₹ 6849/-
          </button>
        </div>
      </div>
    </div>
  );
}

export default SmartWatchPage;