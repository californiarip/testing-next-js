interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  }
  
  export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
    return (
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
    );
  }
  
  