// ============================================
// RAZORPAY PAYMENT INTEGRATION
// ============================================
// Configure your Razorpay keys in .env file:
// VITE_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX
// VITE_RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXX
// ============================================

import { RAZORPAY_CONFIG, STORE_CONFIG } from '../config/env';

// Export key for checking in components
export const RAZORPAY_KEY_ID = RAZORPAY_CONFIG.KEY_ID;
export const isRazorpayConfigured = RAZORPAY_CONFIG.isConfigured;
export const isLiveMode = RAZORPAY_CONFIG.isLiveMode;

export interface RazorpayOptions {
  key: string;
  amount: number; // Amount in paise (₹100 = 10000 paise)
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: Record<string, string>;
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdropclose?: boolean;
    confirm_close?: boolean;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      close: () => void;
      on: (event: string, callback: () => void) => void;
    };
  }
}

// Load Razorpay script dynamically
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Create Razorpay payment
export const initiateRazorpayPayment = async (
  amount: number, // Amount in rupees
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  },
  orderId: string,
  onSuccess: (response: RazorpayResponse) => void,
  onFailure: (error: string) => void
): Promise<void> => {
  // Load Razorpay script
  const scriptLoaded = await loadRazorpayScript();
  
  if (!scriptLoaded) {
    onFailure('Failed to load Razorpay. Please check your internet connection.');
    return;
  }

  // Check if key is configured
  if (!RAZORPAY_CONFIG.isConfigured()) {
    // Demo mode - simulate payment for testing
    console.warn('⚠️ Razorpay Key not configured. Running in demo mode.');
    console.warn('Add your key to .env file: VITE_RAZORPAY_KEY_ID=rzp_live_XXXX');
    
    // Simulate payment success after 2 seconds
    setTimeout(() => {
      onSuccess({
        razorpay_payment_id: `demo_pay_${Date.now()}`,
        razorpay_order_id: `demo_order_${orderId}`,
      });
    }, 2000);
    return;
  }

  const options: RazorpayOptions = {
    key: RAZORPAY_CONFIG.KEY_ID,
    amount: Math.round(amount * 100), // Convert to paise
    currency: RAZORPAY_CONFIG.CURRENCY,
    name: STORE_CONFIG.NAME,
    description: `Order #${orderId}`,
    image: 'https://i.imgur.com/3g7nmJC.png', // Store logo
    prefill: {
      name: customerInfo.name,
      email: customerInfo.email,
      contact: customerInfo.phone,
    },
    notes: {
      order_id: orderId,
      store: STORE_CONFIG.NAME,
      customer_email: customerInfo.email,
    },
    theme: {
      color: '#6366f1', // Primary color
    },
    handler: (response) => {
      // Payment successful
      console.log('✅ Payment successful:', response);
      onSuccess(response);
    },
    modal: {
      ondismiss: () => {
        onFailure('Payment cancelled by user');
      },
      escape: true,
      backdropclose: false,
      confirm_close: true,
    },
  };

  try {
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Razorpay error:', error);
    onFailure('Failed to initialize payment. Please try again.');
  }
};

// Verify payment signature (For production, this MUST be done on backend)
export const verifyPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  // ⚠️ WARNING: This verification should be done on your backend server
  // Never expose your key_secret on the client side
  // 
  // Backend verification code (Node.js):
  // const crypto = require('crypto');
  // const expectedSignature = crypto
  //   .createHmac('sha256', key_secret)
  //   .update(orderId + '|' + paymentId)
  //   .digest('hex');
  // return expectedSignature === signature;
  
  console.log('Payment verification:', { orderId, paymentId, signature });
  
  // For demo purposes, return true
  // In production, call your backend API to verify
  return true;
};

// Get payment status
export const getPaymentStatus = async (paymentId: string): Promise<string> => {
  // This should call your backend which then calls Razorpay API
  // Razorpay API: GET /v1/payments/{payment_id}
  console.log('Checking payment status for:', paymentId);
  return 'captured'; // Demo response
};

// Payment method configurations
export const PAYMENT_METHODS = {
  razorpay: {
    id: 'razorpay',
    name: 'Pay Online',
    description: 'UPI, Cards, Net Banking, Wallets',
    icon: '💳',
    enabled: true,
  },
  cod: {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive',
    icon: '💵',
    enabled: true,
    fee: STORE_CONFIG.COD_FEE,
  },
};

// UPI Apps for deep linking (optional enhancement)
export const UPI_APPS = [
  { id: 'gpay', name: 'Google Pay', package: 'com.google.android.apps.nbu.paisa.user', icon: '🟢' },
  { id: 'phonepe', name: 'PhonePe', package: 'com.phonepe.app', icon: '🟣' },
  { id: 'paytm', name: 'Paytm', package: 'net.one97.paytm', icon: '🔵' },
  { id: 'bhim', name: 'BHIM', package: 'in.org.npci.upiapp', icon: '🟠' },
];
