/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RAZORPAY_KEY_ID: string;
  readonly VITE_RAZORPAY_KEY_SECRET: string;
  readonly VITE_STORE_NAME: string;
  readonly VITE_STORE_EMAIL: string;
  readonly VITE_STORE_PHONE: string;
  readonly VITE_STORE_ADDRESS: string;
  readonly VITE_ADMIN_EMAIL: string;
  readonly VITE_ADMIN_PASSWORD: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_CLOUDINARY_CLOUD_NAME: string;
  readonly VITE_CLOUDINARY_UPLOAD_PRESET: string;
  readonly VITE_GA_TRACKING_ID: string;
  readonly VITE_SHIPROCKET_EMAIL: string;
  readonly VITE_SHIPROCKET_PASSWORD: string;
  readonly VITE_SMS_API_KEY: string;
  readonly VITE_SMS_SENDER_ID: string;
  readonly VITE_WHATSAPP_API_TOKEN: string;
  readonly VITE_WHATSAPP_PHONE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
