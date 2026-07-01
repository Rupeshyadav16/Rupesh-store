import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CreditCard, Truck, Shield, Check, Loader2, Lock, AlertCircle } from 'lucide-react';
import useStore, { Address, Order } from '../store/useStore';
import toast from 'react-hot-toast';
import { initiateRazorpayPayment, RazorpayResponse, isRazorpayConfigured } from '../utils/razorpay';
import { STORE_CONFIG } from '../config/env';

const paymentMethods = [
  { 
    id: 'razorpay', 
    name: 'Pay Online (Razorpay)', 
    icon: '💳', 
    desc: 'UPI, Cards, Net Banking, Wallets',
    secure: true,
    recommended: true,
  },
  { 
    id: 'upi', 
    name: 'UPI', 
    icon: '📱', 
    desc: 'Google Pay, PhonePe, Paytm',
    secure: true,
  },
  { 
    id: 'card', 
    name: 'Debit/Credit Card', 
    icon: '💳', 
    desc: 'Visa, Mastercard, RuPay',
    secure: true,
  },
  { 
    id: 'netbanking', 
    name: 'Net Banking', 
    icon: '🏧', 
    desc: 'All major banks',
    secure: true,
  },
  { 
    id: 'cod', 
    name: 'Cash on Delivery', 
    icon: '💵', 
    desc: 'Pay when delivered (+₹40 COD fee)',
    secure: false,
    codFee: 40,
  },
];

export default function CheckoutPage() {
  const { cart, user, isAuthenticated, appliedCoupon, clearCart, addOrder, removeCoupon } = useStore();
  const [step, setStep] = useState(isAuthenticated ? 2 : 1);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  
  const [address, setAddress] = useState<Address>({
    id: Date.now().toString(),
    name: user?.name || '',
    phone: user?.phone || '',
    street: user?.addresses?.[0]?.street || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || 'Maharashtra',
    pincode: user?.addresses?.[0]?.pincode || '',
    isDefault: true,
    type: 'home',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = Math.min((subtotal * appliedCoupon.discount) / 100, appliedCoupon.maxDiscount || Infinity);
    } else {
      discount = appliedCoupon.discount;
    }
  }
  const shipping = subtotal >= STORE_CONFIG.FREE_SHIPPING_MIN ? 0 : STORE_CONFIG.SHIPPING_CHARGE;
  const codFee = paymentMethod === 'cod' ? STORE_CONFIG.COD_FEE : 0;
  const total = subtotal - discount + shipping + codFee;

  const validateAddress = (): boolean => {
    if (!address.name.trim()) { toast.error('Please enter your name'); return false; }
    if (!address.phone.trim() || address.phone.length < 10) { toast.error('Please enter a valid phone number'); return false; }
    if (!address.street.trim()) { toast.error('Please enter your street address'); return false; }
    if (!address.city.trim()) { toast.error('Please enter your city'); return false; }
    if (!address.pincode.trim() || address.pincode.length !== 6) { toast.error('Please enter a valid 6-digit pincode'); return false; }
    return true;
  };

  const createOrder = (paymentResponse?: RazorpayResponse): Order => {
    const orderId = `ORD-${Date.now()}`;
    const order: Order = {
      id: orderId,
      items: [...cart],
      total,
      subtotal,
      tax: 0,
      shipping,
      discount,
      couponCode: appliedCoupon?.code,
      address,
      paymentMethod: paymentMethods.find((m) => m.id === paymentMethod)?.name || paymentMethod,
      status: paymentMethod === 'cod' ? 'confirmed' : 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      trackingId: paymentResponse?.razorpay_payment_id || `TRK${Date.now()}`,
    };
    return order;
  };

  const handlePaymentSuccess = (response: RazorpayResponse) => {
    console.log('Payment successful!', response);
    
    const order = createOrder(response);
    addOrder(order);
    clearCart();
    removeCoupon();
    
    setPlacedOrderId(order.id);
    setPaymentId(response.razorpay_payment_id);
    setOrderPlaced(true);
    setIsProcessing(false);
    
    toast.success('Payment successful! Order placed 🎉');
  };

  const handlePaymentFailure = (error: string) => {
    console.error('Payment failed:', error);
    setPaymentError(error);
    setIsProcessing(false);
    toast.error(error || 'Payment failed. Please try again.');
  };

  const handlePlaceOrder = async () => {
    if (!validateAddress()) {
      setStep(2);
      return;
    }

    setPaymentError('');
    setIsProcessing(true);

    // For COD orders
    if (paymentMethod === 'cod') {
      const order = createOrder();
      addOrder(order);
      clearCart();
      removeCoupon();
      setPlacedOrderId(order.id);
      setOrderPlaced(true);
      setIsProcessing(false);
      toast.success('Order placed successfully! 🎉');
      return;
    }

    // For online payment methods - use Razorpay
    const orderId = `ORD-${Date.now()}`;
    
    try {
      await initiateRazorpayPayment(
        total,
        {
          name: address.name,
          email: user?.email || 'customer@rupeshstore.com',
          phone: address.phone,
        },
        orderId,
        handlePaymentSuccess,
        handlePaymentFailure
      );
    } catch (error) {
      handlePaymentFailure('Failed to initialize payment');
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold">Continue Shopping</Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6 animate-bounce">
          <Check size={48} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Order Placed! 🎉</h2>
        <p className="text-gray-500 mb-2">
          Your order <span className="font-mono font-bold text-primary-600">{placedOrderId}</span> has been placed successfully.
        </p>
        {paymentId && (
          <p className="text-sm text-gray-400 mb-2">
            Payment ID: <span className="font-mono">{paymentId}</span>
          </p>
        )}
        <p className="text-sm text-gray-400 mb-8">You will receive a confirmation email shortly.</p>
        
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-6 text-left">
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ What's Next?</h4>
          <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
            <li>• Order confirmation sent to your email</li>
            <li>• Your order will be packed within 24 hours</li>
            <li>• Track your order in the Orders section</li>
            <li>• Expected delivery in 3-5 business days</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/orders" className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors">
            Track Order
          </Link>
          <Link to="/" className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 md:py-8">
      <h1 className="text-2xl font-bold mb-6">Secure Checkout</h1>

      {/* Security Badge */}
      <div className="flex items-center gap-2 mb-4 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl">
        <Lock size={16} />
        <span>Your payment information is secure and encrypted</span>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-8 overflow-x-auto scrollbar-hide">
        {[
          { n: 1, label: 'Login', icon: '👤' },
          { n: 2, label: 'Address', icon: '📍' },
          { n: 3, label: 'Payment', icon: '💳' },
          { n: 4, label: 'Review', icon: '✅' },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center gap-2">
            <button
              onClick={() => step >= s.n && setStep(s.n)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                step >= s.n ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
              }`}
            >
              <span>{s.icon}</span> {s.label}
            </button>
            {i < 3 && <div className={`w-8 h-0.5 ${step > s.n ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Step 1: Login Check */}
          {step === 1 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">👤 Login</h2>
              {isAuthenticated ? (
                <div>
                  <p className="text-green-600 font-medium">✓ Logged in as {user?.name} ({user?.email})</p>
                  <button onClick={() => setStep(2)} className="mt-4 px-6 py-2.5 bg-primary-600 text-white rounded-xl font-medium text-sm">Continue</button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-500 mb-4">Please login to continue or checkout as guest.</p>
                  <div className="flex gap-3">
                    <Link to="/auth" className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-medium text-sm">Login</Link>
                    <button onClick={() => setStep(2)} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl font-medium text-sm">Guest Checkout</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><MapPin size={20} /> Delivery Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input type="text" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Rupesh Yadav" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number *</label>
                  <input type="tel" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="9876543210" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Street Address *</label>
                  <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="House No, Street Name, Area" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City *</label>
                  <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Mumbai" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State *</label>
                  <input type="text" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Maharashtra" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pincode *</label>
                  <input type="text" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="400058" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address Type</label>
                  <div className="flex gap-2">
                    {(['home', 'office', 'other'] as const).map((t) => (
                      <button key={t} onClick={() => setAddress({ ...address, type: t })} className={`px-4 py-2 rounded-xl text-sm font-medium border capitalize ${address.type === t ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'border-gray-300 dark:border-gray-600'}`}>
                        {t === 'home' ? '🏠' : t === 'office' ? '🏢' : '📍'} {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => { if (validateAddress()) setStep(3); }} className="mt-6 px-8 py-3 bg-primary-600 text-white rounded-xl font-bold text-sm hover:bg-primary-700">Continue to Payment</button>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><CreditCard size={20} /> Payment Method</h2>
              
              {/* Razorpay Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 text-sm font-medium mb-1">
                  <Shield size={16} /> Secure Payment by Razorpay
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-300">
                  Your payment is secured with 256-bit SSL encryption. We never store your card details.
                </p>
              </div>

              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                      paymentMethod === method.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">{method.name}</p>
                        {method.recommended && (
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full">RECOMMENDED</span>
                        )}
                        {method.secure && (
                          <Lock size={12} className="text-green-600" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{method.desc}</p>
                    </div>
                    {paymentMethod === method.id && (
                      <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Accepted Cards */}
              <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
                <span>Accepted:</span>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Visa</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Mastercard</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">RuPay</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">UPI</span>
                </div>
              </div>

              <button onClick={() => setStep(4)} className="mt-6 px-8 py-3 bg-primary-600 text-white rounded-xl font-bold text-sm hover:bg-primary-700">Review Order</button>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-lg font-bold mb-4">📋 Review Your Order</h2>
              
              {paymentError && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertCircle size={18} />
                  <span className="text-sm">{paymentError}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-2">📍 Delivery Address</h4>
                  <p className="text-sm">{address.name} | {address.phone}</p>
                  <p className="text-sm text-gray-500">{address.street}, {address.city}, {address.state} - {address.pincode}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-2">💳 Payment Method</h4>
                  <div className="flex items-center gap-2">
                    <span>{paymentMethods.find((m) => m.id === paymentMethod)?.icon}</span>
                    <span className="text-sm">{paymentMethods.find((m) => m.id === paymentMethod)?.name}</span>
                    {paymentMethod !== 'cod' && <Lock size={12} className="text-green-600" />}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">📦 Items ({cart.length})</h4>
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                      <img src={item.product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo Mode Warning */}
              {!isRazorpayConfigured() && paymentMethod !== 'cod' && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <p className="text-xs text-yellow-700 dark:text-yellow-400">
                    ⚠️ <strong>Demo Mode:</strong> Razorpay key not configured. Payment will be simulated. Configure your Razorpay key in <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">src/utils/razorpay.ts</code> for real payments.
                  </p>
                </div>
              )}

              <button 
                onClick={handlePlaceOrder} 
                disabled={isProcessing}
                className="w-full mt-6 px-8 py-3.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    {paymentMethod === 'cod' ? '📦 Place Order' : '🔒 Pay Securely'} — ₹{total.toLocaleString()}
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                By placing this order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 h-fit sticky top-20">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Items ({cart.length})</span><span>₹{subtotal.toLocaleString()}</span></div>
            {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount.toFixed(0)}</span></div>}
            <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
            {codFee > 0 && <div className="flex justify-between text-orange-600"><span>COD Fee</span><span>₹{codFee}</span></div>}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-bold text-lg">
              <span>Total</span><span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Security Badges */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Shield size={14} className="text-green-500" />
              <span>Safe and Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Lock size={14} className="text-green-500" />
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Truck size={14} className="text-blue-500" />
              <span>Delivery in 3-5 business days</span>
            </div>
          </div>

          {/* Payment Partner */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-[10px] text-gray-400 text-center">Payment secured by</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="text-lg">🔐</span>
              <span className="font-bold text-sm text-gray-600 dark:text-gray-400">Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
