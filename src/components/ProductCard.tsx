import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import useStore, { Product } from '../store/useStore';
import toast from 'react-hot-toast';

interface Props {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact }: Props) {
  const { addToCart, addToWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name.slice(0, 30)}... added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist ❤️');
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount > 0 && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-lg">{product.discount}% OFF</span>
          )}
          {product.isFlashSale && (
            <span className="px-2 py-0.5 bg-yellow-500 text-black text-[10px] font-bold rounded-lg flex items-center gap-0.5"><Zap size={10} /> FLASH</span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-lg">NEW</span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 bg-purple-500 text-white text-[10px] font-bold rounded-lg">BEST</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart size={16} className={inWishlist ? 'text-red-500 fill-red-500' : 'text-gray-600 dark:text-gray-300'} />
        </button>

        {/* Quick Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 w-9 h-9 rounded-xl bg-primary-500 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary-600"
        >
          <ShoppingCart size={16} />
        </button>

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 bg-white rounded-xl font-semibold text-sm text-gray-800">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={`p-3 flex flex-col flex-1 ${compact ? '' : 'gap-1'}`}>
        <p className="text-[10px] text-primary-600 dark:text-primary-400 font-semibold uppercase">{product.brand}</p>
        <h3 className="font-medium text-sm line-clamp-2 leading-snug">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-green-600 text-white rounded text-[10px] font-bold">
            <span>{product.rating}</span>
            <Star size={9} fill="white" />
          </div>
          <span className="text-[10px] text-gray-500">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="font-bold text-lg">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="text-xs text-green-600 font-semibold">{product.discount}% off</span>
            </>
          )}
        </div>

        {/* Delivery Info */}
        {!compact && (
          <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500 dark:text-gray-400">
            {product.freeDelivery && <span className="text-green-600 font-medium">Free Delivery</span>}
            {product.cod && <span>• COD Available</span>}
          </div>
        )}
      </div>
    </Link>
  );
}
