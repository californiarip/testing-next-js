"use client";
import SearchBar from './SearchBar';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SortOptions from './Sort';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // fetching data from fake db
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        'https://my-json-server.typicode.com/californiarip/testing-next-js/db'
      );
      const data = await res.json();
      setProducts(data.products || []);
      console.log("Fetched products:", products);
      setFilteredProducts(data.products || []);
    };

    fetchProducts();
  }, []);

  // sorting
  useEffect(() => {
    let results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOption === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating-asc') {
      results.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === 'rating-desc') {
      results.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(results);
    setCurrentPage(1);
  }, [searchQuery, sortOption, products]);

  // pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page: number) => setCurrentPage(page);

  return (
    <div>
      {/* search bar */}
      <div className="flex items-center space-x-4 mb-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* pagination */}
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={`px-3 py-1 rounded-lg border ${
              index + 1 === currentPage
                ? 'bg-blue-500 text-white font-semibold'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}


