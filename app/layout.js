import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const metadata = {
  title: 'Sweet Shop - Delight in Every Bite',
  description: 'The sweetest place in town for all your dessert cravings!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
