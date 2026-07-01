import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import useStore from '../store/useStore';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  packed: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  shipped: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  out_for_delivery: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  returned: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  packed: 'Packed',
  shipped: 'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  returned: 'Returned',
};

const statusSteps = ['confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered'];

export default function OrdersPage() {
  const { orders, isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold mb-2">Please Login</h2>
        <p className="text-gray-500 mb-6">Login to view your orders</p>
        <Link to="/auth" className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold">Login</Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-4">📦</div>
        <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
        <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold">
          <Package size={18} /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 md:py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders ({orders.length})</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <p className="font-mono font-bold text-sm text-primary-600">{order.id}</p>
                <p className="text-xs text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                  {statusLabels[order.status]}
                </span>
                <span className="font-bold">₹{order.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Items */}
            <div className="p-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <img src={item.product.image} alt="" className="w-14 h-14 rounded-lg object-cover bg-gray-100 dark:bg-gray-800" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity} | ₹{item.product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tracking */}
            {!['cancelled', 'returned'].includes(order.status) && (
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between mb-2">
                  {statusSteps.map((step, i) => {
                    const currentIdx = statusSteps.indexOf(order.status);
                    const isComplete = i <= currentIdx;
                    const isCurrent = i === currentIdx;
                    return (
                      <div key={step} className="flex-1 flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                          isComplete ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                        } ${isCurrent ? 'ring-2 ring-green-200 dark:ring-green-800' : ''}`}>
                          {isComplete ? '✓' : i + 1}
                        </div>
                        {i < statusSteps.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-1 ${i < currentIdx ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[9px] text-gray-400 px-0.5">
                  <span>Confirmed</span>
                  <span>Packed</span>
                  <span>Shipped</span>
                  <span>Out</span>
                  <span>Delivered</span>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="px-4 pb-4 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                <span>Payment: {order.paymentMethod}</span>
                {order.trackingId && <span className="ml-3">Track: {order.trackingId}</span>}
              </div>
              <Link to={`/product/${order.items[0]?.product.id}`} className="flex items-center gap-1 text-sm text-primary-600 font-medium">
                Details <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
