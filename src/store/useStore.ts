import { create } from 'zustand';
import { ADMIN_CONFIG, STORE_CONFIG } from '../config/env';

// Types
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  reviews: number;
  description: string;
  specifications: Record<string, string>;
  features: string[];
  inStock: boolean;
  stockCount: number;
  isTrending: boolean;
  isNewArrival: boolean;
  isFlashSale: boolean;
  isDealOfDay: boolean;
  isBestSeller: boolean;
  colors?: string[];
  sizes?: string[];
  cod: boolean;
  freeDelivery: boolean;
  deliveryDays: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  type: 'home' | 'office' | 'other';
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  couponCode?: string;
  address: Address;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned';
  createdAt: string;
  estimatedDelivery: string;
  trackingId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  isAdmin: boolean;
  rewardPoints: number;
  walletBalance: number;
  joinedAt: string;
}

export interface Review {
  id: string;
  productId: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  maxDiscount?: number;
  validUntil: string;
  isActive: boolean;
  usageLimit: number;
  usedCount: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  isActive: boolean;
  order: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'system' | 'alert';
  read: boolean;
  createdAt: string;
}

interface StoreState {
  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;

  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: number, data: Partial<Product>) => void;
  deleteProduct: (id: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Review) => void;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (code: string, data: Partial<Coupon>) => void;
  deleteCoupon: (code: string) => void;

  // Banners
  banners: Banner[];
  addBanner: (banner: Banner) => void;
  updateBanner: (id: string, data: Partial<Banner>) => void;
  deleteBanner: (id: string) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Recently Viewed
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;

  // Admin
  adminUsers: User[];

  // Addresses
  addAddress: (address: Address) => void;
  updateAddress: (id: string, data: Partial<Address>) => void;
  deleteAddress: (id: string) => void;

  // Compare
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
}

// Sample products data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'boAt Airdopes 141 TWS Earbuds',
    price: 899,
    originalPrice: 4490,
    discount: 80,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
      'https://images.pexels.com/photos/3394653/pexels-photo-3394653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
      'https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Electronics',
    subcategory: 'Earbuds',
    brand: 'boAt',
    rating: 4.2,
    reviews: 45832,
    description: 'boAt Airdopes 141 truly wireless earbuds with 42 hours of playtime, low latency mode for gaming, IPX4 water resistance, IWP technology, BEAST mode, and ENx technology for clear calls.',
    specifications: { 'Battery Life': '42 Hours', 'Bluetooth': '5.1', 'Driver Size': '8mm', 'Water Resistance': 'IPX4', 'Weight': '4.5g per earbud', 'Charging': 'USB Type-C' },
    features: ['42H Total Playtime', 'BEAST Mode', 'IPX4 Water Resistance', 'ENx Tech', 'USB-C Charging', 'Low Latency Gaming'],
    inStock: true,
    stockCount: 234,
    isTrending: true,
    isNewArrival: false,
    isFlashSale: true,
    isDealOfDay: false,
    isBestSeller: true,
    colors: ['Black', 'White', 'Blue', 'Red'],
    cod: true,
    freeDelivery: true,
    deliveryDays: 3,
    tags: ['earbuds', 'wireless', 'bluetooth', 'boat', 'tws'],
  },
  {
    id: 2,
    name: 'Fire-Boltt Phoenix Smart Watch',
    price: 1499,
    originalPrice: 8999,
    discount: 83,
    image: 'https://images.pexels.com/photos/31541678/pexels-photo-31541678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/31541678/pexels-photo-31541678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
      'https://images.pexels.com/photos/12564670/pexels-photo-12564670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Electronics',
    subcategory: 'Smart Watches',
    brand: 'Fire-Boltt',
    rating: 4.0,
    reviews: 28394,
    description: 'Fire-Boltt Phoenix smartwatch with 1.13" display, SpO2, heart rate & sleep monitoring, 120+ sports modes, IP68 water resistance, and Bluetooth calling.',
    specifications: { 'Display': '1.13" AMOLED', 'Battery': '7 Days', 'Water Resistance': 'IP68', 'Sensors': 'SpO2, HR, Sleep', 'Sports Modes': '120+', 'Connectivity': 'Bluetooth 5.0' },
    features: ['Bluetooth Calling', '120+ Sports Modes', 'SpO2 Monitor', 'Heart Rate Monitor', 'IP68 Waterproof', '7 Day Battery'],
    inStock: true,
    stockCount: 156,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: false,
    isDealOfDay: true,
    isBestSeller: true,
    colors: ['Black', 'Blue', 'Green', 'Gold'],
    cod: true,
    freeDelivery: true,
    deliveryDays: 2,
    tags: ['smartwatch', 'fitness', 'bluetooth', 'calling'],
  },
  {
    id: 3,
    name: 'boAt Rockerz 255 Pro+ Neckband',
    price: 799,
    originalPrice: 2990,
    discount: 73,
    image: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Electronics',
    subcategory: 'Neckband',
    brand: 'boAt',
    rating: 4.1,
    reviews: 67893,
    description: 'boAt Rockerz 255 Pro+ Bluetooth neckband with ASAP charge, up to 40 hours playback, dual pairing, magnetic earbuds, and IPX7 water resistance.',
    specifications: { 'Battery Life': '40 Hours', 'Bluetooth': '5.2', 'Driver': '10mm', 'Water Resistance': 'IPX7', 'Charging': 'Type-C', 'Weight': '30g' },
    features: ['40H Playback', 'ASAP Charge', 'Dual Pairing', 'IPX7', 'Magnetic Earbuds', 'Type-C Charging'],
    inStock: true,
    stockCount: 89,
    isTrending: true,
    isNewArrival: false,
    isFlashSale: true,
    isDealOfDay: false,
    isBestSeller: false,
    colors: ['Black', 'Green', 'Blue'],
    cod: true,
    freeDelivery: true,
    deliveryDays: 3,
    tags: ['neckband', 'bluetooth', 'wireless', 'boat'],
  },
  {
    id: 4,
    name: 'Ambrane 10000mAh Power Bank',
    price: 699,
    originalPrice: 2499,
    discount: 72,
    image: 'https://images.pexels.com/photos/4765366/pexels-photo-4765366.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/4765366/pexels-photo-4765366.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Electronics',
    subcategory: 'Power Bank',
    brand: 'Ambrane',
    rating: 4.3,
    reviews: 12456,
    description: 'Ambrane 10000mAh Li-Polymer Powerbank with 20W fast charging, Type-C input/output, compatible with all smartphones.',
    specifications: { 'Capacity': '10000mAh', 'Input': 'Type-C', 'Output': 'USB-A, Type-C', 'Fast Charging': '20W', 'Weight': '220g', 'Ports': '2' },
    features: ['20W Fast Charging', 'Type-C Port', 'Slim Design', 'LED Indicator', 'Multi-device Charging', 'BIS Certified'],
    inStock: true,
    stockCount: 312,
    isTrending: false,
    isNewArrival: true,
    isFlashSale: false,
    isDealOfDay: false,
    isBestSeller: true,
    colors: ['Black', 'White', 'Blue'],
    cod: true,
    freeDelivery: true,
    deliveryDays: 4,
    tags: ['powerbank', 'charging', 'portable', 'ambrane'],
  },
  {
    id: 5,
    name: 'JBL Go 3 Portable Bluetooth Speaker',
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    image: 'https://images.pexels.com/photos/29581125/pexels-photo-29581125.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/29581125/pexels-photo-29581125.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Electronics',
    subcategory: 'Bluetooth Speaker',
    brand: 'JBL',
    rating: 4.5,
    reviews: 9823,
    description: 'JBL Go 3 portable Bluetooth speaker with bold style, rich JBL Pro Sound, IP67 waterproof and dustproof design.',
    specifications: { 'Output': '4.2W', 'Battery': '5 Hours', 'Bluetooth': '5.1', 'Protection': 'IP67', 'Weight': '209g', 'Driver': '43mm' },
    features: ['JBL Pro Sound', 'IP67 Waterproof', 'Compact Design', '5H Battery', 'USB-C Charging', 'Wireless Streaming'],
    inStock: true,
    stockCount: 67,
    isTrending: false,
    isNewArrival: false,
    isFlashSale: false,
    isDealOfDay: true,
    isBestSeller: false,
    colors: ['Black', 'Red', 'Blue', 'Green', 'Pink'],
    cod: true,
    freeDelivery: true,
    deliveryDays: 3,
    tags: ['speaker', 'bluetooth', 'portable', 'jbl', 'waterproof'],
  },
  {
    id: 6,
    name: 'SanDisk 64GB Pendrive USB 3.0',
    price: 399,
    originalPrice: 1150,
    discount: 65,
    image: 'https://images.pexels.com/photos/18641665/pexels-photo-18641665.png?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/18641665/pexels-photo-18641665.png?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Electronics',
    subcategory: 'Pendrive',
    brand: 'SanDisk',
    rating: 4.4,
    reviews: 34567,
    description: 'SanDisk Ultra Flair 64GB USB 3.0 Pen Drive with up to 150MB/s read speed. Sleek, durable metal casing.',
    specifications: { 'Capacity': '64GB', 'Interface': 'USB 3.0', 'Read Speed': '150 MB/s', 'Connector': 'USB-A', 'Material': 'Metal', 'OS Support': 'Windows, Mac, Linux' },
    features: ['USB 3.0 Speed', 'Metal Design', '150MB/s Read', 'Compact Size', 'Password Protection', '5 Year Warranty'],
    inStock: true,
    stockCount: 890,
    isTrending: false,
    isNewArrival: false,
    isFlashSale: true,
    isDealOfDay: false,
    isBestSeller: true,
    cod: true,
    freeDelivery: false,
    deliveryDays: 3,
    tags: ['pendrive', 'usb', 'storage', 'sandisk'],
  },
  {
    id: 7,
    name: 'Premium Cotton Round Neck T-Shirt',
    price: 349,
    originalPrice: 1299,
    discount: 73,
    image: 'https://images.pexels.com/photos/4255642/pexels-photo-4255642.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/4255642/pexels-photo-4255642.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
      'https://images.pexels.com/photos/3977441/pexels-photo-3977441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Fashion',
    subcategory: 'T-Shirts',
    brand: 'Rupesh Collection',
    rating: 4.1,
    reviews: 5678,
    description: 'Premium 100% cotton round neck t-shirt. Comfortable, breathable, and perfect for casual wear. Available in multiple colors.',
    specifications: { 'Material': '100% Cotton', 'Fit': 'Regular', 'Neck': 'Round', 'Sleeve': 'Half', 'Wash Care': 'Machine Wash', 'Pattern': 'Solid' },
    features: ['100% Cotton', 'Bio-Washed', 'Pre-Shrunk', 'Comfortable Fit', 'Multiple Colors', 'Durable Stitching'],
    inStock: true,
    stockCount: 567,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: false,
    isDealOfDay: false,
    isBestSeller: true,
    colors: ['Black', 'White', 'Navy', 'Red', 'Grey', 'Green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    cod: true,
    freeDelivery: true,
    deliveryDays: 4,
    tags: ['tshirt', 'cotton', 'casual', 'men'],
  },
  {
    id: 8,
    name: 'Stylish Men Casual Shirt',
    price: 599,
    originalPrice: 1999,
    discount: 70,
    image: 'https://images.pexels.com/photos/7045180/pexels-photo-7045180.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/7045180/pexels-photo-7045180.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Fashion',
    subcategory: 'Shirts',
    brand: 'Rupesh Collection',
    rating: 4.0,
    reviews: 3421,
    description: 'Stylish casual shirt for men. Premium fabric, comfortable fit, perfect for office and casual outings.',
    specifications: { 'Material': 'Cotton Blend', 'Fit': 'Slim', 'Collar': 'Spread', 'Sleeve': 'Full', 'Pattern': 'Solid', 'Occasion': 'Casual' },
    features: ['Premium Fabric', 'Slim Fit', 'Wrinkle Free', 'Comfortable', 'Formal & Casual', 'Easy Care'],
    inStock: true,
    stockCount: 234,
    isTrending: false,
    isNewArrival: true,
    isFlashSale: false,
    isDealOfDay: false,
    isBestSeller: false,
    colors: ['Black', 'White', 'Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    cod: true,
    freeDelivery: true,
    deliveryDays: 5,
    tags: ['shirt', 'casual', 'formal', 'men'],
  },
  {
    id: 9,
    name: 'Men Sports Running Shoes',
    price: 1299,
    originalPrice: 3999,
    discount: 68,
    image: 'https://images.pexels.com/photos/27100557/pexels-photo-27100557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/27100557/pexels-photo-27100557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
      'https://images.pexels.com/photos/8313383/pexels-photo-8313383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Fashion',
    subcategory: 'Shoes',
    brand: 'Rupesh Sports',
    rating: 4.3,
    reviews: 8976,
    description: 'Lightweight men sports running shoes with cushioned sole, breathable mesh upper, and anti-slip rubber outsole.',
    specifications: { 'Material': 'Mesh Upper', 'Sole': 'Rubber', 'Closure': 'Lace-Up', 'Toe Shape': 'Round', 'Weight': '280g', 'Warranty': '3 Months' },
    features: ['Lightweight', 'Breathable Mesh', 'Cushioned Sole', 'Anti-slip', 'Flexible', 'Durable'],
    inStock: true,
    stockCount: 189,
    isTrending: true,
    isNewArrival: false,
    isFlashSale: true,
    isDealOfDay: true,
    isBestSeller: true,
    colors: ['Black', 'White', 'Grey', 'Blue'],
    sizes: ['7', '8', '9', '10', '11'],
    cod: true,
    freeDelivery: true,
    deliveryDays: 5,
    tags: ['shoes', 'sports', 'running', 'sneakers', 'men'],
  },
  {
    id: 10,
    name: 'Men Hoodie Sweatshirt',
    price: 799,
    originalPrice: 2499,
    discount: 68,
    image: 'https://images.pexels.com/photos/32936116/pexels-photo-32936116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/32936116/pexels-photo-32936116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Fashion',
    subcategory: 'Hoodies',
    brand: 'Rupesh Collection',
    rating: 4.2,
    reviews: 2345,
    description: 'Premium men hoodie sweatshirt with fleece lining, kangaroo pocket, and adjustable hood. Perfect for winters.',
    specifications: { 'Material': 'Cotton Fleece', 'Fit': 'Regular', 'Closure': 'Pull Over', 'Hood': 'Adjustable', 'Pockets': 'Kangaroo', 'Season': 'Winter' },
    features: ['Fleece Lined', 'Kangaroo Pocket', 'Adjustable Hood', 'Ribbed Cuffs', 'Warm & Cozy', 'Durable'],
    inStock: true,
    stockCount: 145,
    isTrending: false,
    isNewArrival: true,
    isFlashSale: false,
    isDealOfDay: false,
    isBestSeller: false,
    colors: ['Black', 'Grey', 'Navy', 'Maroon'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    cod: true,
    freeDelivery: true,
    deliveryDays: 4,
    tags: ['hoodie', 'sweatshirt', 'winter', 'men'],
  },
  {
    id: 11,
    name: 'USB Type-C Fast Charging Cable',
    price: 149,
    originalPrice: 599,
    discount: 75,
    image: 'https://images.pexels.com/photos/18311088/pexels-photo-18311088.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/18311088/pexels-photo-18311088.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Electronics',
    subcategory: 'Charging Cable',
    brand: 'Portronics',
    rating: 4.0,
    reviews: 15678,
    description: 'Premium braided USB Type-C fast charging cable. 3A fast charge, data sync, durable nylon braiding, 1.5m length.',
    specifications: { 'Length': '1.5m', 'Current': '3A', 'Material': 'Nylon Braided', 'Connector': 'Type-C to USB-A', 'Data Transfer': '480 Mbps', 'Warranty': '6 Months' },
    features: ['3A Fast Charging', 'Nylon Braided', 'Tangle Free', 'Universal Compatible', '1.5m Length', 'Data Sync'],
    inStock: true,
    stockCount: 1200,
    isTrending: false,
    isNewArrival: false,
    isFlashSale: true,
    isDealOfDay: false,
    isBestSeller: true,
    cod: true,
    freeDelivery: false,
    deliveryDays: 3,
    tags: ['cable', 'charging', 'type-c', 'usb', 'fast-charging'],
  },
  {
    id: 12,
    name: 'Wireless Mouse Ergonomic',
    price: 399,
    originalPrice: 1299,
    discount: 69,
    image: 'https://images.pexels.com/photos/1647978/pexels-photo-1647978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/1647978/pexels-photo-1647978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Electronics',
    subcategory: 'Mouse',
    brand: 'Logitech',
    rating: 4.4,
    reviews: 7823,
    description: 'Ergonomic wireless mouse with silent clicks, adjustable DPI, and long battery life. Perfect for work and gaming.',
    specifications: { 'DPI': '800-2400', 'Buttons': '6', 'Connectivity': '2.4GHz Wireless', 'Battery': 'AA x 1', 'Battery Life': '18 Months', 'Weight': '95g' },
    features: ['Silent Clicks', 'Adjustable DPI', 'Ergonomic Design', '18 Month Battery', 'Plug & Play', 'Universal Compatible'],
    inStock: true,
    stockCount: 345,
    isTrending: false,
    isNewArrival: false,
    isFlashSale: false,
    isDealOfDay: false,
    isBestSeller: false,
    colors: ['Black', 'White', 'Grey'],
    cod: true,
    freeDelivery: true,
    deliveryDays: 3,
    tags: ['mouse', 'wireless', 'ergonomic', 'computer'],
  },
  {
    id: 13,
    name: 'Men Slim Fit Denim Jeans',
    price: 699,
    originalPrice: 2299,
    discount: 70,
    image: 'https://images.pexels.com/photos/27113471/pexels-photo-27113471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/27113471/pexels-photo-27113471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Fashion',
    subcategory: 'Jeans',
    brand: 'Rupesh Denim',
    rating: 4.0,
    reviews: 4567,
    description: 'Slim fit stretchable denim jeans for men. Premium quality denim, comfortable fit, and trendy wash.',
    specifications: { 'Material': 'Denim (Cotton Blend)', 'Fit': 'Slim', 'Rise': 'Mid Rise', 'Closure': 'Button & Zip', 'Pockets': '5', 'Wash Care': 'Machine Wash' },
    features: ['Stretchable Denim', 'Slim Fit', 'Mid Rise', '5 Pocket Design', 'Durable', 'Trendy Wash'],
    inStock: true,
    stockCount: 278,
    isTrending: true,
    isNewArrival: false,
    isFlashSale: false,
    isDealOfDay: false,
    isBestSeller: true,
    colors: ['Blue', 'Black', 'Grey'],
    sizes: ['28', '30', '32', '34', '36'],
    cod: true,
    freeDelivery: true,
    deliveryDays: 5,
    tags: ['jeans', 'denim', 'slim-fit', 'men'],
  },
  {
    id: 14,
    name: 'Smart Watch Ultra Series',
    price: 2499,
    originalPrice: 9999,
    discount: 75,
    image: 'https://images.pexels.com/photos/12564670/pexels-photo-12564670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/12564670/pexels-photo-12564670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
      'https://images.pexels.com/photos/31541678/pexels-photo-31541678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Electronics',
    subcategory: 'Smart Watches',
    brand: 'Noise',
    rating: 4.6,
    reviews: 15234,
    description: 'Ultra series smartwatch with 1.96" AMOLED display, always-on display, Bluetooth calling, 100+ watch faces, and 7 day battery life.',
    specifications: { 'Display': '1.96" AMOLED', 'Battery': '7 Days', 'Water Resistance': 'IP68', 'Sensors': 'SpO2, HR, Stress', 'Sports Modes': '100+', 'Calling': 'Bluetooth' },
    features: ['AMOLED Display', 'Always-On Display', 'Bluetooth Calling', '100+ Watch Faces', '7 Day Battery', 'IP68 Waterproof'],
    inStock: true,
    stockCount: 78,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: false,
    isDealOfDay: true,
    isBestSeller: true,
    colors: ['Black', 'Silver', 'Gold'],
    cod: true,
    freeDelivery: true,
    deliveryDays: 2,
    tags: ['smartwatch', 'ultra', 'amoled', 'calling', 'fitness'],
  },
  {
    id: 15,
    name: 'Premium Leather Wallet',
    price: 299,
    originalPrice: 999,
    discount: 70,
    image: 'https://images.pexels.com/photos/8313383/pexels-photo-8313383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/8313383/pexels-photo-8313383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Fashion',
    subcategory: 'Wallets',
    brand: 'Rupesh Collection',
    rating: 3.9,
    reviews: 2134,
    description: 'Premium genuine leather wallet for men with RFID blocking, multiple card slots, and coin pocket.',
    specifications: { 'Material': 'Genuine Leather', 'Card Slots': '8', 'Compartments': '2 Bill', 'Coin Pocket': 'Yes', 'RFID': 'Blocking', 'Color': 'Brown' },
    features: ['Genuine Leather', 'RFID Blocking', '8 Card Slots', 'Coin Pocket', 'Slim Design', 'Gift Box'],
    inStock: true,
    stockCount: 456,
    isTrending: false,
    isNewArrival: false,
    isFlashSale: true,
    isDealOfDay: false,
    isBestSeller: false,
    colors: ['Brown', 'Black', 'Tan'],
    cod: true,
    freeDelivery: false,
    deliveryDays: 4,
    tags: ['wallet', 'leather', 'rfid', 'men'],
  },
  {
    id: 16,
    name: '20W Fast Mobile Charger',
    price: 499,
    originalPrice: 1499,
    discount: 67,
    image: 'https://images.pexels.com/photos/11677077/pexels-photo-11677077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    images: [
      'https://images.pexels.com/photos/11677077/pexels-photo-11677077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
    ],
    category: 'Electronics',
    subcategory: 'Mobile Chargers',
    brand: 'Portronics',
    rating: 4.2,
    reviews: 9876,
    description: '20W PD fast charger with Type-C port. Compatible with iPhone, Samsung, and all smartphones. BIS certified, compact design.',
    specifications: { 'Wattage': '20W', 'Port': 'Type-C PD', 'Input': '100-240V', 'Protocol': 'PD 3.0, QC 3.0', 'Weight': '50g', 'Safety': 'BIS Certified' },
    features: ['20W PD Fast Charge', 'Universal Compatible', 'BIS Certified', 'Compact Design', 'Over-charge Protection', 'Multi-Protocol'],
    inStock: true,
    stockCount: 567,
    isTrending: false,
    isNewArrival: true,
    isFlashSale: false,
    isDealOfDay: false,
    isBestSeller: false,
    cod: true,
    freeDelivery: true,
    deliveryDays: 3,
    tags: ['charger', 'fast-charging', '20w', 'pd', 'type-c'],
  },
];

const sampleCoupons: Coupon[] = [
  { code: 'WELCOME10', discount: 10, type: 'percentage', minOrder: 500, maxDiscount: 200, validUntil: '2026-12-31', isActive: true, usageLimit: 1000, usedCount: 234 },
  { code: 'FLAT100', discount: 100, type: 'fixed', minOrder: 999, validUntil: '2026-06-30', isActive: true, usageLimit: 500, usedCount: 123 },
  { code: 'MEGA20', discount: 20, type: 'percentage', minOrder: 1500, maxDiscount: 500, validUntil: '2026-12-31', isActive: true, usageLimit: 200, usedCount: 56 },
  { code: 'FASHION15', discount: 15, type: 'percentage', minOrder: 799, maxDiscount: 300, validUntil: '2026-12-31', isActive: true, usageLimit: 300, usedCount: 89 },
  { code: 'ELECTRONICS50', discount: 50, type: 'fixed', minOrder: 499, validUntil: '2026-12-31', isActive: true, usageLimit: 1000, usedCount: 567 },
];

const sampleOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    items: [{ product: sampleProducts[0], quantity: 1 }, { product: sampleProducts[3], quantity: 2 }],
    total: 2297,
    subtotal: 2297,
    tax: 0,
    shipping: 0,
    discount: 0,
    address: { id: '1', name: 'Rupesh Yadav', phone: '9876543210', street: 'Manish Market, Four Bungalow', city: 'Mumbai', state: 'Maharashtra', pincode: '400058', isDefault: true, type: 'office' },
    paymentMethod: 'UPI',
    status: 'delivered',
    createdAt: '2024-12-15T10:30:00',
    estimatedDelivery: '2024-12-18',
    trackingId: 'TRK123456789',
  },
  {
    id: 'ORD-2024-002',
    items: [{ product: sampleProducts[1], quantity: 1 }],
    total: 1499,
    subtotal: 1499,
    tax: 0,
    shipping: 0,
    discount: 0,
    address: { id: '1', name: 'Rupesh Yadav', phone: '9876543210', street: 'Manish Market, Four Bungalow', city: 'Mumbai', state: 'Maharashtra', pincode: '400058', isDefault: true, type: 'office' },
    paymentMethod: 'COD',
    status: 'shipped',
    createdAt: '2025-01-02T14:15:00',
    estimatedDelivery: '2025-01-06',
    trackingId: 'TRK987654321',
  },
];

const sampleReviews: Review[] = [
  { id: 'r1', productId: 1, userId: 'u1', userName: 'Amit Kumar', rating: 5, comment: 'Amazing sound quality! Best earbuds in this price range. Battery backup is incredible.', verified: true, helpful: 234, createdAt: '2024-12-10' },
  { id: 'r2', productId: 1, userId: 'u2', userName: 'Priya Sharma', rating: 4, comment: 'Good product. Bass is punchy. Only issue is the case is a bit bulky.', verified: true, helpful: 89, createdAt: '2024-12-08' },
  { id: 'r3', productId: 2, userId: 'u3', userName: 'Rahul Singh', rating: 4, comment: 'Great smartwatch for the price. Display is bright and clear. Calling feature works well.', verified: true, helpful: 156, createdAt: '2024-12-05' },
  { id: 'r4', productId: 7, userId: 'u4', userName: 'Sneha Patel', rating: 5, comment: 'Perfect fit and comfortable fabric. Color is exactly as shown. Will buy more!', verified: true, helpful: 67, createdAt: '2024-11-28' },
  { id: 'r5', productId: 9, userId: 'u5', userName: 'Vikram Joshi', rating: 4, comment: 'Comfortable shoes, good for daily running. Sole is durable. Value for money.', verified: true, helpful: 45, createdAt: '2024-11-20' },
  { id: 'r6', productId: 14, userId: 'u6', userName: 'Deepak Verma', rating: 5, comment: 'Best smartwatch under 3000. AMOLED display is gorgeous. Battery lasts a week easily.', verified: true, helpful: 312, createdAt: '2024-12-12' },
];

const sampleBanners: Banner[] = [
  { id: 'b1', title: 'Mega Electronics Sale', subtitle: 'Up to 80% Off on Electronics', image: '', link: '/category/Electronics', isActive: true, order: 1 },
  { id: 'b2', title: 'Fashion Week', subtitle: 'Trendy styles at affordable prices', image: '', link: '/category/Fashion', isActive: true, order: 2 },
  { id: 'b3', title: 'New Arrivals', subtitle: 'Check out our latest products', image: '', link: '/new-arrivals', isActive: true, order: 3 },
];

const useStore = create<StoreState>((set, get) => ({
  // Theme
  darkMode: false,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.darkMode;
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { darkMode: newMode };
  }),

  // Auth
  user: null,
  isAuthenticated: false,
  login: (email: string, password: string) => {
    // Admin login - credentials from .env file
    if (email === ADMIN_CONFIG.EMAIL && password === ADMIN_CONFIG.PASSWORD) {
      set({
        user: {
          id: 'admin-1',
          name: 'Rupesh Yadav',
          email: ADMIN_CONFIG.EMAIL,
          phone: STORE_CONFIG.PHONE,
          addresses: [{
            id: '1',
            name: 'Rupesh Yadav',
            phone: STORE_CONFIG.PHONE,
            street: STORE_CONFIG.ADDRESS,
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400058',
            isDefault: true,
            type: 'office',
          }],
          isAdmin: true,
          rewardPoints: 5000,
          walletBalance: 10000,
          joinedAt: '2024-01-01',
        },
        isAuthenticated: true,
      });
      return true;
    }
    // Regular user login
    if (email && password.length >= 4) {
      const name = email.split('@')[0];
      set({
        user: {
          id: `user-${Date.now()}`,
          name: name.charAt(0).toUpperCase() + name.slice(1),
          email,
          phone: '',
          addresses: [],
          isAdmin: false,
          rewardPoints: 100,
          walletBalance: 0,
          joinedAt: new Date().toISOString().split('T')[0],
        },
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  },
  signup: (name: string, email: string, phone: string, password: string) => {
    if (name && email && password.length >= 4) {
      set({
        user: {
          id: `user-${Date.now()}`,
          name,
          email,
          phone,
          addresses: [],
          isAdmin: false,
          rewardPoints: 100,
          walletBalance: 0,
          joinedAt: new Date().toISOString().split('T')[0],
        },
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  updateProfile: (data) => set((state) => ({
    user: state.user ? { ...state.user, ...data } : null,
  })),

  // Products
  products: sampleProducts,
  addProduct: (product) => set((state) => ({
    products: [...state.products, { ...product, id: Math.max(...state.products.map(p => p.id), 0) + 1 }],
  })),
  updateProduct: (id, data) => set((state) => ({
    products: state.products.map((p) => p.id === id ? { ...p, ...data } : p),
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((p) => p.id !== id),
  })),

  // Cart
  cart: [],
  addToCart: (product, quantity = 1, color, size) => set((state) => {
    const existing = state.cart.find((item) => item.product.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      };
    }
    return { cart: [...state.cart, { product, quantity, selectedColor: color, selectedSize: size }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.product.id !== productId),
  })),
  updateCartQuantity: (productId, quantity) => set((state) => ({
    cart: quantity <= 0
      ? state.cart.filter((item) => item.product.id !== productId)
      : state.cart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
  })),
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    const state = get();
    const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    if (state.appliedCoupon) {
      if (state.appliedCoupon.type === 'percentage') {
        const discount = Math.min(
          (subtotal * state.appliedCoupon.discount) / 100,
          state.appliedCoupon.maxDiscount || Infinity
        );
        return Math.max(subtotal - discount, 0);
      }
      return Math.max(subtotal - state.appliedCoupon.discount, 0);
    }
    return subtotal;
  },
  getCartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),

  // Wishlist
  wishlist: [],
  addToWishlist: (product) => set((state) => {
    if (state.wishlist.find((item) => item.product.id === product.id)) {
      return { wishlist: state.wishlist.filter((item) => item.product.id !== product.id) };
    }
    return { wishlist: [...state.wishlist, { product, addedAt: new Date() }] };
  }),
  removeFromWishlist: (productId) => set((state) => ({
    wishlist: state.wishlist.filter((item) => item.product.id !== productId),
  })),
  isInWishlist: (productId) => get().wishlist.some((item) => item.product.id === productId),

  // Orders
  orders: sampleOrders,
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map((o) => o.id === orderId ? { ...o, status } : o),
  })),

  // Reviews
  reviews: sampleReviews,
  addReview: (review) => set((state) => ({ reviews: [review, ...state.reviews] })),

  // Coupons
  coupons: sampleCoupons,
  appliedCoupon: null,
  applyCoupon: (code) => {
    const state = get();
    const coupon = state.coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) return { success: false, message: 'Invalid coupon code' };
    if (!coupon.isActive) return { success: false, message: 'This coupon is no longer active' };
    if (new Date(coupon.validUntil) < new Date()) return { success: false, message: 'This coupon has expired' };
    const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    if (subtotal < coupon.minOrder) return { success: false, message: `Minimum order ₹${coupon.minOrder} required` };
    set({ appliedCoupon: coupon });
    return { success: true, message: 'Coupon applied successfully!' };
  },
  removeCoupon: () => set({ appliedCoupon: null }),
  addCoupon: (coupon) => set((state) => ({ coupons: [...state.coupons, coupon] })),
  updateCoupon: (code, data) => set((state) => ({
    coupons: state.coupons.map((c) => c.code === code ? { ...c, ...data } : c),
  })),
  deleteCoupon: (code) => set((state) => ({
    coupons: state.coupons.filter((c) => c.code !== code),
  })),

  // Banners
  banners: sampleBanners,
  addBanner: (banner) => set((state) => ({ banners: [...state.banners, banner] })),
  updateBanner: (id, data) => set((state) => ({
    banners: state.banners.map((b) => b.id === id ? { ...b, ...data } : b),
  })),
  deleteBanner: (id) => set((state) => ({
    banners: state.banners.filter((b) => b.id !== id),
  })),

  // Notifications
  notifications: [
    { id: 'n1', title: 'Welcome to Rupesh Store!', message: 'Get 10% off on your first order. Use code WELCOME10', type: 'promo', read: false, createdAt: '2025-01-01' },
    { id: 'n2', title: 'Flash Sale Live!', message: 'Electronics at up to 80% off. Limited time only!', type: 'promo', read: false, createdAt: '2025-01-02' },
    { id: 'n3', title: 'Order Shipped', message: 'Your order ORD-2024-002 has been shipped', type: 'order', read: true, createdAt: '2025-01-03' },
  ],
  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications],
  })),
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
  })),
  markAllNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true })),
  })),

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  recentSearches: ['earbuds', 'smartwatch', 't-shirt', 'power bank'],
  addRecentSearch: (query) => set((state) => ({
    recentSearches: [query, ...state.recentSearches.filter((s) => s !== query)].slice(0, 10),
  })),
  clearRecentSearches: () => set({ recentSearches: [] }),

  // Recently Viewed
  recentlyViewed: [],
  addToRecentlyViewed: (product) => set((state) => ({
    recentlyViewed: [product, ...state.recentlyViewed.filter((p) => p.id !== product.id)].slice(0, 20),
  })),

  // Admin Users
  adminUsers: [
    {
      id: 'admin-1',
      name: 'Rupesh Yadav',
      email: 'ry728309@gmail.com',
      phone: '9876543210',
      addresses: [],
      isAdmin: true,
      rewardPoints: 5000,
      walletBalance: 10000,
      joinedAt: '2024-01-01',
    },
  ],

  // Addresses
  addAddress: (address) => set((state) => ({
    user: state.user ? {
      ...state.user,
      addresses: [...state.user.addresses, address],
    } : null,
  })),
  updateAddress: (id, data) => set((state) => ({
    user: state.user ? {
      ...state.user,
      addresses: state.user.addresses.map((a) => a.id === id ? { ...a, ...data } : a),
    } : null,
  })),
  deleteAddress: (id) => set((state) => ({
    user: state.user ? {
      ...state.user,
      addresses: state.user.addresses.filter((a) => a.id !== id),
    } : null,
  })),

  // Compare
  compareList: [],
  addToCompare: (product) => set((state) => {
    if (state.compareList.length >= 4) return state;
    if (state.compareList.find((p) => p.id === product.id)) return state;
    return { compareList: [...state.compareList, product] };
  }),
  removeFromCompare: (productId) => set((state) => ({
    compareList: state.compareList.filter((p) => p.id !== productId),
  })),
  clearCompare: () => set({ compareList: [] }),
}));

export default useStore;
