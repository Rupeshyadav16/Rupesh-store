import AdminLayout from '../../components/AdminLayout';
import useStore from '../../store/useStore';
import { TrendingUp, ShoppingCart, Users, Package, IndianRupee, Star, Eye, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  const { products, orders, reviews } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = 156; // Mock
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const stats = [
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: IndianRupee, change: '+12.5%', color: 'bg-green-50 dark:bg-green-900/20 text-green-600' },
    { label: 'Total Orders', value: totalOrders.toString(), icon: ShoppingCart, change: '+8.2%', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' },
    { label: 'Total Products', value: totalProducts.toString(), icon: Package, change: '+3', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600' },
    { label: 'Total Customers', value: totalCustomers.toString(), icon: Users, change: '+24', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' },
  ];

  const recentOrders = orders.slice(0, 5);
  const topProducts = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);
  const lowStockProducts = products.filter((p) => p.stockCount < 100).sort((a, b) => a.stockCount - b.stockCount);

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold">Welcome back, Rupesh! 👋</h2>
          <p className="text-white/80 mt-1">Here's what's happening with your store today.</p>
          <div className="flex gap-4 mt-4">
            <div className="px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <p className="text-lg font-bold">{totalOrders}</p>
              <p className="text-xs text-white/70">Orders Today</p>
            </div>
            <div className="px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <p className="text-lg font-bold">₹{avgOrderValue}</p>
              <p className="text-xs text-white/70">Avg. Order</p>
            </div>
            <div className="px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <p className="text-lg font-bold">4.3 ⭐</p>
              <p className="text-xs text-white/70">Store Rating</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={20} />
                </div>
                <span className="flex items-center gap-0.5 text-xs text-green-600 font-medium">
                  {stat.change} <ArrowUpRight size={12} />
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2"><ShoppingCart size={18} /> Recent Orders</h3>
              <a href="/admin/orders" className="text-sm text-primary-600 font-medium">View All</a>
            </div>
            <div className="space-y-3">
              {recentOrders.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No orders yet</p>
              ) : (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{order.id}</p>
                      <p className="text-xs text-gray-500">{order.items.length} items</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">₹{order.total.toLocaleString()}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>{order.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2"><TrendingUp size={18} /> Top Products</h3>
              <a href="/admin/products" className="text-sm text-primary-600 font-medium">View All</a>
            </div>
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                  <span className="text-lg font-bold text-gray-300 w-6">#{i + 1}</span>
                  <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.reviews.toLocaleString()} reviews</p>
                  </div>
                  <p className="font-semibold text-sm">₹{p.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2 text-orange-500">⚠️ Low Stock Alerts</h3>
            </div>
            <div className="space-y-2">
              {lowStockProducts.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                  <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{p.name}</p>
                    <p className={`text-xs font-medium ${p.stockCount < 50 ? 'text-red-500' : 'text-orange-500'}`}>
                      Only {p.stockCount} left
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2"><Star size={18} /> Recent Reviews</h3>
            </div>
            <div className="space-y-3">
              {reviews.slice(0, 4).map((r) => (
                <div key={r.id} className="py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-green-600 text-white rounded text-[10px] font-bold">
                      {r.rating} <Star size={8} fill="white" />
                    </div>
                    <span className="text-sm font-medium">{r.userName}</span>
                    <span className="text-xs text-gray-400">• {r.createdAt}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Eye size={18} /> Quick Analytics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Conversion Rate', value: '3.2%', icon: '📈' },
                { label: 'Avg. Order Value', value: `₹${avgOrderValue}`, icon: '💰' },
                { label: 'Return Rate', value: '2.1%', icon: '↩️' },
                { label: 'Customer Satisfaction', value: '4.3/5', icon: '😊' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="text-lg font-bold">{item.value}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
