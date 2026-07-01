import AdminLayout from '../../components/AdminLayout';
import useStore from '../../store/useStore';

export default function AdminAnalytics() {
  const { products, orders } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const categoryRevenue = orders.reduce((acc, order) => {
    order.items.forEach((item) => {
      const cat = item.product.category;
      acc[cat] = (acc[cat] || 0) + item.product.price * item.quantity;
    });
    return acc;
  }, {} as Record<string, number>);

  const monthlyData = [
    { month: 'Jul', revenue: 45000, orders: 23 },
    { month: 'Aug', revenue: 52000, orders: 28 },
    { month: 'Sep', revenue: 48000, orders: 25 },
    { month: 'Oct', revenue: 67000, orders: 35 },
    { month: 'Nov', revenue: 89000, orders: 48 },
    { month: 'Dec', revenue: 125000, orders: 67 },
    { month: 'Jan', revenue: 98000, orders: 52 },
  ];

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  const topCategories = Object.entries(categoryRevenue).sort((a, b) => b[1] - a[1]);

  return (
    <AdminLayout title="Analytics">
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, sub: '+12.5% vs last month', color: 'text-green-600' },
            { label: 'Total Orders', value: orders.length.toString(), sub: '+8 this month', color: 'text-blue-600' },
            { label: 'Avg. Order Value', value: `₹${orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0}`, sub: '+5.2% vs last month', color: 'text-purple-600' },
            { label: 'Conversion Rate', value: '3.2%', sub: '+0.5% vs last month', color: 'text-orange-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              <p className={`text-xs mt-1 ${stat.color} font-medium`}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Revenue Chart (Bar Chart) */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="font-bold mb-6">📊 Monthly Revenue</h3>
          <div className="flex items-end gap-3 h-48">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-semibold">₹{(d.revenue / 1000).toFixed(0)}k</span>
                <div
                  className="w-full bg-gradient-to-t from-primary-500 to-purple-400 rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%`, minHeight: '8px' }}
                  title={`₹${d.revenue.toLocaleString()}`}
                />
                <span className="text-[10px] text-gray-500">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Category Revenue */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h3 className="font-bold mb-4">📈 Revenue by Category</h3>
            <div className="space-y-4">
              {topCategories.length > 0 ? topCategories.map(([cat, revenue]) => {
                const pct = totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0;
                return (
                  <div key={cat}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{cat}</span>
                      <span className="text-gray-500">₹{revenue.toLocaleString()} ({pct.toFixed(0)}%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${cat === 'Electronics' ? 'bg-blue-500' : 'bg-pink-500'}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              }) : (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1"><span className="font-medium">Electronics</span><span className="text-gray-500">65%</span></div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1"><span className="font-medium">Fashion</span><span className="text-gray-500">35%</span></div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-pink-500 rounded-full" style={{ width: '35%' }} /></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h3 className="font-bold mb-4">🏆 Top Selling Products</h3>
            <div className="space-y-3">
              {[...products].sort((a, b) => b.reviews - a.reviews).slice(0, 6).map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-300 w-6">#{i + 1}</span>
                  <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.reviews.toLocaleString()} sales</p>
                  </div>
                  <p className="text-sm font-bold">₹{p.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Orders by Status */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h3 className="font-bold mb-4">📦 Orders by Status</h3>
            <div className="space-y-3">
              {[
                { status: 'Delivered', count: orders.filter(o => o.status === 'delivered').length || 1, color: 'bg-green-500' },
                { status: 'Shipped', count: orders.filter(o => o.status === 'shipped').length || 1, color: 'bg-blue-500' },
                { status: 'Confirmed', count: orders.filter(o => o.status === 'confirmed').length || 0, color: 'bg-yellow-500' },
                { status: 'Pending', count: orders.filter(o => o.status === 'pending').length || 0, color: 'bg-orange-500' },
                { status: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length || 0, color: 'bg-red-500' },
              ].map((item) => (
                <div key={item.status} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm flex-1">{item.status}</span>
                  <span className="text-sm font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Insights */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h3 className="font-bold mb-4">👥 Customer Insights</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'New Customers', value: '24', sub: 'this month', icon: '🆕' },
                { label: 'Returning', value: '67%', sub: 'retention rate', icon: '🔄' },
                { label: 'Avg. Items/Order', value: '2.3', sub: 'items per order', icon: '📦' },
                { label: 'Top City', value: 'Mumbai', sub: '42% orders', icon: '📍' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                  <div className="text-xl">{item.icon}</div>
                  <p className="font-bold text-lg">{item.value}</p>
                  <p className="text-[10px] text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
