interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    currency: string;
    image: string;
    rating: number;
  }
  
  interface ProductCardProps {
    product: Product;
  }
  
  export default function ProductCard({ product }: ProductCardProps) {
    const truncatedDescription = product.description.length > 100
      ? product.description.slice(0, 100) + "..."
      : product.description;
  
    return (
      <div className="border rounded-lg shadow-md overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 bg-indigo-300">
          <h2 className="text-2xl font-semibold text-gray-100">{product.title}</h2>
          <p className="text-gray-600 text-sm mt-2">{truncatedDescription}</p>
          <p className="text-lg font-bold mt-4">
            {product.currency} {product.price.toFixed(2)}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">
              {"★".repeat(Math.round(product.rating))}
            </span>
            <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    );
  }
  