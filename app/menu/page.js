import ProductCard from '../components/ProductCard';

export default function MenuPage() {
  const products = [
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
      image: '/images/cookies.jpg',
      name: 'Cookies',
      description: 'Freshly baked cookies with a variety of flavors to choose from.',
      prices: {
        '6 pcs': '5.99',
        '12 pcs': '10.99',
        '24 pcs': '19.99',
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-semibold text-center text-pastelPink mb-8">Our Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
  );
}
