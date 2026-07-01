import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();
  const [filter, setFilter] = useState('all');

  const filteredOrders = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  const statusOptions = ['pending', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned'] as const;

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    packed: 'bg-purple-100 text-purple-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    out_for_delivery: 'bg-orange-100 text-orange-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    returned: 'bg-gray-100 text-gray-700',
  };

  return (
    <AdminLayout title="Orders">
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {['all', ...statusOptions].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap capitalize transition-colors ${
                filter === s
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {s === 'out_for_delivery' ? 'Out for Delivery' : s} ({s === 'all' ? orders.length : orders.filter((o) => o.status === s).length})
            </button>
          ))}
        </div>

        {/* Orders */}
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="text-4xl mb-2">📦</div>
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="font-mono font-bold text-primary-600">{order.id}</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={order.status}
                      onChange={(e) => { updateOrderStatus(order.id, e.target.value as any); toast.success(`Order ${order.id} updated to ${e.target.value}`); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 ${statusColors[order.status] || 'bg-gray-100'}`}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s === 'out_for_delivery' ? 'Out for Delivery' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                    <span className="font-bold">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                      <img src={item.product.image} alt="" className="w-10 h-10 rounded-md object-cover" />
                      <div>
                        <p className="text-xs font-medium line-clamp-1 max-w-[150px]">{item.product.name}</p>
                        <p className="text-[10px] text-gray-500">x{item.quantity} • ₹{item.product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 text-xs text-gray-500">
                  <span>📍 {order.address.city}, {order.address.state}</span>
                  <span>💳 {order.paymentMethod}</span>
                  <span>👤 {order.address.name}</span>
                  <span>📞 {order.address.phone}</span>
                  {order.trackingId && <span>🚚 {order.trackingId}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
