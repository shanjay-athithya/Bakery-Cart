"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

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
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-pastelPink shadow-lg' : 'bg-transparent'} ${isScrolled ? 'text-white' : 'text-pastelYellow'}`}>
      <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-script">Sweet Shop</div>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className={`hover:text-pastelPink transition-colors ${isScrolled ? 'text-white' : 'text-pastelYellow'}`}>Home</Link>
          <Link href="/menu" className={`hover:text-pastelPink transition-colors ${isScrolled ? 'text-white' : 'text-pastelYellow'}`}>Menu</Link>
          <Link href="/about" className={`hover:text-pastelPink transition-colors ${isScrolled ? 'text-white' : 'text-pastelYellow'}`}>About Us</Link>
          <Link href="/contact" className={`hover:text-pastelPink transition-colors ${isScrolled ? 'text-white' : 'text-pastelYellow'}`}>Contact</Link>
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
          <Link href="/" className="hover:text-pastelYellow transition-colors" onClick={toggleMenu}>Home</Link>
          <Link href="/menu" className="hover:text-pastelYellow transition-colors" onClick={toggleMenu}>Menu</Link>
          <Link href="/about" className="hover:text-pastelYellow transition-colors" onClick={toggleMenu}>About Us</Link>
          <Link href="/contact" className="hover:text-pastelYellow transition-colors" onClick={toggleMenu}>Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
