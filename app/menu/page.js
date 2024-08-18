import ProductCard from '../components/ProductCard';

export default function MenuPage() {
  const categories = {
    Savouries: [
      {
        image: '/images/pakada.jpg',
        name: 'Pakada',
        description: 'Rich and moist chocolate cake topped with creamy frosting.',
        prices: {
          '250 gm': '12.99',
          '500 gm': '22.99',
          '1 kg': '39.99',
        },
      },
      {
        image: '/images/m2.jpg',
        name: 'Murukku',
        description: 'Rich and moist chocolate cake topped with creamy frosting.',
        prices: {
          '250 gm': '12.99',
          '500 gm': '22.99',
          '1 kg': '39.99',
        },
      },
      {
        image: '/images/cake.jpg',
        name: 'Chocolate Cake',
        description: 'Rich and moist chocolate cake topped with creamy frosting.',
        prices: {
          '250 gm': '12.99',
          '500 gm': '22.99',
          '1 kg': '39.99',
        },
      },
      {
        image: '/images/cake.jpg',
        name: 'Chocolate Cake',
        description: 'Rich and moist chocolate cake topped with creamy frosting.',
        prices: {
          '250 gm': '12.99',
          '500 gm': '22.99',
          '1 kg': '39.99',
        },
      },
      {
        image: '/images/cake.jpg',
        name: 'Chocolate Cake',
        description: 'Rich and moist chocolate cake topped with creamy frosting.',
        prices: {
          '250 gm': '12.99',
          '500 gm': '22.99',
          '1 kg': '39.99',
        },
      },
    ],
    Drinks: [
      {
        image: '/images/drink.jpg',
        name: 'Rose Milk',
        description: 'Refreshing iced tea with a hint of lemon.',
        prices: {
          '250 ml': '3.99',
          '500 ml': '5.99',
          '1 liter': '8.99',
        },
      },

      {
        image: '/images/drink.jpg',
        name: 'Rose Milk',
        description: 'Refreshing iced tea with a hint of lemon.',
        prices: {
          '250 ml': '3.99',
          '500 ml': '5.99',
          '1 liter': '8.99',
        },
      },
    ],
    Sweets: [
      {
        image: '/images/cookies.jpg',
        name: 'Cookies',
        description: 'Freshly baked cookies with a variety of flavors to choose from.',
        prices: {
          '6 pcs': '5.99',
          '12 pcs': '10.99',
          '24 pcs': '19.99',
        },
      },
    ],
  };

  return (
    <div 
      className="relative min-h-screen flex flex-col bg-cover py-16 px-9 mt-6 md:mt-5 lg:mt-5 overflow-y-auto"
      style={{
        backgroundImage: `url('/images/pattern.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',  // This makes the background image fixed
      }}
    >
      <h1 className="text-4xl font-semibold text-center text-pgreen font-script mb-8">Our Menu</h1>
      {Object.entries(categories).map(([category, products]) => (
        <div key={category} className="mb-14 text-bold">
          <h2 className="text-3xl font-bold font-script text-pred mb-6">{category}</h2>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hidden">
              <div className="flex space-x-8">
                {products.map((product, index) => (
                  <ProductCard
                    key={index}
                    image={product.image}
                    name={product.name}
                    description={product.description}
                    prices={product.prices}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}