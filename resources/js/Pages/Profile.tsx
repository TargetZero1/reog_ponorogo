import { Head, useForm, usePage } from '@inertiajs/react';
import { Layout } from '@/Components/Layout';
import { useState } from 'react';

export default function Profile() {
  const { auth } = usePage().props as any;
  const user = auth?.user;

  const { data, setData, put, errors, processing } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    password_confirmation: '',
  });

  const [success, setSuccess] = useState('');

  function submit(e: any) {
    e.preventDefault();
    put('/profile');
  }

  return (
    <Layout>
      <Head title="Profile" />
      <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-red-950 mb-6">Profil Pengguna</h2>

          {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">{success}</div>}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-500">Nama</label>
              <input
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-red-500 ${errors.name ? 'border-red-300' : 'border-neutral-300'}`}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm text-neutral-500">Email</label>
              <input
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-red-500 ${errors.email ? 'border-red-300' : 'border-neutral-300'}`}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm text-neutral-500">Password (kosongkan jika tidak ingin mengubah)</label>
              <input
                type="password"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-red-500 ${errors.password ? 'border-red-300' : 'border-neutral-300'}`}
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm text-neutral-500">Konfirmasi Password</label>
              <input
                type="password"
                value={data.password_confirmation}
                onChange={e => setData('password_confirmation', e.target.value)}
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-red-500 border-neutral-300"
              />
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" disabled={processing} className="bg-red-700 text-white px-4 py-2 rounded">
                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
