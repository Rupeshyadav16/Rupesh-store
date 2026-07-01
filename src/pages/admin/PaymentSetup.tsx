import { useState } from 'react';
import { ExternalLink, Check, AlertCircle, Copy } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { RAZORPAY_KEY_ID, isRazorpayConfigured, isLiveMode } from '../../utils/razorpay';
import toast from 'react-hot-toast';

export default function PaymentSetup() {
  const [, setCopied] = useState('');
  const isConfigured = isRazorpayConfigured();
  const liveMode = isLiveMode();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopied(''), 2000);
  };

  const steps = [
    {
      title: 'Create Razorpay Account',
      description: 'Sign up for a free Razorpay account at razorpay.com',
      action: 'Sign Up',
      link: 'https://dashboard.razorpay.com/signup',
    },
    {
      title: 'Complete KYC Verification',
      description: 'Submit your business documents (PAN, Aadhaar, Bank Details) for verification',
      action: 'Complete KYC',
      link: 'https://dashboard.razorpay.com/app/activation',
    },
    {
      title: 'Add Bank Account',
      description: 'Add your bank account where payments will be settled',
      action: 'Add Bank',
      link: 'https://dashboard.razorpay.com/app/settlement/bank-accounts',
    },
    {
      title: 'Generate API Keys',
      description: 'Go to Settings → API Keys → Generate Key to get your Key ID and Secret',
      action: 'Generate Keys',
      link: 'https://dashboard.razorpay.com/app/keys',
    },
    {
      title: 'Update .env File',
      description: 'Add your Razorpay Key ID to the .env file',
      action: 'View Code',
      link: '#code',
    },
  ];

  return (
    <AdminLayout title="Payment Setup">
      <div className="max-w-3xl space-y-6">
        {/* Status Banner */}
        <div className={`rounded-2xl p-6 ${isConfigured ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900' : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900'}`}>
          <div className="flex items-center gap-3">
            {isConfigured ? (
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <Check size={20} className="text-white" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                <AlertCircle size={20} className="text-white" />
              </div>
            )}
            <div>
              <h2 className={`font-bold text-lg ${isConfigured ? 'text-green-700 dark:text-green-400' : 'text-yellow-700 dark:text-yellow-400'}`}>
                {isConfigured ? 'Razorpay Configured ✓' : 'Razorpay Not Configured'}
              </h2>
              <p className={`text-sm ${isConfigured ? 'text-green-600 dark:text-green-500' : 'text-yellow-600 dark:text-yellow-500'}`}>
                {isConfigured 
                  ? 'Your payment gateway is ready to accept payments' 
                  : 'Complete the setup to receive payments to your bank account'}
              </p>
            </div>
          </div>
        </div>

        {/* Current Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="font-bold mb-4">Current Configuration</h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 font-mono text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">RAZORPAY_KEY_ID:</span>
              <div className="flex items-center gap-2">
                <code className="text-primary-600">{RAZORPAY_KEY_ID}</code>
                <button 
                  onClick={() => copyToClipboard(RAZORPAY_KEY_ID, 'Key ID')}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </div>
          {!isConfigured && (
            <p className="mt-2 text-xs text-orange-600">
              ⚠️ Using demo key. Payments will be simulated, not real.
            </p>
          )}
          {isConfigured && (
            <p className="mt-2 text-xs text-green-600">
              ✅ {liveMode ? 'LIVE MODE - Real payments enabled' : 'TEST MODE - Use test cards only'}
            </p>
          )}
        </div>

        {/* Setup Steps */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="font-bold mb-4">🚀 Setup Steps to Accept Real Payments</h3>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i < 4 && isConfigured ? 'bg-green-500 text-white' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'
                  }`}>
                    {i < 4 && isConfigured ? <Check size={16} /> : i + 1}
                  </div>
                  {i < steps.length - 1 && <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2" />}
                </div>
                <div className="flex-1 pb-6">
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                  {step.link !== '#code' && (
                    <a 
                      href={step.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-sm text-primary-600 font-medium hover:underline"
                    >
                      {step.action} <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Instructions */}
        <div id="code" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="font-bold mb-4">📝 Update Your Code</h3>
          <p className="text-sm text-gray-500 mb-4">
            After getting your Razorpay Key ID, update the <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">.env</code> file in your project root:
          </p>
          <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300">
{`# .env file

# For LIVE payments (real money to your bank):
VITE_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX
VITE_RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXX

# For TEST payments (sandbox mode):
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
VITE_RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXX`}
            </pre>
          </div>
          <button 
            onClick={() => copyToClipboard("VITE_RAZORPAY_KEY_ID=rzp_live_", '.env template')}
            className="mt-3 flex items-center gap-2 text-sm text-primary-600 font-medium"
          >
            <Copy size={14} /> Copy .env Template
          </button>
          <p className="mt-3 text-xs text-gray-500">
            💡 After updating .env, restart the development server for changes to take effect.
          </p>
        </div>

        {/* Test vs Live */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="font-bold mb-4">🔑 Test vs Live Keys</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
              <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Test Mode (rzp_test_...)</h4>
              <ul className="text-sm text-yellow-600 dark:text-yellow-500 space-y-1">
                <li>• Use for development/testing</li>
                <li>• No real money is transferred</li>
                <li>• Test card: 4111 1111 1111 1111</li>
                <li>• Any CVV, any future expiry</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Live Mode (rzp_live_...)</h4>
              <ul className="text-sm text-green-600 dark:text-green-500 space-y-1">
                <li>• Use for production</li>
                <li>• Real money is transferred</li>
                <li>• Requires KYC completion</li>
                <li>• Money settles in 1-2 business days</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Settlement Info */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="font-bold mb-4">💰 How Payments Reach Your Bank</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex-1 text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="text-2xl mb-1">💳</div>
              <p className="font-medium">Customer Pays</p>
            </div>
            <div className="text-gray-400">→</div>
            <div className="flex-1 text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div className="text-2xl mb-1">🔐</div>
              <p className="font-medium">Razorpay</p>
            </div>
            <div className="text-gray-400">→</div>
            <div className="flex-1 text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-2xl mb-1">🏦</div>
              <p className="font-medium">Your Bank</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Razorpay settles payments to your bank account within T+2 business days. You can view all transactions in your Razorpay dashboard.
          </p>
        </div>

        {/* Razorpay Fees */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="font-bold mb-4">💸 Razorpay Fees</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <span>Domestic Cards (Visa, MC, RuPay)</span>
              <span className="font-semibold">2% + GST</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <span>UPI</span>
              <span className="font-semibold">FREE (0%)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <span>Net Banking</span>
              <span className="font-semibold">2% + GST</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <span>Wallets</span>
              <span className="font-semibold">2% + GST</span>
            </div>
            <div className="flex justify-between py-2">
              <span>International Cards</span>
              <span className="font-semibold">3% + GST</span>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6">
          <h3 className="font-bold mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            If you face any issues setting up Razorpay, contact their support team.
          </p>
          <div className="flex gap-3">
            <a 
              href="https://razorpay.com/docs/" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700"
            >
              Razorpay Docs
            </a>
            <a 
              href="https://razorpay.com/support/" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
