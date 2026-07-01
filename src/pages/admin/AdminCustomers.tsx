import AdminLayout from '../../components/AdminLayout';

export default function AdminCustomers() {
  const mockCustomers = [
    { id: 1, name: 'Amit Kumar', email: 'amit@email.com', phone: '9876543210', orders: 5, spent: 4599, joined: '2024-10-15' },
    { id: 2, name: 'Priya Sharma', email: 'priya@email.com', phone: '9876543211', orders: 3, spent: 2799, joined: '2024-11-02' },
    { id: 3, name: 'Rahul Singh', email: 'rahul@email.com', phone: '9876543212', orders: 8, spent: 12499, joined: '2024-08-20' },
    { id: 4, name: 'Sneha Patel', email: 'sneha@email.com', phone: '9876543213', orders: 2, spent: 1598, joined: '2024-12-01' },
    { id: 5, name: 'Vikram Joshi', email: 'vikram@email.com', phone: '9876543214', orders: 12, spent: 23999, joined: '2024-06-15' },
    { id: 6, name: 'Deepak Verma', email: 'deepak@email.com', phone: '9876543215', orders: 4, spent: 5698, joined: '2024-09-10' },
    { id: 7, name: 'Anita Reddy', email: 'anita@email.com', phone: '9876543216', orders: 6, spent: 8999, joined: '2024-07-25' },
    { id: 8, name: 'Ravi Gupta', email: 'ravi@email.com', phone: '9876543217', orders: 1, spent: 899, joined: '2025-01-05' },
  ];

  return (
    <AdminLayout title="Customers">
      <div className="space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Customers', value: '156', icon: '👥' },
            { label: 'New This Month', value: '24', icon: '🆕' },
            { label: 'Active Users', value: '89', icon: '✅' },
            { label: 'Avg. Lifetime Value', value: '₹3,456', icon: '💰' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Customer</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Phone</th>
                  <th className="text-left px-4 py-3 font-semibold">Orders</th>
                  <th className="text-left px-4 py-3 font-semibold">Total Spent</th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Joined</th>
                </tr>
              </thead>
              <tbody>
                {mockCustomers.map((c) => (
                  <tr key={c.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold text-sm">{c.name.charAt(0)}</div>
                        <div>
                          <p className="font-medium">{c.name}</p>
                          <p className="text-xs text-gray-500">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-500">{c.phone}</td>
                    <td className="px-4 py-3 font-semibold">{c.orders}</td>
                    <td className="px-4 py-3 font-semibold">₹{c.spent.toLocaleString()}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-500">{new Date(c.joined).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
