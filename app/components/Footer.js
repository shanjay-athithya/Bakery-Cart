import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; // Import icons from react-icons

const Footer = () => (
  <footer className="bg-pgreen text-pyellow py-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold">Golden Pakkada</h2>
          <p className="mt-2 text-m text-white">
            Your favorite destination for delightful sweets and savory treats. Bringing joy to your taste buds since 2024.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl  font-bold">Quick Links</h3>
          <ul className="mt-4 text-white space-y-2">
            <li><a href="#" className="hover:text-pastelMint">Home</a></li>
            <li><a href="#" className="hover:text-pastelMint">Menu</a></li>
            <li><a href="#" className="hover:text-pastelMint">About Us</a></li>
            <li><a href="#" className="hover:text-pastelMint">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div >
          <h3 className="text-xl font-bold">Contact Us</h3>
          <p className="text-white mt-4">
            123 Sweet Shop,<br />
            Dubai Kuruku Santhu,<br />
            Dubai 12345
          </p>
          <p className="mt-2">Phone: <a href="tel:+971123456789" className="text-white hover:text-pastelMint">+971 123 456 789</a></p>
          <p className="mt-2">Email: <a href="mailto:info@goldenpakkada.com" className="text-white hover:text-pastelMint">info@goldenpakkada.com</a></p>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="mt-12 text-center border-t border-pyellow pt-8">
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://www.facebook.com/goldenpakkada/" className="text-white hover:text-pyellow transition-colors">
            <FaFacebookF size={24} />
          </a>
          <a href="https://www.instagram.com/goldenpakkada/" className="text-white hover:text-pyellow transition-colors">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.twitter.com/goldenpakkada/" className="text-white hover:text-pyellow transition-colors">
            <FaTwitter size={24} />
          </a>
        </div>
        <p className="text-lg font-medium">&copy; 2024 Golden Pakkada. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
