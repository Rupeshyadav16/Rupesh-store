import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Share2, Truck, Shield, RotateCcw, Check, ChevronRight, ThumbsUp, Minus, Plus, MapPin } from 'lucide-react';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const { id } = useParams();
  const { products, addToCart, addToWishlist, isInWishlist, addToRecentlyViewed, reviews, addToCompare } = useStore();
  const product = products.find((p) => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState('');
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
      if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0]);
      if (product.sizes && product.sizes.length > 0) setSelectedSize(product.sizes[0]);
    }
    window.scrollTo(0, 0);
  }, [id, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/" className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold">Go Home</Link>
      </div>
    );
  }

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    toast.success('Added to cart! 🛒');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    window.location.href = '/checkout';
  };

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryInfo(`Delivery available to ${pincode}. Estimated ${product.deliveryDays} days.`);
    } else {
      setDeliveryInfo('Please enter a valid 6-digit pincode.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-4 overflow-x-auto scrollbar-hide">
        <Link to="/" className="hover:text-primary-600 whitespace-nowrap">Home</Link>
        <ChevronRight size={14} />
        <Link to={`/category/${product.category}`} className="hover:text-primary-600 whitespace-nowrap">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="text-gray-400 whitespace-nowrap">{product.subcategory}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
        {/* Images */}
        <div className="space-y-3">
          <div
            className={`relative bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden aspect-square cursor-zoom-in ${zoom ? 'cursor-zoom-out' : ''}`}
            onClick={() => setZoom(!zoom)}
          >
            <img
              src={product.images[selectedImage] || product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-300 ${zoom ? 'scale-150' : ''}`}
            />
            {product.discount > 0 && (
              <span className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-xl">{product.discount}% OFF</span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImage === i ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-primary-600 font-semibold">{product.brand}</p>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-2.5 py-1 bg-green-600 text-white rounded-lg text-sm font-bold">
              {product.rating} <Star size={14} fill="white" />
            </div>
            <span className="text-sm text-gray-500">{product.reviews.toLocaleString()} Ratings & {productReviews.length} Reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-green-600 font-bold text-lg">{product.discount}% off</span>
              </>
            )}
          </div>
          <p className="text-xs text-gray-500">inclusive of all taxes</p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="text-sm font-semibold mb-2">Color: <span className="text-gray-500 font-normal">{selectedColor}</span></p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                      selectedColor === color
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <p className="text-sm font-semibold mb-2">Size: <span className="text-gray-500 font-normal">{selectedSize}</span></p>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl text-sm font-semibold border-2 transition-all ${
                      selectedSize === size
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <p className="text-sm font-semibold mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-xl border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-semibold text-lg">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="w-10 h-10 rounded-xl border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            {product.inStock ? (
              <>
                <Check size={16} className="text-green-600" />
                <span className="text-sm text-green-600 font-medium">In Stock</span>
                {product.stockCount < 20 && (
                  <span className="text-sm text-orange-500 font-medium ml-2">Only {product.stockCount} left!</span>
                )}
              </>
            ) : (
              <span className="text-sm text-red-500 font-medium">Out of Stock</span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 text-white rounded-xl font-bold text-sm hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="flex-1 px-6 py-3.5 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              ⚡ Buy Now
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { addToWishlist(product); toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist ❤️'); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                inWishlist ? 'border-red-300 bg-red-50 dark:bg-red-900/20 text-red-600' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} /> {inWishlist ? 'Wishlisted' : 'Wishlist'}
            </button>
            <button
              onClick={() => { addToCompare(product); toast.success('Added to compare'); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium hover:border-gray-400 transition-all"
            >
              🔄 Compare
            </button>
            <button
              onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success('Link copied!'); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium hover:border-gray-400 transition-all"
            >
              <Share2 size={16} /> Share
            </button>
          </div>

          {/* Delivery Check */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary-600" />
              <p className="text-sm font-semibold">Delivery Options</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter pincode"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button onClick={checkDelivery} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">Check</button>
            </div>
            {deliveryInfo && <p className="text-sm text-green-600">{deliveryInfo}</p>}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: <Truck size={18} />, text: product.freeDelivery ? 'Free Delivery' : `₹49 Delivery` },
                { icon: <Shield size={18} />, text: 'COD Available' },
                { icon: <RotateCcw size={18} />, text: '7 Day Return' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white dark:bg-gray-700 text-center">
                  <div className="text-primary-600">{item.icon}</div>
                  <span className="text-[10px] font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700">
          {(['description', 'specs', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'specs' ? 'Specifications' : tab}
              {tab === 'reviews' && ` (${productReviews.length})`}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
              <div>
                <h4 className="font-semibold mb-2">Key Features</h4>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Check size={16} className="text-green-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-lg">
              {Object.entries(product.specifications).map(([key, val], i) => (
                <div key={i} className={`flex py-3 px-4 text-sm ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''} rounded-lg`}>
                  <span className="w-40 text-gray-500 font-medium flex-shrink-0">{key}</span>
                  <span className="text-gray-800 dark:text-gray-200">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {productReviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              ) : (
                productReviews.map((review) => (
                  <div key={review.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5 px-2 py-0.5 bg-green-600 text-white rounded text-xs font-bold">
                          {review.rating} <Star size={10} fill="white" />
                        </div>
                        <span className="font-semibold text-sm">{review.userName}</span>
                        {review.verified && (
                          <span className="text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 rounded-full font-medium">✓ Verified</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{review.createdAt}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                    <button className="flex items-center gap-1 mt-2 text-xs text-gray-400 hover:text-primary-600 transition-colors">
                      <ThumbsUp size={12} /> Helpful ({review.helpful})
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
