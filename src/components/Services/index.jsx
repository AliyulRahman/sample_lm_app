import { useEffect, useState } from "react";
import { getServices, getServiceImages } from "../../models/services";
import "./Services.css";

export default function Services() {
  const [services, setServices] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setServices(getServices());
    setSliderImages(getServiceImages());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderImages]);

  return (
    <div className="services-page">
      <h2 className="page-title">Our Services</h2>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <img
              src={service.image}
              alt={service.title}
              className="service-image"
            />
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>

      <h2 className="slider-title">Reviews</h2>
      <div className="slider-container">
        {sliderImages.length > 0 && (
          <img
            src={sliderImages[currentSlide].image}
            alt={`Slide ${currentSlide + 1}`}
            className="slider-image"
          />
        )}
        <div className="slider-dots">
          {sliderImages.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
