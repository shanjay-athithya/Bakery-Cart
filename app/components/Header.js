"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiHome, FiCoffee, FiInfo, FiMail, FiLogIn, FiLogOut } from 'react-icons/fi';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import SignInForm from './SignInForm'; // Import the SignInForm component

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInFormOpen, setIsSignInFormOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-pgreen shadow-lg' : 'bg-pgreen'} ${isScrolled ? 'text-byellow' : 'text-byellow'}`}>
      <nav className="max-w-7xl mx-auto p-5 flex justify-between items-center">
        
        <div className="flex items-center space-x-4">
          {/* Profile Picture */}
          <img 
            src="images/icon.jpg" 
            alt="Profile Picture" 
            className="w-12 h-12 rounded-full object-cover" // Adjust the size as needed
          />
          <div className="text-2xl font-bold font-script">Golden Pakkada</div>
        </div>
        
        <div className="hidden md:flex space-x-6 font-semibold">
          <Link href="/" className={`hover:text-white transition-colors flex items-center ${isScrolled ? 'text-byellow' : 'text-byellow'}`}>
            <FiHome className="mr-2" /> Home
          </Link>
          <Link href="/menu" className={`hover:text-white transition-colors flex items-center ${isScrolled ? 'text-byellow' : 'text-byellow'}`}>
            <FiCoffee className="mr-2" /> Menu
          </Link>
          <Link href="/about" className={`hover:text-white transition-colors flex items-center ${isScrolled ? 'text-byellow' : 'text-byellow'}`}>
            <FiInfo className="mr-2" /> About Us
          </Link>
          <Link href="/contact" className={`hover:text-white transition-colors flex items-center ${isScrolled ? 'text-byellow' : 'text-byellow'}`}>
            <FiMail className="mr-2" /> Contact
          </Link>
          {!user ? (
            <button 
              onClick={() => setIsSignInFormOpen(true)} 
              className={`hover:text-white transition-colors flex items-center ${isScrolled ? 'text-byellow' : 'text-byellow'}`}
            >
              <FiLogIn className="mr-2" /> Sign In
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <span>{user.displayName || 'User'}</span>
              <button 
                onClick={handleSignOut}
                className={`hover:text-white transition-colors flex items-center ${isScrolled ? 'text-byellow' : 'text-byellow'}`}
              >
                <FiLogOut className="mr-2" /> Sign Out
              </button>
            </div>
          )}
        </div>
        
        <div className="md:hidden font-semibold">
          <button onClick={toggleMenu} className={`text-3xl mt-3 focus:outline-none ${isScrolled ? 'text-byellow' : 'text-byellow'}`}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-byellow text-pred font-bold`}>
        <nav className="flex flex-col items-center font-bold mt-2 py-4 space-y-4">
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
          {!user ? (
            <button 
              onClick={() => {
                setIsSignInFormOpen(true);
                toggleMenu();
              }} 
              className="hover:text-white transition-colors flex items-center"
            >
              <FiLogIn className="mr-2" /> Sign In
            </button>
          ) : (
            <button 
              onClick={() => {
                handleSignOut();
                toggleMenu();
              }}
              className="hover:text-white transition-colors flex items-center"
            >
              <FiLogOut className="mr-2" /> Sign Out
            </button>
          )}
        </nav>
      </div>

      {/* Sign-In Form Modal */}
      {isSignInFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <SignInForm onSignIn={() => setIsSignInFormOpen(false)} />
            <button 
              onClick={() => setIsSignInFormOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
