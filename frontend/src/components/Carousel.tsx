import { useState } from "react";

const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div style={{ position: "relative", maxWidth: "600px", margin: "auto" }}>
      {/* Boutons de navigation */}
      <button
        onClick={handlePrev}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          zIndex: 1,
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          cursor: "pointer",
          padding: "10px",
          borderRadius: "50%",
        }}
      >
        ◀
      </button>

      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          zIndex: 1,
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          cursor: "pointer",
          padding: "10px",
          borderRadius: "50%",
        }}
      >
        ▶
      </button>

      {/* Image actuelle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          overflow: "hidden",
          border: "1px solid #ccc",
        }}
      >
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Points de navigation */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "10px",
              height: "10px",
              margin: "0 5px",
              background: index === currentIndex ? "black" : "#ccc",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
