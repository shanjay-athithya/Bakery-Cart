"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CustomSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const images = [
    "/images/pakada.jpg",
    "/images/mysur.jpg",
    "/images/drink.jpg",
    "/images/m2.jpg",
    "/images/hero5.jpeg",
    
    
  ];
  const router = useRouter();

  const nextSlide = () => {
    if (currentIndex === images.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 600);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleViewMenuClick = () => {
    router.push("/menu");
  };

  return (
    <section className="relative h-screen overflow-hidden mt-5 md:mt-5 lg:mt-5">
      <div className="absolute inset-0 flex">
        <div
          className="flex w-full h-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? "transform 0.6s ease-in-out" : "none",
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50 blur-sm"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10"></div>
      <div className="absolute inset-0 flex items-center justify-center z-20 text-center">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-7xl font-extrabold text-byellow leading-tight mb-4 drop-shadow-lg">
            Delight in Every Bite
          </h1>
          <p className="text-xl md:text-2xl font-light text-white mb-8 drop-shadow-md">
            Discover the sweetest treats in town
          </p>
          <button
            onClick={handleViewMenuClick}
            className="px-8 py-4 bg-byellow text-pred font-bold font-script rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pastelPink focus:ring-opacity-50"
          >
            View Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomSlider;
