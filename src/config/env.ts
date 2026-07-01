// ============================================
// ENVIRONMENT CONFIGURATION
// ============================================
// All environment variables are read here
// Access them throughout the app via this config
// ============================================

// Helper to get env variable with fallback
const getEnv = (key: string, fallback: string = ''): string => {
  return import.meta.env[key] || fallback;
};

// ============================================
// RAZORPAY CONFIGURATION
// ============================================
export const RAZORPAY_CONFIG = {
  KEY_ID: getEnv('VITE_RAZORPAY_KEY_ID', 'rzp_test_YOUR_KEY_ID'),
  KEY_SECRET: getEnv('VITE_RAZORPAY_KEY_SECRET', ''),
  CURRENCY: 'INR',
  
  // Check if Razorpay is properly configured
  isConfigured: (): boolean => {
    const keyId = getEnv('VITE_RAZORPAY_KEY_ID', '');
    return keyId !== '' && keyId !== 'rzp_test_YOUR_KEY_ID' && keyId.startsWith('rzp_');
  },
  
  // Check if using live mode
  isLiveMode: (): boolean => {
    return getEnv('VITE_RAZORPAY_KEY_ID', '').startsWith('rzp_live_');
  },
};

// ============================================
// STORE CONFIGURATION
// ============================================
export const STORE_CONFIG = {
  NAME: getEnv('VITE_STORE_NAME', 'Rupesh Store'),
  EMAIL: getEnv('VITE_STORE_EMAIL', 'ry728309@gmail.com'),
  PHONE: getEnv('VITE_STORE_PHONE', '9876543210'),
  ADDRESS: getEnv('VITE_STORE_ADDRESS', 'Manish Market, Four Bungalow, Andheri West, Mumbai – 400058'),
  CURRENCY: '₹',
  CURRENCY_CODE: 'INR',
  
  // Shipping
  FREE_SHIPPING_MIN: 499,
  SHIPPING_CHARGE: 49,
  COD_FEE: 40,
  
  // Tax
  TAX_RATE: 0, // 18% GST if needed
};

// ============================================
// ADMIN CONFIGURATION
// ============================================
export const ADMIN_CONFIG = {
  EMAIL: getEnv('VITE_ADMIN_EMAIL', 'ry728309@gmail.com'),
  PASSWORD: getEnv('VITE_ADMIN_PASSWORD', 'admin123'),
};

// ============================================
// FIREBASE CONFIGURATION
// ============================================
export const FIREBASE_CONFIG = {
  API_KEY: getEnv('VITE_FIREBASE_API_KEY', ''),
  AUTH_DOMAIN: getEnv('VITE_FIREBASE_AUTH_DOMAIN', ''),
  PROJECT_ID: getEnv('VITE_FIREBASE_PROJECT_ID', ''),
  STORAGE_BUCKET: getEnv('VITE_FIREBASE_STORAGE_BUCKET', ''),
  MESSAGING_SENDER_ID: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', ''),
  APP_ID: getEnv('VITE_FIREBASE_APP_ID', ''),
  
  isConfigured: (): boolean => {
    return getEnv('VITE_FIREBASE_API_KEY', '') !== '';
  },
};

// ============================================
// CLOUDINARY CONFIGURATION
// ============================================
export const CLOUDINARY_CONFIG = {
  CLOUD_NAME: getEnv('VITE_CLOUDINARY_CLOUD_NAME', ''),
  UPLOAD_PRESET: getEnv('VITE_CLOUDINARY_UPLOAD_PRESET', ''),
  
  isConfigured: (): boolean => {
    return getEnv('VITE_CLOUDINARY_CLOUD_NAME', '') !== '';
  },
  
  getUploadUrl: (): string => {
    const cloudName = getEnv('VITE_CLOUDINARY_CLOUD_NAME', '');
    return `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  },
};

// ============================================
// GOOGLE ANALYTICS CONFIGURATION
// ============================================
export const GA_CONFIG = {
  TRACKING_ID: getEnv('VITE_GA_TRACKING_ID', ''),
  
  isConfigured: (): boolean => {
    return getEnv('VITE_GA_TRACKING_ID', '') !== '';
  },
};

// ============================================
// SHIPROCKET CONFIGURATION
// ============================================
export const SHIPROCKET_CONFIG = {
  EMAIL: getEnv('VITE_SHIPROCKET_EMAIL', ''),
  PASSWORD: getEnv('VITE_SHIPROCKET_PASSWORD', ''),
  
  isConfigured: (): boolean => {
    return getEnv('VITE_SHIPROCKET_EMAIL', '') !== '';
  },
};

// ============================================
// SMS CONFIGURATION
// ============================================
export const SMS_CONFIG = {
  API_KEY: getEnv('VITE_SMS_API_KEY', ''),
  SENDER_ID: getEnv('VITE_SMS_SENDER_ID', ''),
  
  isConfigured: (): boolean => {
    return getEnv('VITE_SMS_API_KEY', '') !== '';
  },
};

// ============================================
// WHATSAPP CONFIGURATION
// ============================================
export const WHATSAPP_CONFIG = {
  API_TOKEN: getEnv('VITE_WHATSAPP_API_TOKEN', ''),
  PHONE_ID: getEnv('VITE_WHATSAPP_PHONE_ID', ''),
  
  isConfigured: (): boolean => {
    return getEnv('VITE_WHATSAPP_API_TOKEN', '') !== '';
  },
};

// ============================================
// APP CONFIGURATION
// ============================================
export const APP_CONFIG = {
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
  MODE: import.meta.env.MODE,
};

// ============================================
// EXPORT ALL CONFIGS
// ============================================
export default {
  razorpay: RAZORPAY_CONFIG,
  store: STORE_CONFIG,
  admin: ADMIN_CONFIG,
  firebase: FIREBASE_CONFIG,
  cloudinary: CLOUDINARY_CONFIG,
  ga: GA_CONFIG,
  shiprocket: SHIPROCKET_CONFIG,
  sms: SMS_CONFIG,
  whatsapp: WHATSAPP_CONFIG,
  app: APP_CONFIG,
};
