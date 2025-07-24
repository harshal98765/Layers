import { useEffect, useRef } from "react";
import "../styles/Carousel.css";
import f1 from "../assets/f1.png";
import f2 from "../assets/f2.jpeg";
import f3 from "../assets/f3.jpeg";
import f4 from "../assets/f4.jpeg";
import f5 from "../assets/f5.jpg";

const images = [
   {
    src: f1,
    author: "LAYER",
    title: "ENGINEERED FOR PRECISION",
    topic: "High-Accuracy Quartz",
    // description: "Our timepieces are powered by advanced quartz movement to ensure unmatched accuracy in every tick."
  },
  {
    src: f2,
    author: "LAYER",
    title: "BUILT TO ENDURE",
    topic: "Scratch-Resistant Glass",
    // description: "Protected with sapphire-coated crystal, our watches resist everyday scratches and preserve clarity for years."
  },
  {
    src: f3,
    author: "LAYER",
    title: "ELEGANCE IN DESIGN",
    topic: "Minimalist Aesthetics",
    // description: "Crafted with clean lines and refined details, each watch represents a balance of simplicity and sophistication."
  },
  {
    src: f4,
    author: "LAYER",
    title: "READY FOR ANY WEATHER",
    topic: "Water Resistance",
    // description: "With up to 50M water resistance, your watch stays protected through rain, splashes, or swim-ready moments."
  },
  {
    src: f5,
    author: "LAYER",
    title: "LONG-LASTING POWER",
    topic: "Extended Battery Life",
    // description: "Designed to keep going, our watches offer battery life that lasts up to 3 years with zero compromises."
  }
];

function Carousel() {
  const nextRef = useRef(null);
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const thumbnailRef = useRef(null);
  const timeRef = useRef(null);

  let runTimeOut;
  let runNextAuto;

  useEffect(() => {
    const firstThumb = thumbnailRef.current.children[0];
    thumbnailRef.current.appendChild(firstThumb);

    runNextAuto = setTimeout(() => {
      nextRef.current.click();
    }, 7000);

    return () => {
      clearTimeout(runTimeOut);
      clearTimeout(runNextAuto);
    };
  }, []);

  const showSlider = (type) => {
    const SliderItemsDom = listRef.current.querySelectorAll(".item");
    const thumbnailItemsDom = thumbnailRef.current.querySelectorAll(".item");

    if (type === "next") {
      listRef.current.appendChild(SliderItemsDom[0]);
      thumbnailRef.current.appendChild(thumbnailItemsDom[0]);
      carouselRef.current.classList.add("next");
    } else {
      listRef.current.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
      thumbnailRef.current.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
      carouselRef.current.classList.add("prev");
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      carouselRef.current.classList.remove("next");
      carouselRef.current.classList.remove("prev");
    }, 3000);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
      nextRef.current.click();
    }, 7000);
  };

  return (
    <div>
      <div className="carousel" ref={carouselRef}>
        <div className="list" ref={listRef}>
          {images.map((item, i) => (
            <div className="item" key={i}>
              <img src={item.src} alt={`slide-${i}`} />
              <div className="content">
                <div className="author">{item.author}</div>
                <div className="title">{item.title}</div>
                <div className="topic">{item.topic}</div>
                <div className="des">{item.description}</div>
                <div className="buttons">
                  <button>SEE MORE</button>
                  <button>SUBSCRIBE</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="thumbnail" ref={thumbnailRef}>
          {images.map((item, i) => (
            <div className="item" key={i}>
              <img src={item.src} alt={`thumb-${i}`} />
              <div className="content">
                <div className="title">{item.title}</div>
                <div className="description">{item.topic}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="arrows">
          <button id="prev" onClick={() => showSlider("prev")}>
            {"<"}
          </button>
          <button id="next" ref={nextRef} onClick={() => showSlider("next")}>
            {">"}
          </button>
        </div>

        <div className="time" ref={timeRef}></div>
      </div>
    </div>
  );
}

export default Carousel;
