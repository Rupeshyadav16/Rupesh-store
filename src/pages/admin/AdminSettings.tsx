import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const { darkMode, toggleDarkMode } = useStore();
  const [settings, setSettings] = useState({
    storeName: 'Rupesh Store',
    email: 'ry728309@gmail.com',
    phone: '9876543210',
    address: 'Manish Market, Four Bungalow, Andheri West, Mumbai – 400058',
    currency: 'INR',
    taxRate: '18',
    freeShippingMin: '499',
    shippingCharge: '49',
    codEnabled: true,
    upiEnabled: true,
    cardEnabled: true,
    netBankingEnabled: true,
    walletEnabled: true,
    emiEnabled: false,
    orderNotifications: true,
    stockAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully! ✅');
  };

  return (
    <AdminLayout title="Settings">
      <div className="max-w-3xl space-y-6">
        {/* Store Info */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="font-bold text-lg mb-4">🏪 Store Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Store Name</label>
              <input type="text" value={settings.storeName} onChange={(e) => setSettings({ ...settings, storeName: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input type="tel" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select value={settings.currency} onChange={(e) => setSettings({ ...settings, currency: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm">
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm h-20" />
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="font-bold text-lg mb-4">🚚 Shipping & Tax</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Free Shipping Min (₹)</label>
              <input type="number" value={settings.freeShippingMin} onChange={(e) => setSettings({ ...settings, freeShippingMin: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Shipping Charge (₹)</label>
              <input type="number" value={settings.shippingCharge} onChange={(e) => setSettings({ ...settings, shippingCharge: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
              <input type="number" value={settings.taxRate} onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="font-bold text-lg mb-4">💳 Payment Methods</h3>
          <div className="space-y-3">
            {[
              { key: 'upiEnabled', label: 'UPI (Google Pay, PhonePe, Paytm)', icon: '📱' },
              { key: 'cardEnabled', label: 'Debit/Credit Card', icon: '💳' },
              { key: 'netBankingEnabled', label: 'Net Banking', icon: '🏧' },
              { key: 'codEnabled', label: 'Cash on Delivery', icon: '💵' },
              { key: 'walletEnabled', label: 'Wallet', icon: '👛' },
              { key: 'emiEnabled', label: 'EMI', icon: '📋' },
            ].map((method) => (
              <label key={method.key} className="flex items-center justify-between py-2 cursor-pointer">
                <span className="flex items-center gap-2 text-sm">
                  <span>{method.icon}</span> {method.label}
                </span>
                <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${(settings as any)[method.key] ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`} onClick={() => setSettings({ ...settings, [method.key]: !(settings as any)[method.key] })}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${(settings as any)[method.key] ? 'translate-x-5.5 left-0.5' : 'left-0.5'}`} style={{ transform: `translateX(${(settings as any)[method.key] ? '22px' : '0'})` }} />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="font-bold text-lg mb-4">🔔 Notifications</h3>
          <div className="space-y-3">
            {[
              { key: 'orderNotifications', label: 'Order Notifications' },
              { key: 'stockAlerts', label: 'Low Stock Alerts' },
              { key: 'emailNotifications', label: 'Email Notifications' },
              { key: 'smsNotifications', label: 'SMS Notifications' },
            ].map((item) => (
              <label key={item.key} className="flex items-center justify-between py-2 cursor-pointer">
                <span className="text-sm">{item.label}</span>
                <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${(settings as any)[item.key] ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`} onClick={() => setSettings({ ...settings, [item.key]: !(settings as any)[item.key] })}>
                  <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" style={{ transform: `translateX(${(settings as any)[item.key] ? '22px' : '2px'})` }} />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="font-bold text-lg mb-4">🎨 Appearance</h3>
          <label className="flex items-center justify-between py-2 cursor-pointer">
            <span className="text-sm font-medium">Dark Mode</span>
            <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${darkMode ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`} onClick={toggleDarkMode}>
              <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" style={{ transform: `translateX(${darkMode ? '22px' : '2px'})` }} />
            </div>
          </label>
          <label className="flex items-center justify-between py-2 cursor-pointer">
            <span className="text-sm font-medium">Maintenance Mode</span>
            <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${settings.maintenanceMode ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}`} onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}>
              <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" style={{ transform: `translateX(${settings.maintenanceMode ? '22px' : '2px'})` }} />
            </div>
          </label>
        </div>

        <button onClick={handleSave} className="w-full py-3.5 bg-primary-600 text-white rounded-xl font-bold text-sm hover:bg-primary-700 transition-colors">
          Save Settings
        </button>
      </div>
    </AdminLayout>
  );
}
