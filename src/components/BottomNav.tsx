import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, Heart, User } from 'lucide-react';
import useStore from '../store/useStore';

export default function BottomNav() {
  const location = useLocation();
  const { cart, isAuthenticated, user } = useStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: cartCount },
    { path: '/wishlist', icon: Heart, label: 'Wishlist' },
    { path: isAuthenticated ? (user?.isAdmin ? '/admin' : '/profile') : '/auth', icon: User, label: isAuthenticated ? 'Account' : 'Login' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass dark:glass border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <div className="relative">
                <item.icon size={22} fill={isActive ? 'currentColor' : 'none'} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-primary-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
