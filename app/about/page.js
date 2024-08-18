"use client";

import React from "react";

const AboutPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 mt-6 md:mt-6 lg:mt-6">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: 'url("/images/pattern.jpg")',
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Blur overlay */}
      <div
        className="absolute inset-0  "
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl font-bold font-script text-center text-pgreen mb-12">
          About Us
        </h1>

        <div className="bg-white text-pgreen bg-opacity-40 p-8 rounded-lg shadow-md mt-12 max-w-2xl text-center">
          <p className="text-lg font-semibold text-pgreen mb-6">
            Welcome to Sweet Shop, your one-stop destination for the finest sweets
            in town.
          </p>
          <p className="text-lg mb-6">
            Our mission is to provide you with delicious treats made from the
            highest quality ingredients.
          </p>
          <p className="text-lg">
            Thank you for choosing Sweet Shop. We look forward to serving you the
            best desserts in town!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
