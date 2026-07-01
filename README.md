# 🛒 Rupesh Store — Electronics & Fashion E-Commerce Platform

A modern, premium, fully responsive E-commerce web application built with **React, TypeScript, Vite, and Tailwind CSS**. Inspired by Meesho, Flipkart, and Amazon — built for selling affordable electronics and fashion products, complete with a customer storefront, secure checkout, and a full-featured admin panel.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Razorpay](https://img.shields.io/badge/Payments-Razorpay-0C2451?logo=razorpay&logoColor=white)

---

## 🏪 Store Information

| | |
|---|---|
| **Store Name** | Rupesh Store |
| **Owner** | Rupesh Yadav |
| **Email** | ry728309@gmail.com |
| **Address** | Manish Market, Four Bungalow, Andheri West, Mumbai – 400058 |
| **Support** | Chat, Email & WhatsApp |

---

## ✨ Features

### 🛍️ Customer Storefront
- **Home Page** — Hero banner, offer banners, trending products, new arrivals, top rated, flash sale with countdown, deal of the day, category slider, recently viewed, newsletter
- **Product Page** — Multiple images, image zoom, description, specifications, features, reviews & ratings, stock status, COD availability, pincode delivery check, wishlist, share, compare, related products
- **Search** — Instant search, recent searches, popular searches, search suggestions
- **Category & Filters** — Filter by price, brand, rating; sort by popularity, price, rating, discount, newest
- **Cart** — Add/update quantity, apply coupon codes, order summary, free shipping threshold
- **Checkout** — 4-step flow (Login → Address → Payment → Review), guest checkout, address management
- **Payments** — Razorpay integration (UPI, Cards, Net Banking, Wallets) + Cash on Delivery
- **User Account** — Signup/Login, profile, order history, wishlist, wallet, reward points, notifications
- **Order Tracking** — Visual status stepper (Confirmed → Packed → Shipped → Out for Delivery → Delivered)
- **Reviews** — Star ratings, verified purchase badges, helpful votes

### 🛠️ Admin Panel
- **Dashboard** — Revenue, orders, products, customers stats, recent orders, top products, low stock alerts
- **Products** — Full CRUD (add/edit/delete), stock management, tags (Trending, New, Flash Sale, Best Seller)
- **Orders** — View & update order status, filter by status, customer & payment details
- **Customers** — Customer list with order history and lifetime value
- **Coupons** — Create/edit/delete discount coupons (percentage or fixed), usage tracking
- **Analytics** — Revenue charts, category performance, top sellers, order status breakdown
- **Payment Setup** — Razorpay configuration guide and status
- **Settings** — Store info, shipping & tax config, payment methods, notifications, dark mode

### 🔐 Authentication
- Regular user signup/login
- **Auto Admin Detection** — Logging in with the admin email/password automatically redirects to the Admin Panel
- Credentials configurable via `.env` file

### 🎨 UI/UX
- Dark mode & Light mode toggle
- Glassmorphism navbar, rounded cards, smooth animations
- Fully responsive (desktop, tablet, mobile) with bottom navigation on mobile
- Toast notifications for all actions

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM |
| State Management | Zustand |
| Icons | Lucide React |
| Animations | Framer Motion |
| Notifications | React Hot Toast |
| Payments | Razorpay Checkout |

---

## 📁 Project Structure

```
RupeshStore/
├── public/                     # Static assets
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── BottomNav.tsx
│   │   ├── Layout.tsx
│   │   ├── ProductCard.tsx
│   │   └── AdminLayout.tsx
│   ├── pages/                  # Route-level pages
│   │   ├── HomePage.tsx
│   │   ├── ProductPage.tsx
│   │   ├── CategoryPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── WishlistPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── AuthPage.tsx
│   │   └── admin/               # Admin panel pages
│   │       ├── AdminDashboard.tsx
│   │       ├── AdminProducts.tsx
│   │       ├── AdminOrders.tsx
│   │       ├── AdminCustomers.tsx
│   │       ├── AdminCoupons.tsx
│   │       ├── AdminAnalytics.tsx
│   │       ├── AdminSettings.tsx
│   │       └── PaymentSetup.tsx
│   ├── store/
│   │   └── useStore.ts         # Zustand global state (products, cart, orders, auth, etc.)
│   ├── config/
│   │   └── env.ts              # Centralized environment variable config
│   ├── utils/
│   │   ├── razorpay.ts         # Razorpay payment integration
│   │   └── cn.ts
│   ├── App.tsx                 # Route definitions
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles
├── .env                        # Your environment variables (not committed)
├── .env.example                # Environment variable template
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (LTS version) — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/rupesh-store.git
cd rupesh-store
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

Edit `.env`:
```env
# Razorpay (required for online payments)
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
VITE_RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET

# Admin login credentials
VITE_ADMIN_EMAIL=ry728309@gmail.com
VITE_ADMIN_PASSWORD=admin123

# Store info
VITE_STORE_NAME=Rupesh Store
VITE_STORE_EMAIL=ry728309@gmail.com
VITE_STORE_PHONE=9876543210
VITE_STORE_ADDRESS=Manish Market, Four Bungalow, Andheri West, Mumbai – 400058
```

> See [Environment Variables](#-environment-variables) below for the full list.

### 4. Run the Development Server
```bash
npm run dev
```
Open the printed URL (usually `http://localhost:5173`) in your browser.

### 5. Build for Production
```bash
npm run build
```
The optimized output will be in the `dist/` folder.

### 6. Preview Production Build
```bash
npm run preview
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `VITE_RAZORPAY_KEY_ID` | Razorpay Key ID (`rzp_test_...` or `rzp_live_...`) | ✅ For payments |
| `VITE_RAZORPAY_KEY_SECRET` | Razorpay Key Secret | ✅ For payments |
| `VITE_ADMIN_EMAIL` | Admin login email | ✅ |
| `VITE_ADMIN_PASSWORD` | Admin login password | ✅ |
| `VITE_STORE_NAME` | Store display name | Optional |
| `VITE_STORE_EMAIL` | Store contact email | Optional |
| `VITE_STORE_PHONE` | Store phone number | Optional |
| `VITE_STORE_ADDRESS` | Store physical address | Optional |
| `VITE_FIREBASE_*` | Firebase config for push notifications | Optional |
| `VITE_CLOUDINARY_*` | Cloudinary config for image uploads | Optional |
| `VITE_GA_TRACKING_ID` | Google Analytics tracking ID | Optional |
| `VITE_SHIPROCKET_*` | Shiprocket shipping integration | Optional |
| `VITE_SMS_*` | SMS gateway for OTP | Optional |
| `VITE_WHATSAPP_*` | WhatsApp Business API | Optional |

⚠️ **Never commit your `.env` file with real keys.** It's already excluded via `.gitignore`.

---

## 💳 Setting Up Razorpay Payments

To receive **real payments directly to your bank account**:

1. Create an account at [razorpay.com](https://razorpay.com)
2. Complete KYC verification (PAN, Aadhaar, Bank Details)
3. Add your bank account under **Settlements → Bank Accounts**
4. Go to **Settings → API Keys → Generate Key**
5. Copy your **Key ID** and **Key Secret**
6. Add them to your `.env` file:
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX
   VITE_RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXX
   ```
7. Restart the dev server

Payments settle to your bank account within **T+2 business days**. You can monitor the setup status live in **Admin Panel → Payments**.

> ⚠️ Signature verification for payments should ideally be done on a backend server for production security. The current implementation is client-side for demo purposes.

---

## 🔐 Admin Access

Log in using the credentials set in your `.env` file:

- **Email:** `ry728309@gmail.com` (default, from `VITE_ADMIN_EMAIL`)
- **Password:** `admin123` (default, from `VITE_ADMIN_PASSWORD`)

Logging in with these credentials automatically redirects to the **Admin Dashboard** (`/admin`). Any other email/password combination logs in as a regular customer.

---

## 📦 Deployment

This project can be deployed to any static hosting provider.

### Deploy on Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo
3. Add your environment variables under **Environment Variables**
4. Click **Deploy**

### Deploy on Netlify
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
3. Build command: `npm run build` | Publish directory: `dist`
4. Add environment variables under **Site settings → Environment variables**
5. Deploy

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

---

## 🗺️ Categories

**Electronics:** Earbuds, Bluetooth Earphones, Neckband, Smart Watches, Charging Cables, Mobile Chargers, Power Bank, Bluetooth Speaker, Mouse, Keyboard, Pendrive, Memory Card, Laptop & Mobile Accessories

**Fashion:** T-Shirts, Shirts, Jeans, Hoodies, Caps, Wallets, Belts, Shoes, Slippers, Bags, Accessories

---

## 📄 License

This project is proprietary software built for Rupesh Store. All rights reserved © 2025 Rupesh Yadav.

---

## 📞 Contact & Support

- **Email:** ry728309@gmail.com
- **Address:** Manish Market, Four Bungalow, Andheri West, Mumbai – 400058
- **Support Channels:** Chat, Email, WhatsApp

---

<p align="center">Built with ❤️ for Rupesh Store</p>
