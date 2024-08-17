"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiHome, FiCoffee, FiInfo, FiMail } from 'react-icons/fi';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-pgreen shadow-lg' : 'bg-transparent'} ${isScrolled ? 'text-pyellow' : 'text-pgreen'}`}>
      <nav className="max-w-7xl mx-auto p-5 flex justify-between items-center">
        {/* Shop Name with Profile Picture */}
        <div className="flex items-center space-x-4">
          {/* Profile Picture */}
          <img 
            src="images/icon.jpg" 
            alt="Profile Picture" 
            className="w-12 h-12 rounded-full object-cover" // Adjust the size as needed
          />
          <div className="text-2xl font-script">Golden Pakkada</div>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <Link href="/" className={`hover:text-pyellow transition-colors flex items-center ${isScrolled ? 'text-white' : 'text-pgreen'}`}>
            <FiHome className="mr-2" /> Home
          </Link>
          <Link href="/menu" className={`hover:text-pyellow transition-colors flex items-center ${isScrolled ? 'text-white' : 'text-pgreen'}`}>
            <FiCoffee className="mr-2" /> Menu
          </Link>
          <Link href="/about" className={`hover:text-pyellow transition-colors flex items-center ${isScrolled ? 'text-white' : 'text-pgreen'}`}>
            <FiInfo className="mr-2" /> About Us
          </Link>
          <Link href="/contact" className={`hover:text-pyellow transition-colors flex items-center ${isScrolled ? 'text-white' : 'text-pgreen'}`}>
            <FiMail className="mr-2" /> Contact
          </Link>
        </div>
        
        <div className="md:hidden">
          <button onClick={toggleMenu} className={`text-3xl focus:outline-none ${isScrolled ? 'text-white' : 'text-pastelYellow'}`}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-pastelPink text-white`}>
        <nav className="flex flex-col items-center py-4 space-y-4">
          <Link href="/" className="hover:text-pastelYellow transition-colors flex items-center" onClick={toggleMenu}>
            <FiHome className="mr-2" /> Home
          </Link>
          <Link href="/menu" className="hover:text-pastelYellow transition-colors flex items-center" onClick={toggleMenu}>
            <FiCoffee className="mr-2" /> Menu
          </Link>
          <Link href="/about" className="hover:text-pastelYellow transition-colors flex items-center" onClick={toggleMenu}>
            <FiInfo className="mr-2" /> About Us
          </Link>
          <Link href="/contact" className="hover:text-pastelYellow transition-colors flex items-center" onClick={toggleMenu}>
            <FiMail className="mr-2" /> Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
