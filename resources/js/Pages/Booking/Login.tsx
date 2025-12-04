import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Layout } from '../../Components/Layout';
import { useTranslations, getLocalizedRoute } from '@/utils/translations';

export default function Login() {
  const { locale } = useTranslations();
  const [attraction, setAttraction] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('attraction') || '';
    }
    return '';
  });

  const { data, setData, post, errors, processing } = useForm({
    email: '',
    password: '',
  });

  function submit(e: any) {
    e.preventDefault();
    const url = getLocalizedRoute('pesan.login.post', {}, locale);
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
            <h1 className="text-3xl font-bold text-red-950 mb-2">Masuk Sekarang</h1>
            <p className="text-gray-600">Masuk ke akun Anda untuk pesan tiket</p>
          </div>

          {(errors.email || errors.password) && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 rounded">
              {errors.email && <p className="text-red-700 text-sm mb-1 font-semibold">{errors.email}</p>}
              {errors.password && <p className="text-red-700 text-sm mb-1 font-semibold">{errors.password}</p>}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
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

            <div>
              <label className="block text-sm font-semibold text-red-950 mb-2">Password</label>
              <input
                type="password"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                placeholder="Masukkan password Anda"
                className={`w-full border-2 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                  errors.password ? 'border-red-400' : 'border-gray-300'
                }`}
              />
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
              {processing ? 'Memproses...' : 'Masuk'}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Belum punya akun?{' '}
              <a
                href={`${getLocalizedRoute('pesan.register', {}, locale)}${attraction ? `?attraction=${encodeURIComponent(attraction)}` : ''}`}
                className="text-red-600 font-semibold hover:text-red-700"
              >
                Daftar di sini
              </a>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}
