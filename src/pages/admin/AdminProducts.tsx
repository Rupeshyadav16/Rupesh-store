import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import useStore, { Product } from '../../store/useStore';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: '', price: '', originalPrice: '', category: 'Electronics', subcategory: 'Earbuds',
    brand: '', description: '', image: '', inStock: true, stockCount: '100',
    isTrending: false, isNewArrival: false, isFlashSale: false, isDealOfDay: false, isBestSeller: false,
  });

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!form.name || !form.price || !form.brand) {
      toast.error('Please fill required fields');
      return;
    }

    const price = Number(form.price);
    const originalPrice = Number(form.originalPrice) || price;
    const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const productData: Omit<Product, 'id'> & { id: number } = {
      id: editingProduct?.id || 0,
      name: form.name,
      price,
      originalPrice,
      discount,
      image: form.image || 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400',
      images: [form.image || 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400'],
      category: form.category,
      subcategory: form.subcategory,
      brand: form.brand,
      rating: editingProduct?.rating || 4.0,
      reviews: editingProduct?.reviews || 0,
      description: form.description || `Premium ${form.name}`,
      specifications: editingProduct?.specifications || {},
      features: editingProduct?.features || [],
      inStock: form.inStock,
      stockCount: Number(form.stockCount),
      isTrending: form.isTrending,
      isNewArrival: form.isNewArrival,
      isFlashSale: form.isFlashSale,
      isDealOfDay: form.isDealOfDay,
      isBestSeller: form.isBestSeller,
      cod: true,
      freeDelivery: price >= 499,
      deliveryDays: 3,
      tags: form.name.toLowerCase().split(' '),
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast.success('Product updated! ✅');
    } else {
      addProduct(productData as Product);
      toast.success('Product added! 🎉');
    }

    setShowForm(false);
    setEditingProduct(null);
    setForm({ name: '', price: '', originalPrice: '', category: 'Electronics', subcategory: 'Earbuds', brand: '', description: '', image: '', inStock: true, stockCount: '100', isTrending: false, isNewArrival: false, isFlashSale: false, isDealOfDay: false, isBestSeller: false });
  };

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({
      name: p.name, price: String(p.price), originalPrice: String(p.originalPrice),
      category: p.category, subcategory: p.subcategory, brand: p.brand,
      description: p.description, image: p.image, inStock: p.inStock,
      stockCount: String(p.stockCount), isTrending: p.isTrending, isNewArrival: p.isNewArrival,
      isFlashSale: p.isFlashSale, isDealOfDay: p.isDealOfDay, isBestSeller: p.isBestSeller,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast.success('Product deleted');
    }
  };

  return (
    <AdminLayout title="Products">
      <div className="space-y-4">
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button onClick={() => { setShowForm(true); setEditingProduct(null); setForm({ name: '', price: '', originalPrice: '', category: 'Electronics', subcategory: 'Earbuds', brand: '', description: '', image: '', inStock: true, stockCount: '100', isTrending: false, isNewArrival: false, isFlashSale: false, isDealOfDay: false, isBestSeller: false }); }} className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700">
            <Plus size={18} /> Add Product
          </button>
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setShowForm(false)} />
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <h3 className="text-lg font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Product Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" placeholder="Product name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price (₹) *</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" placeholder="999" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Original Price (₹)</label>
                  <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" placeholder="2999" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Brand *</label>
                  <input type="text" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" placeholder="Brand name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm">
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subcategory</label>
                  <input type="text" value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" placeholder="Earbuds" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock Count</label>
                  <input type="number" value={form.stockCount} onChange={(e) => setForm({ ...form, stockCount: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm" placeholder="https://..." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm h-20" placeholder="Product description..." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: 'inStock', label: 'In Stock' },
                      { key: 'isTrending', label: '🔥 Trending' },
                      { key: 'isNewArrival', label: '🆕 New' },
                      { key: 'isFlashSale', label: '⚡ Flash Sale' },
                      { key: 'isDealOfDay', label: '🏷️ Deal' },
                      { key: 'isBestSeller', label: '🏆 Best Seller' },
                    ].map((tag) => (
                      <button
                        key={tag.key}
                        type="button"
                        onClick={() => setForm({ ...form, [tag.key]: !(form as any)[tag.key] })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          (form as any)[tag.key] ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-400 text-primary-600' : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleSave} className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-semibold">Price</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Stock</th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Rating</th>
                  <th className="text-left px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <p className="font-medium line-clamp-1">{p.name}</p>
                          <p className="text-xs text-gray-500">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">{p.subcategory}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold">₹{p.price}</p>
                      {p.discount > 0 && <p className="text-[10px] text-green-600">{p.discount}% off</p>}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`text-xs font-medium ${p.stockCount < 50 ? 'text-red-500' : p.stockCount < 100 ? 'text-orange-500' : 'text-green-600'}`}>
                        {p.stockCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="flex items-center gap-0.5">⭐ {p.rating}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <a href={`/product/${p.id}`} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500"><Eye size={16} /></a>
                        <button onClick={() => handleEdit(p)} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-blue-500"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-500">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
