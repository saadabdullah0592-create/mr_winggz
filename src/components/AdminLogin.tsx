import { useState } from 'react';
import { Flame, Lock, Mail, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

interface AdminLoginProps {
  onBack: () => void;
}

export default function AdminLogin({ onBack }: AdminLoginProps) {
  const { signIn } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');

    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError(signInError);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      {/* Red glow background */}
      <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-red-700/15 blur-[120px]" />

      <div className="relative w-full max-w-md">
        {/* Back */}
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Website
        </button>

        <div className="animate-fade-up rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-900 shadow-lg shadow-red-900/50">
              <Flame className="h-7 w-7 text-white" strokeWidth={2.5} />
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-wide text-white">
                MR <span className="text-red-600">WINGGZ</span>
              </h1>
              <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-950/20 px-4 py-3 text-sm text-red-400">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-red-500" />
                  Email
                </span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mrwinggz.com"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors focus:border-red-600 focus:bg-white/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                <span className="inline-flex items-center gap-2">
                  <Lock className="h-4 w-4 text-red-500" />
                  Password
                </span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors focus:border-red-600 focus:bg-white/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-red-900/40 transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
