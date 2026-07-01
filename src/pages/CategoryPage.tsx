import { useState, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, List, ChevronDown } from 'lucide-react';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
  const { category, subcategory } = useParams();
  const location = useLocation();
  const { products } = useStore();
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3>(2);

  // Determine which products to show based on route
  const pageTitle = useMemo(() => {
    if (location.pathname === '/flash-sale') return '⚡ Flash Sale';
    if (location.pathname === '/new-arrivals') return '🆕 New Arrivals';
    if (location.pathname === '/trending') return '🔥 Trending';
    if (subcategory) return subcategory;
    if (category) return category;
    return 'All Products';
  }, [category, subcategory, location.pathname]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Route-based filtering
    if (location.pathname === '/flash-sale') {
      filtered = filtered.filter((p) => p.isFlashSale);
    } else if (location.pathname === '/new-arrivals') {
      filtered = filtered.filter((p) => p.isNewArrival);
    } else if (location.pathname === '/trending') {
      filtered = filtered.filter((p) => p.isTrending);
    } else {
      if (category) filtered = filtered.filter((p) => p.category === category);
      if (subcategory) filtered = filtered.filter((p) => p.subcategory === subcategory);
    }

    // Filters
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedBrands.length > 0) filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    if (minRating > 0) filtered = filtered.filter((p) => p.rating >= minRating);

    // Sort
    switch (sortBy) {
      case 'price_low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price_high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'newest': filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0)); break;
      case 'discount': filtered.sort((a, b) => b.discount - a.discount); break;
      default: filtered.sort((a, b) => b.reviews - a.reviews);
    }

    return filtered;
  }, [products, category, subcategory, location.pathname, sortBy, priceRange, selectedBrands, minRating]);

  const brands = useMemo(() => {
    const brandSet = new Set(products.filter((p) => {
      if (category) return p.category === category;
      return true;
    }).map((p) => p.brand));
    return Array.from(brandSet);
  }, [products, category]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
          <p className="text-sm text-gray-500">{filteredProducts.length} products found</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium md:hidden">
            <SlidersHorizontal size={16} /> Filters
          </button>
          <div className="relative flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto appearance-none px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="popular">Popularity</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest First</option>
              <option value="discount">Best Discount</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
          <div className="hidden md:flex gap-1 border border-gray-300 dark:border-gray-600 rounded-xl p-0.5">
            <button onClick={() => setGridCols(2)} className={`p-1.5 rounded-lg ${gridCols === 2 ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : ''}`}>
              <Grid3X3 size={16} />
            </button>
            <button onClick={() => setGridCols(3)} className={`p-1.5 rounded-lg ${gridCols === 3 ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : ''}`}>
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters - Desktop */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-black/50 md:relative md:bg-transparent' : 'hidden'} md:block md:w-64 flex-shrink-0`}>
          <div className={`${showFilters ? 'absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white dark:bg-gray-900 overflow-y-auto p-4 md:p-0 md:relative md:w-auto' : ''} space-y-6`}>
            {showFilters && (
              <div className="flex items-center justify-between mb-4 md:hidden">
                <h3 className="font-bold text-lg">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-sm text-primary-600 font-medium">Close</button>
              </div>
            )}

            {/* Price Range */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
              <h4 className="font-semibold text-sm mb-3">Price Range</h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
              <h4 className="font-semibold text-sm mb-3">Brands</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
              <h4 className="font-semibold text-sm mb-3">Minimum Rating</h4>
              <div className="space-y-1">
                {[4, 3, 2, 1].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(minRating === r ? 0 : r)}
                    className={`flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      minRating === r ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {'⭐'.repeat(r)} & above
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => { setPriceRange([0, 10000]); setSelectedBrands([]); setMinRating(0); }}
              className="w-full py-2 text-sm text-primary-600 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-xl transition-colors"
            >
              Clear All Filters
            </button>
          </div>
          {showFilters && <div className="fixed inset-0 md:hidden" onClick={() => setShowFilters(false)} />}
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No Products Found</h3>
              <p className="text-gray-500">Try adjusting your filters or search for something else.</p>
            </div>
          ) : (
            <div className={`grid grid-cols-2 ${gridCols === 3 ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'} gap-3 md:gap-4`}>
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
