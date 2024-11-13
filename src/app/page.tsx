import ProductList from "@/components/ProductList";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
}

export default async function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Our Products</h1>
      <ProductList />
    </main>
  );
}

