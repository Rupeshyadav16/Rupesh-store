import { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import useStore, { Coupon } from '../../store/useStore';
import toast from 'react-hot-toast';

export default function AdminCoupons() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [form, setForm] = useState({
    code: '', discount: '', type: 'percentage' as 'percentage' | 'fixed',
    minOrder: '', maxDiscount: '', validUntil: '2026-12-31', usageLimit: '100',
  });

  const handleSave = () => {
    if (!form.code || !form.discount) { toast.error('Fill required fields'); return; }
    const coupon: Coupon = {
      code: form.code.toUpperCase(),
      discount: Number(form.discount),
      type: form.type,
      minOrder: Number(form.minOrder) || 0,
      maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : undefined,
      validUntil: form.validUntil,
      isActive: true,
      usageLimit: Number(form.usageLimit) || 100,
      usedCount: editing?.usedCount || 0,
    };

    if (editing) {
      updateCoupon(editing.code, coupon);
      toast.success('Coupon updated!');
    } else {
      addCoupon(coupon);
      toast.success('Coupon created! 🎉');
    }
    setShowForm(false);
    setEditing(null);
    setForm({ code: '', discount: '', type: 'percentage', minOrder: '', maxDiscount: '', validUntil: '2026-12-31', usageLimit: '100' });
  };

  return (
    <AdminLayout title="Coupons">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">{coupons.length} coupons</p>
          <button onClick={() => { setShowForm(true); setEditing(null); }} className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700">
            <Plus size={18} /> Add Coupon
          </button>
        </div>

        {showForm && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h3 className="font-bold mb-4">{editing ? 'Edit Coupon' : 'New Coupon'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Code *</label>
                <input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm font-mono" placeholder="SAVE20" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Discount *</label>
                <input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" placeholder="20" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm">
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed (₹)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Min Order (₹)</label>
                <input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" placeholder="500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Max Discount (₹)</label>
                <input type="number" value={form.maxDiscount} onChange={(e) => setForm({ ...form, maxDiscount: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" placeholder="500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Valid Until</label>
                <input type="date" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Usage Limit</label>
                <input type="number" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleSave} className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium">Save</button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm">Cancel</button>
            </div>
          </div>
        )}

        {/* Coupons List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coupons.map((c) => (
            <div key={c.code} className={`bg-white dark:bg-gray-900 rounded-2xl border-2 p-4 ${c.isActive ? 'border-green-200 dark:border-green-900/50' : 'border-gray-200 dark:border-gray-700 opacity-60'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-lg text-primary-600">{c.code}</span>
                <div className="flex gap-1">
                  <button onClick={() => { setEditing(c); setForm({ code: c.code, discount: String(c.discount), type: c.type, minOrder: String(c.minOrder), maxDiscount: c.maxDiscount ? String(c.maxDiscount) : '', validUntil: c.validUntil, usageLimit: String(c.usageLimit) }); setShowForm(true); }} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><Edit size={14} /></button>
                  <button onClick={() => { deleteCoupon(c.code); toast.success('Deleted'); }} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
              <p className="text-sm font-semibold">{c.type === 'percentage' ? `${c.discount}% OFF` : `₹${c.discount} OFF`}</p>
              <p className="text-xs text-gray-500">Min order: ₹{c.minOrder} {c.maxDiscount ? `• Max: ₹${c.maxDiscount}` : ''}</p>
              <div className="flex items-center justify-between mt-3 text-xs">
                <span className="text-gray-500">Used: {c.usedCount}/{c.usageLimit}</span>
                <span className="text-gray-500">Expires: {c.validUntil}</span>
              </div>
              <div className="mt-2 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full" style={{ width: `${(c.usedCount / c.usageLimit) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
