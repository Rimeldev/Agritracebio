import React from 'react';

const products = [
  {
    id: 1,
    name: 'Produit A',
    description: 'Description du produit A',
    image: 'https://via.placeholder.com/300x200?text=Produit+A',
  },
  {
    id: 2,
    name: 'Produit B',
    description: 'Description du produit B',
    image: 'https://via.placeholder.com/300x200?text=Produit+B',
  },
  {
    id: 3,
    name: 'Produit C',
    description: 'Description du produit C',
    image: 'https://via.placeholder.com/300x200?text=Produit+C',
  },
];

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col hover:shadow-xl transition">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded-md mb-3"
      />
      <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
    </div>
  );
};

const ProductList = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Nos Produits</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
