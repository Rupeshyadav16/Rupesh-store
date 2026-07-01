import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import { ADMIN_CONFIG } from '../config/env';

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, signup, isAuthenticated, user } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  // Redirect if already logged in
  if (isAuthenticated && user) {
    if (user.isAdmin) {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const success = login(form.email, form.password);
      if (success) {
        const currentUser = useStore.getState().user;
        toast.success(`Welcome back${currentUser?.name ? `, ${currentUser.name}` : ''}! 🎉`);
        if (currentUser?.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } else {
      if (!form.name.trim()) { toast.error('Please enter your name'); return; }
      if (!form.email.trim()) { toast.error('Please enter your email'); return; }
      if (form.password.length < 4) { toast.error('Password must be at least 4 characters'); return; }

      const success = signup(form.name, form.email, form.phone, form.password);
      if (success) {
        toast.success('Account created successfully! 🎉');
        navigate('/');
      } else {
        toast.error('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">R</div>
          </Link>
          <h1 className="text-3xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-gray-500 mt-2">
            {isLogin ? 'Login to your Rupesh Store account' : 'Join Rupesh Store today'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Rupesh Yadav"
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ry728309@gmail.com"
                  className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder={isLogin ? 'Enter password' : 'Create password (min 4 chars)'}
                  className="w-full px-4 py-3 pl-11 pr-11 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600" />
                  <span className="text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <button type="button" className="text-primary-600 font-medium hover:underline">Forgot Password?</button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              📱 OTP Login
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              🔵 Google
            </button>
          </div>

          {/* Switch */}
          <p className="text-center text-sm text-gray-500 mt-5">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-600 font-semibold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>

          {/* Admin Hint */}
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
            <p className="text-xs text-yellow-700 dark:text-yellow-300 font-medium">
              🔐 Admin Login: Email: <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">{ADMIN_CONFIG.EMAIL}</code> | Password: <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">{ADMIN_CONFIG.PASSWORD}</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
