"use client";

import React from "react";

const AboutPage = () => {
  return (
    <div className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center py-16 px-4"
         style={{ backgroundImage: "url('/images/hero1.jpg')" }}>
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <h1 className="relative text-5xl font-extrabold text-center text-white mb-12 z-10">
        About Us
      </h1>

      {/* Text Content */}
      <div className="relative bg-pastelPink bg-opacity-80 p-8 rounded-lg shadow-md mt-12 max-w-2xl text-center z-10">
        <p className="text-lg font-semibold text-white mb-6">
          Welcome to Sweet Shop, your one-stop destination for the finest sweets in town.
        </p>
        <p className="text-lg text-white mb-6">
          Our mission is to provide you with delicious treats made from the highest quality ingredients.
        </p>
        <p className="text-lg text-white">
          Thank you for choosing Sweet Shop. We look forward to serving you the best desserts in town!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
