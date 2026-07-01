import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Zap, TrendingUp, Star, Clock, ArrowRight, Gift, Truck, Shield, Headphones } from 'lucide-react';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';

const categoryIcons: Record<string, string> = {
  'Earbuds': '🎧', 'Neckband': '🎵', 'Smart Watches': '⌚', 'Charging Cable': '🔌',
  'Mobile Chargers': '🔋', 'Power Bank': '🔋', 'Bluetooth Speaker': '🔊', 'Mouse': '🖱️',
  'Keyboard': '⌨️', 'Pendrive': '💾', 'Memory Card': '💿', 'Laptop Accessories': '💻',
  'Mobile Accessories': '📱', 'T-Shirts': '👕', 'Shirts': '👔', 'Jeans': '👖',
  'Hoodies': '🧥', 'Caps': '🧢', 'Wallets': '👛', 'Belts': '🥋', 'Shoes': '👟',
  'Slippers': '🩴', 'Bags': '🎒', 'Accessories': '💎',
};

const allSubcategories = [
  { name: 'Earbuds', cat: 'Electronics' }, { name: 'Smart Watches', cat: 'Electronics' },
  { name: 'Neckband', cat: 'Electronics' }, { name: 'Power Bank', cat: 'Electronics' },
  { name: 'Charging Cable', cat: 'Electronics' }, { name: 'Bluetooth Speaker', cat: 'Electronics' },
  { name: 'Mouse', cat: 'Electronics' }, { name: 'Pendrive', cat: 'Electronics' },
  { name: 'T-Shirts', cat: 'Fashion' }, { name: 'Shirts', cat: 'Fashion' },
  { name: 'Jeans', cat: 'Fashion' }, { name: 'Hoodies', cat: 'Fashion' },
  { name: 'Shoes', cat: 'Fashion' }, { name: 'Wallets', cat: 'Fashion' },
  { name: 'Bags', cat: 'Fashion' }, { name: 'Caps', cat: 'Fashion' },
];

export default function HomePage() {
  const { products, recentlyViewed } = useStore();
  const [flashTimer, setFlashTimer] = useState({ h: 5, m: 23, s: 45 });

  useEffect(() => {
    const interval = setInterval(() => {
      setFlashTimer((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const trendingProducts = products.filter((p) => p.isTrending);
  const newArrivals = products.filter((p) => p.isNewArrival);
  const flashSale = products.filter((p) => p.isFlashSale);
  const dealOfDay = products.filter((p) => p.isDealOfDay);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <div className="space-y-0">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                <Zap size={16} /> Mega Sale is Live!
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                Up to <span className="text-yellow-300">80% OFF</span> on Electronics & Fashion
              </h1>
              <p className="text-lg text-white/80 max-w-lg">Shop the latest earbuds, smartwatches, t-shirts, shoes and more at unbeatable prices. Free delivery on orders above ₹499!</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link to="/category/Electronics" className="px-8 py-3 bg-white text-primary-600 rounded-xl font-bold text-sm hover:bg-yellow-300 hover:text-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Shop Electronics →
                </Link>
                <Link to="/category/Fashion" className="px-8 py-3 bg-white/20 text-white rounded-xl font-bold text-sm hover:bg-white/30 transition-all backdrop-blur-sm border border-white/30">
                  Shop Fashion →
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <div className="text-center space-y-2">
                    <div className="text-7xl">🛒</div>
                    <p className="text-white font-bold text-xl">Rupesh Store</p>
                    <p className="text-white/70 text-sm">Quality • Affordable • Trusted</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-yellow-400 flex items-center justify-center text-3xl shadow-xl rotate-12 animate-bounce">🎧</div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl bg-green-400 flex items-center justify-center text-2xl shadow-xl -rotate-12 animate-bounce" style={{ animationDelay: '0.5s' }}>⌚</div>
                <div className="absolute top-1/2 -right-8 w-14 h-14 rounded-2xl bg-pink-400 flex items-center justify-center text-xl shadow-xl rotate-6 animate-bounce" style={{ animationDelay: '1s' }}>👟</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Truck size={22} />, title: 'Free Delivery', sub: 'On orders above ₹499' },
              { icon: <Shield size={22} />, title: 'Secure Payments', sub: 'UPI, Cards, COD' },
              { icon: <Gift size={22} />, title: 'Best Offers', sub: 'Up to 80% off' },
              { icon: <Headphones size={22} />, title: '24/7 Support', sub: 'Chat, Email, WhatsApp' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-[11px] text-gray-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Slider */}
      <section className="bg-white dark:bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold">Shop by Category</h2>
            <Link to="/category/Electronics" className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {allSubcategories.map((sub) => (
              <Link
                key={sub.name}
                to={`/category/${sub.cat}/${sub.name}`}
                className="flex flex-col items-center gap-2 min-w-[80px] group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  {categoryIcons[sub.name] || '📦'}
                </div>
                <span className="text-[11px] md:text-xs font-medium text-center leading-tight whitespace-nowrap">{sub.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Banners */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/category/Electronics" className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white hover:shadow-xl transition-shadow group">
            <div className="relative z-10">
              <p className="text-sm font-medium opacity-80">Electronics</p>
              <h3 className="text-2xl font-bold mt-1">Up to 80% OFF</h3>
              <p className="text-sm opacity-80 mt-1">Earbuds, Watches & More</p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold group-hover:gap-2 transition-all">Shop Now <ArrowRight size={16} /></span>
            </div>
            <div className="absolute right-4 bottom-4 text-6xl opacity-30">📱</div>
          </Link>
          <Link to="/category/Fashion" className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-pink-500 to-orange-400 p-6 text-white hover:shadow-xl transition-shadow group">
            <div className="relative z-10">
              <p className="text-sm font-medium opacity-80">Fashion</p>
              <h3 className="text-2xl font-bold mt-1">Min 60% OFF</h3>
              <p className="text-sm opacity-80 mt-1">T-Shirts, Shoes & More</p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold group-hover:gap-2 transition-all">Shop Now <ArrowRight size={16} /></span>
            </div>
            <div className="absolute right-4 bottom-4 text-6xl opacity-30">👕</div>
          </Link>
          <Link to="/flash-sale" className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-red-500 to-yellow-500 p-6 text-white hover:shadow-xl transition-shadow group">
            <div className="relative z-10">
              <p className="text-sm font-medium opacity-80">Limited Time</p>
              <h3 className="text-2xl font-bold mt-1">⚡ Flash Sale</h3>
              <p className="text-sm opacity-80 mt-1">Hurry! Deals ending soon</p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold group-hover:gap-2 transition-all">Shop Now <ArrowRight size={16} /></span>
            </div>
            <div className="absolute right-4 bottom-4 text-6xl opacity-30">🔥</div>
          </Link>
        </div>
      </section>

      {/* Flash Sale */}
      {flashSale.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <Zap className="text-red-500" size={24} />
                  <div>
                    <h2 className="text-xl font-bold">Flash Sale</h2>
                    <p className="text-sm text-gray-500">Grab before they're gone!</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Ends in:</span>
                  <div className="flex gap-1">
                    {[
                      { val: flashTimer.h, label: 'H' },
                      { val: flashTimer.m, label: 'M' },
                      { val: flashTimer.s, label: 'S' },
                    ].map((t, i) => (
                      <div key={i} className="w-10 h-10 rounded-lg bg-red-500 text-white flex flex-col items-center justify-center">
                        <span className="text-sm font-bold leading-none">{String(t.val).padStart(2, '0')}</span>
                        <span className="text-[8px] opacity-70">{t.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {flashSale.map((p) => (
                  <ProductCard key={p.id} product={p} compact />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Deal of the Day */}
      {dealOfDay.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Clock className="text-orange-500" size={24} />
              <div>
                <h2 className="text-xl font-bold">Deal of the Day</h2>
                <p className="text-sm text-gray-500">Top picks at unbeatable prices</p>
              </div>
            </div>
            <Link to="/trending" className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {dealOfDay.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-orange-500" size={24} />
            <div>
              <h2 className="text-xl font-bold">Trending Now</h2>
              <p className="text-sm text-gray-500">Most popular products</p>
            </div>
          </div>
          <Link to="/trending" className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {trendingProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Coupon Banner */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Get Extra 10% OFF</h3>
          <p className="text-white/80 mb-4">Use code <span className="font-mono bg-white/20 px-3 py-1 rounded-lg font-bold">WELCOME10</span> on your first order</p>
          <Link to="/category/Electronics" className="inline-block px-6 py-2.5 bg-white text-primary-600 rounded-xl font-bold text-sm hover:bg-yellow-300 hover:text-black transition-all">
            Shop Now
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🆕</span>
              <div>
                <h2 className="text-xl font-bold">New Arrivals</h2>
                <p className="text-sm text-gray-500">Just landed products</p>
              </div>
            </div>
            <Link to="/new-arrivals" className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <h2 className="text-xl font-bold">Best Sellers</h2>
              <p className="text-sm text-gray-500">Customer favorites</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Top Rated */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Star className="text-yellow-400 fill-yellow-400" size={24} />
            <div>
              <h2 className="text-xl font-bold">Top Rated</h2>
              <p className="text-sm text-gray-500">Highest customer ratings</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {topRated.slice(0, 5).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-xl font-bold mb-4">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {recentlyViewed.slice(0, 5).map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 md:p-10 text-center">
          <h3 className="text-2xl font-bold mb-2">📬 Subscribe to Our Newsletter</h3>
          <p className="text-gray-500 mb-4">Get exclusive offers, new arrivals & price drop alerts!</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
            <button className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
