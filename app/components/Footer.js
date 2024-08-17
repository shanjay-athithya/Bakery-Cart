import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; // Import icons from react-icons

const Footer = () => (
  <footer className="bg-pgreen text-pyellow py-8 mt-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center">
        <p className="text-lg font-medium">&copy; 2024 Sweet Shop. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="https://www.facebook.com/goldenpakkada/" className="text-white hover:text-pyellow transition-colors">
            <FaFacebookF size={24} />
          </a>
          <a href="#" className="text-white hover:text-pastelMint transition-colors">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-white hover:text-pastelMint transition-colors">
            <FaTwitter size={24} />
          </a>
        </div>
        <div className="mt-6">
          <p className="text-sm">123 Sweet Shop,Dubai Kuruku Santhu,  Dubai 12345</p>
          <p className="text-sm">Email: <a href="mailto:info@sweetshop.com" className="hover:text-pastelMint">info@sweetshop.com</a></p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
