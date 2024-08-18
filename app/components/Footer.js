"use client";

import { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaChevronDown, FaMapMarkerAlt } from 'react-icons/fa'; 

const Footer = () => {
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [contactInfoOpen, setContactInfoOpen] = useState(false);

  return (
    <footer className="bg-pgreen text-pyellow py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left md:text-center">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-script font-bold">Golden Pakkada</h2>
            <p className="mt-8 text-byellow">
              Your favorite destination for delightful sweets and savory treats. Bringing joy to your taste buds since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex justify-between items-center md:block">
              <h3 className="text-xl font-script font-bold">Quick Links</h3>
              <button
                className="md:hidden text-byellow"
                onClick={() => setQuickLinksOpen(!quickLinksOpen)}
              >
                <FaChevronDown size={20} />
              </button>
            </div>
            <ul className={`mt-4 text-byellow font-semibold space-y-2 ${quickLinksOpen ? 'block' : 'hidden'} md:block`}>
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/menu" className="hover:text-white">Menu</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <div className="flex justify-between items-center md:block">
              <h3 className="text-xl font-script font-bold">Contact Us</h3>
              <button
                className="md:hidden text-byellow"
                onClick={() => setContactInfoOpen(!contactInfoOpen)}
              >
                <FaChevronDown size={20} />
              </button>
            </div>
            <div className={`mt-4 ${contactInfoOpen ? 'block' : 'hidden'} md:block`}>
              <p className="mt-2 font-semibold">Address:
                <a className='text-byellow'>No: 3 Golden Pakkada,<br />
                Balamudali Street,<br />
                Old Washermenpet,<br />
                Chennai 600021
                </a>
              </p>
              <p className="mt-2 font-semibold">Phone: <a href="tel:+971123456789" className="text-byellow hover:text-white">+971 123 456 789</a></p>
              <p className="mt-2 font-semibold">Email: <a href="mailto:info@goldenpakkada.com" className="text-byellow hover:text-white">info@goldenpakkada.com</a></p>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 text-left md:text-center border-t border-pyellow pt-8">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://www.facebook.com/goldenpakkada/" className="text-byellow hover:text-white transition-colors">
              <FaFacebookF size={24} />
            </a>
            <a href="https://www.instagram.com/goldenpakkada/" className="text-byellow hover:text-white transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="https://maps.app.goo.gl/nxGeNkrTwex1jF548" className="text-byellow hover:text-white transition-colors">
              <FaMapMarkerAlt size={24} />
            </a>
          </div>
          <p className="text-lg font-medium">&copy; 2024 Golden Pakkada. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
