import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, Moon, Sun, Bell, MapPin, ChevronDown } from 'lucide-react';
import useStore from '../store/useStore';

const categories = [
  {
    name: 'Electronics',
    subs: ['Earbuds', 'Neckband', 'Smart Watches', 'Charging Cable', 'Mobile Chargers', 'Power Bank', 'Bluetooth Speaker', 'Mouse', 'Keyboard', 'Pendrive', 'Memory Card', 'Laptop Accessories', 'Mobile Accessories'],
  },
  {
    name: 'Fashion',
    subs: ['T-Shirts', 'Shirts', 'Jeans', 'Hoodies', 'Caps', 'Wallets', 'Belts', 'Shoes', 'Slippers', 'Bags', 'Accessories'],
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { cart, darkMode, toggleDarkMode, isAuthenticated, user, wishlist, notifications, searchQuery, setSearchQuery } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [catDropdown, setCatDropdown] = useState<string | null>(null);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const searchRef = useRef<HTMLInputElement>(null);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      useStore.getState().addRecentSearch(localSearch.trim());
      navigate(`/search?q=${encodeURIComponent(localSearch.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-primary-600 dark:bg-primary-900 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><MapPin size={12} /> Mumbai, India</span>
            <span>📧 ry728309@gmail.com</span>
          </div>
          <div className="flex items-center gap-4">
            <span>🚚 Free Delivery on orders above ₹499</span>
            <span>💰 COD Available</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 glass dark:glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
              <button className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setMobileMenuOpen(true)}>
                <Menu size={22} />
              </button>
              <Link to="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">R</div>
                <div className="hidden sm:block">
                  <h1 className="font-bold text-lg leading-none gradient-text">Rupesh Store</h1>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-none mt-0.5">Electronics & Fashion</p>
                </div>
              </Link>
            </div>

            {/* Center: Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-6">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="w-full px-4 py-2.5 pl-11 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm transition-all"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </form>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setSearchOpen(!searchOpen)}>
                <Search size={20} />
              </button>

              <button onClick={toggleDarkMode} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
              </button>

              <Link to={isAuthenticated ? '/profile' : '/auth'} className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:flex items-center gap-1">
                <Bell size={20} />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unreadNotifs}</span>
                )}
              </Link>

              <Link to="/wishlist" className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:flex">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{wishlist.length}</span>
                )}
              </Link>

              <Link to="/cart" className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">{cartCount}</span>
                )}
              </Link>

              <Link
                to={isAuthenticated ? (user?.isAdmin ? '/admin' : '/profile') : '/auth'}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <User size={20} />
                <span className="text-sm font-medium hidden lg:block">
                  {isAuthenticated ? (user?.name?.split(' ')[0] || 'Account') : 'Login'}
                </span>
              </Link>
            </div>
          </div>

          {/* Categories Bar */}
          <div className="hidden md:flex items-center gap-1 pb-2 -mt-1 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="relative"
                onMouseEnter={() => setCatDropdown(cat.name)}
                onMouseLeave={() => setCatDropdown(null)}
              >
                <Link
                  to={`/category/${cat.name}`}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap"
                >
                  {cat.name === 'Electronics' ? '📱' : '👕'} {cat.name}
                  <ChevronDown size={14} />
                </Link>
                {catDropdown === cat.name && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                    {cat.subs.map((sub) => (
                      <Link
                        key={sub}
                        to={`/category/${cat.name}/${sub}`}
                        className="block px-4 py-2 text-sm hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-600 transition-colors"
                        onClick={() => setCatDropdown(null)}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/flash-sale" className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap text-red-500">
              ⚡ Flash Sale
            </Link>
            <Link to="/new-arrivals" className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap text-green-600">
              🆕 New Arrivals
            </Link>
            <Link to="/trending" className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap text-orange-500">
              🔥 Trending
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchRef}
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2.5 pl-11 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-80 max-w-[85%] bg-white dark:bg-gray-900 h-full overflow-y-auto shadow-2xl">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">R</div>
                <div>
                  <h2 className="font-bold text-lg">Rupesh Store</h2>
                  <p className="text-xs text-gray-500">Electronics & Fashion</p>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                <X size={22} />
              </button>
            </div>

            {isAuthenticated && user && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-primary-50 dark:bg-gray-800">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <div className="flex gap-3 mt-2 text-xs">
                  <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 rounded-lg">🪙 {user.rewardPoints} Coins</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 rounded-lg">💰 ₹{user.walletBalance}</span>
                </div>
              </div>
            )}

            <div className="p-4 space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase px-3 mb-2">Categories</p>
              {categories.map((cat) => (
                <div key={cat.name}>
                  <Link
                    to={`/category/${cat.name}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name === 'Electronics' ? '📱' : '👕'} {cat.name}
                  </Link>
                  <div className="ml-8 space-y-0.5">
                    {cat.subs.slice(0, 5).map((sub) => (
                      <Link
                        key={sub}
                        to={`/category/${cat.name}/${sub}`}
                        className="block px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="border-t border-gray-200 dark:border-gray-700 my-3 pt-3">
                <p className="text-xs font-semibold text-gray-400 uppercase px-3 mb-2">Quick Links</p>
                <Link to="/flash-sale" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500 font-medium" onClick={() => setMobileMenuOpen(false)}>
                  ⚡ Flash Sale
                </Link>
                <Link to="/new-arrivals" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-green-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                  🆕 New Arrivals
                </Link>
                <Link to="/trending" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-orange-500 font-medium" onClick={() => setMobileMenuOpen(false)}>
                  🔥 Trending
                </Link>
                <Link to="/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>
                  📦 My Orders
                </Link>
                <Link to="/wishlist" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>
                  ❤️ Wishlist
                </Link>
              </div>

              {isAuthenticated && user?.isAdmin && (
                <div className="border-t border-gray-200 dark:border-gray-700 my-3 pt-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase px-3 mb-2">Admin</p>
                  <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-primary-600" onClick={() => setMobileMenuOpen(false)}>
                    🛠️ Admin Panel
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
