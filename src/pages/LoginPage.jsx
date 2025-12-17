import { useState } from 'react';
import Button from '../components/Button';

export default function LoginPage({ onNavigate }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Simulate login delay
    setTimeout(() => {
      onNavigate('dashboard');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo & Branding */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">HealthAI</h1>
          <p className="text-slate-400">Provider Data Validation Platform</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Welcome</h2>
            <p className="text-slate-400 text-sm">Enterprise-grade AI provider validation for healthcare payers</p>
          </div>

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
          </Button>

          <p className="text-xs text-slate-500 text-center mt-6">
            Demo Mode: No credentials required
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-xs">
            Validating 80%+ correctable provider data errors in real-time
          </p>
        </div>
      </div>
    </div>
  );
}
