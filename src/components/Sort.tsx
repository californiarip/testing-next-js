interface SortOptionsProps {
    sortOption: string;
    setSortOption: (option: string) => void;
  }
  
  export default function SortOptions({ sortOption, setSortOption }: SortOptionsProps) {
    return (
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      >
        <option value="">Sort by...</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-asc">Rating: Low to High</option>
        <option value="rating-desc">Rating: High to Low</option>
      </select>
    );
  }
  