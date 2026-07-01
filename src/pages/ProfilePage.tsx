import { Link, useNavigate } from 'react-router-dom';
import { Package, Heart, MapPin, Bell, Settings, LogOut, ChevronRight, Shield, Gift, Wallet, HelpCircle } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, orders, wishlist, notifications } = useStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-2xl font-bold mb-2">Please Login</h2>
        <p className="text-gray-500 mb-6">Login to access your account</p>
        <Link to="/auth" className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold">Login</Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const menuItems = [
    { icon: Package, label: 'My Orders', desc: `${orders.length} orders`, path: '/orders', color: 'text-blue-500' },
    { icon: Heart, label: 'Wishlist', desc: `${wishlist.length} items`, path: '/wishlist', color: 'text-red-500' },
    { icon: MapPin, label: 'Addresses', desc: `${user.addresses.length} saved`, path: '#', color: 'text-green-500' },
    { icon: Bell, label: 'Notifications', desc: `${notifications.filter(n => !n.read).length} unread`, path: '#', color: 'text-yellow-500' },
    { icon: Wallet, label: 'Wallet', desc: `₹${user.walletBalance}`, path: '#', color: 'text-purple-500' },
    { icon: Gift, label: 'Reward Points', desc: `${user.rewardPoints} coins`, path: '#', color: 'text-orange-500' },
    { icon: Shield, label: 'Security', desc: 'Password & Privacy', path: '#', color: 'text-cyan-500' },
    { icon: HelpCircle, label: 'Help & Support', desc: 'FAQs, Chat, Email', path: '#', color: 'text-pink-500' },
    { icon: Settings, label: 'Settings', desc: 'App preferences', path: '#', color: 'text-gray-500' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 md:py-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold backdrop-blur-sm border-2 border-white/30">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-white/80 text-sm">{user.email}</p>
            {user.phone && <p className="text-white/60 text-xs">📞 {user.phone}</p>}
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="font-bold text-lg">{orders.length}</p>
            <p className="text-xs text-white/70">Orders</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="font-bold text-lg">🪙 {user.rewardPoints}</p>
            <p className="text-xs text-white/70">Coins</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="font-bold text-lg">₹{user.walletBalance}</p>
            <p className="text-xs text-white/70">Wallet</p>
          </div>
        </div>
        {user.isAdmin && (
          <Link to="/admin" className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl text-sm font-medium backdrop-blur-sm hover:bg-white/30 transition-colors">
            🛠️ Go to Admin Panel
          </Link>
        )}
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all"
          >
            <div className={`w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center ${item.color}`}>
              <item.icon size={20} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </Link>
        ))}

        {/* Notifications inline */}
        {notifications.filter(n => !n.read).length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 mt-4">
            <h3 className="font-semibold mb-3">Recent Notifications</h3>
            {notifications.filter(n => !n.read).slice(0, 3).map((n) => (
              <div key={n.id} className="py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-gray-500">{n.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors mt-4"
        >
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <LogOut size={20} />
          </div>
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
