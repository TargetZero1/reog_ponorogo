import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Layout } from '../../Components/Layout';
import { useTranslations, getLocalizedRoute } from '@/utils/translations';

export default function Register() {
  const { locale } = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [attraction, setAttraction] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('attraction') || '';
    }
    return '';
  });

  const { data, setData, post, errors, processing } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    attraction: attraction,
  });

  function submit(e: any) {
    e.preventDefault();
    const url = getLocalizedRoute('pesan.register.post', {}, locale);
    if (attraction) {
      post(`${url}?attraction=${encodeURIComponent(attraction)}`);
    } else {
      post(url);
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-red-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-red-950 mb-2">Daftar Sekarang</h1>
            <p className="text-gray-600">Buat akun untuk pesan tiket Reog Ponorogo</p>
          </div>

          {(errors.name || errors.email || errors.password) && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 rounded">
              {errors.name && <p className="text-red-700 text-sm mb-1 font-semibold">{errors.name}</p>}
              {errors.email && <p className="text-red-700 text-sm mb-1 font-semibold">{errors.email}</p>}
              {errors.password && <p className="text-red-700 text-sm mb-1 font-semibold">{errors.password}</p>}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-red-950 mb-2">Nama Lengkap</label>
              <input
                type="text"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                placeholder="Masukkan nama Anda"
                className={`w-full border-2 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                  errors.name ? 'border-red-400' : 'border-gray-300'
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-red-950 mb-2">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                placeholder="contoh@email.com"
                className={`w-full border-2 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                  errors.email ? 'border-red-400' : 'border-gray-300'
                }`}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-red-950 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className={`w-full border-2 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                    errors.password ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Password Confirmation */}
            <div>
              <label className="block text-sm font-semibold text-red-950 mb-2">Konfirmasi Password</label>
              <div className="relative">
                <input
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={data.password_confirmation}
                  onChange={e => setData('password_confirmation', e.target.value)}
                  placeholder="Ulangi password"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswordConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {attraction && (
              <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-lg">
                <p className="text-sm text-amber-900">
                  <span className="font-semibold">Destinasi:</span> {attraction}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition disabled:opacity-50 mt-6"
            >
              {processing ? 'Mendaftar...' : 'Daftar'}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Sudah punya akun?{' '}
              <a
                href={`${getLocalizedRoute('pesan.login', {}, locale)}${attraction ? `?attraction=${encodeURIComponent(attraction)}` : ''}`}
                className="text-red-600 font-semibold hover:text-red-700"
              >
                Masuk di sini
              </a>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}
