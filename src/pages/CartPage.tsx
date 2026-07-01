import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, Tag, ArrowRight, Truck } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, appliedCoupon, applyCoupon, removeCoupon, clearCart } = useStore();
  const [couponCode, setCouponCode] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const originalTotal = cart.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
  const savings = originalTotal - subtotal;

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = Math.min((subtotal * appliedCoupon.discount) / 100, appliedCoupon.maxDiscount || Infinity);
    } else {
      discount = appliedCoupon.discount;
    }
  }
  const shipping = subtotal >= 499 ? 0 : 49;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode);
    if (result.success) {
      toast.success(result.message);
      setCouponCode('');
    } else {
      toast.error(result.message);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Add some products to get started!</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors">
          <ShoppingBag size={18} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Shopping Cart ({cart.length} items)</h1>
        <button onClick={() => { clearCart(); toast.success('Cart cleared'); }} className="text-sm text-red-500 hover:text-red-600 font-medium">
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div key={item.product.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex gap-4">
              <Link to={`/product/${item.product.id}`} className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-primary-600 font-semibold">{item.product.brand}</p>
                    <Link to={`/product/${item.product.id}`} className="font-medium text-sm line-clamp-2 hover:text-primary-600">{item.product.name}</Link>
                    {(item.selectedColor || item.selectedSize) && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.selectedColor && `Color: ${item.selectedColor}`}
                        {item.selectedColor && item.selectedSize && ' | '}
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                      </p>
                    )}
                  </div>
                  <button onClick={() => { removeFromCart(item.product.id); toast.success('Removed from cart'); }} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <X size={16} className="text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    {item.product.originalPrice > item.product.price && (
                      <p className="text-xs text-gray-400 line-through">₹{(item.product.originalPrice * item.quantity).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={18} className="text-primary-600" />
              <h3 className="font-semibold text-sm">Apply Coupon</h3>
            </div>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div>
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">{appliedCoupon.code}</p>
                  <p className="text-xs text-green-600">Saving ₹{discount.toFixed(0)}</p>
                </div>
                <button onClick={() => { removeCoupon(); toast.success('Coupon removed'); }} className="text-xs text-red-500 font-medium">Remove</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button onClick={handleApplyCoupon} className="px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700">Apply</button>
              </div>
            )}
            <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
              {['WELCOME10', 'FLAT100', 'MEGA20'].map((code) => (
                <button
                  key={code}
                  onClick={() => setCouponCode(code)}
                  className="px-3 py-1 border border-dashed border-primary-400 rounded-lg text-xs font-medium text-primary-600 whitespace-nowrap hover:bg-primary-50 dark:hover:bg-primary-900/20"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal ({cart.length} items)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>-₹{discount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Total Savings</span>
                  <span>₹{savings.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {shipping > 0 && (
              <div className="flex items-center gap-2 mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Truck size={14} className="text-blue-500" />
                <span className="text-xs text-blue-600">Add ₹{499 - subtotal} more for free delivery</span>
              </div>
            )}

            <Link
              to="/checkout"
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 text-white rounded-xl font-bold text-sm hover:bg-primary-700 transition-all shadow-lg"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>

            <Link to="/" className="block text-center mt-3 text-sm text-primary-600 font-medium hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
