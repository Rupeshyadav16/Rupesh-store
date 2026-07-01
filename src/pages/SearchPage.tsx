import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const { products, searchQuery, setSearchQuery, recentSearches, addRecentSearch, clearRecentSearches } = useStore();
  const [localQuery, setLocalQuery] = useState(searchParams.get('q') || searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setLocalQuery(q);
      setSearchQuery(q);
    }
  }, [searchParams]);

  const results = useMemo(() => {
    if (!localQuery.trim()) return [];
    const q = localQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
    );
  }, [products, localQuery]);

  const suggestions = useMemo(() => {
    if (!localQuery.trim()) return [];
    const q = localQuery.toLowerCase();
    const subs = new Set<string>();
    products.forEach((p) => {
      if (p.subcategory.toLowerCase().includes(q)) subs.add(p.subcategory);
      if (p.brand.toLowerCase().includes(q)) subs.add(p.brand);
      if (p.name.toLowerCase().includes(q)) subs.add(p.name.slice(0, 40));
    });
    return Array.from(subs).slice(0, 5);
  }, [products, localQuery]);

  const handleSearch = (query: string) => {
    setLocalQuery(query);
    setSearchQuery(query);
    addRecentSearch(query);
    setShowSuggestions(false);
  };

  const popularSearches = ['Earbuds', 'Smart Watch', 'T-Shirt', 'Power Bank', 'Shoes', 'Neckband', 'Charger', 'Hoodie'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6 relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={localQuery}
            onChange={(e) => { setLocalQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for products, brands, categories..."
            className="w-full px-4 py-3.5 pl-12 pr-10 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm shadow-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(localQuery)}
          />
          {localQuery && (
            <button onClick={() => { setLocalQuery(''); setSearchQuery(''); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (localQuery.trim() ? suggestions.length > 0 : true) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-20">
            {localQuery.trim() && suggestions.length > 0 ? (
              <div className="py-2">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => handleSearch(s)} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2">
                    <Search size={14} className="text-gray-400" /> {s}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4">
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-gray-400 flex items-center gap-1"><Clock size={12} /> Recent</p>
                      <button onClick={clearRecentSearches} className="text-xs text-primary-600">Clear</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((s, i) => (
                        <button key={i} onClick={() => handleSearch(s)} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700">
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-gray-400 flex items-center gap-1 mb-2"><TrendingUp size={12} /> Popular</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((s, i) => (
                      <button key={i} onClick={() => handleSearch(s)} className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-lg text-xs font-medium hover:bg-primary-100 dark:hover:bg-primary-900/40">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Click overlay */}
      {showSuggestions && <div className="fixed inset-0 z-10" onClick={() => setShowSuggestions(false)} />}

      {/* Results */}
      {localQuery.trim() ? (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {results.length} results for "<span className="font-semibold text-gray-700 dark:text-gray-200">{localQuery}</span>"
          </p>
          {results.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No Results Found</h3>
              <p className="text-gray-500">Try different keywords or browse categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">Search Products</h3>
          <p className="text-gray-500">Find earbuds, smartwatches, t-shirts, shoes and more</p>
        </div>
      )}
    </div>
  );
}
