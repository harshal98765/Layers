import '../styles/DesignComponent.css';
import ChaosImage from '../assets/founder.png'; // Replace with your image path
import owner1 from '../assets/ownwer1.png';

const DesignComponent = () => {
  return (
    <>
 
    <section className="chaos-section">
      <div className="chaos-container">
        
        <div className="image-wrapper">
          <img src={ChaosImage} alt="Chaos Art" className="chaos-image" />
        </div>
       <div className="Owner">
          <img src={owner1} alt="Chaos Art" className="OwnerPage" />
        </div>
        
        <div className="chaos-content">
          <div className="quote-mark"></div>
          <h1 className="chaos-text">LAYERS</h1>
          <p className="chaos-text">
            Without chaos there would be no innovation. <br />
            Without chaos there would be no new ideas of greatness.<br/>
            Chaos unsettles those who can’t deal with it. We chase it.
          </p>
          <div className="signature">
            Neel & Shick, Co-founders of Layers
          </div>
        </div>
        
      </div>
       
    </section>
    </>
  );
};

export default DesignComponent;
