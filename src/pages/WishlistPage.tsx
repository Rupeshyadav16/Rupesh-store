import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-4">❤️</div>
        <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-6">Save items you love to your wishlist</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold">
          <Heart size={18} /> Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist ({wishlist.length} items)</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {wishlist.map((item) => (
          <div key={item.product.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden group">
            <Link to={`/product/${item.product.id}`} className="block">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {item.product.discount > 0 && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-lg">{item.product.discount}% OFF</span>
                )}
              </div>
            </Link>
            <div className="p-3">
              <p className="text-[10px] text-primary-600 font-semibold">{item.product.brand}</p>
              <h3 className="font-medium text-sm line-clamp-2">{item.product.name}</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-bold">₹{item.product.price.toLocaleString()}</span>
                <span className="text-xs text-gray-400 line-through">₹{item.product.originalPrice.toLocaleString()}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => { addToCart(item.product); toast.success('Added to cart! 🛒'); }}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-primary-600 text-white rounded-xl text-xs font-medium hover:bg-primary-700"
                >
                  <ShoppingCart size={14} /> Add to Cart
                </button>
                <button
                  onClick={() => { removeFromWishlist(item.product.id); toast.success('Removed'); }}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
