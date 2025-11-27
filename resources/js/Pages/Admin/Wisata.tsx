import React from 'react';
import { Layout } from '../../Components/Layout';
import { usePage } from '@inertiajs/react';

interface WisataProps {
  places: any;
}

export default function Wisata({ places }: WisataProps) {
  const page = usePage();
  const { csrf_token } = page.props as any;

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Wisata</h1>
              <p className="text-gray-600">Manage places and attractions</p>
            </div>
            <a href="/places/create" className="bg-amber-500 text-red-950 px-4 py-2 rounded">Create Place</a>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <p className="text-gray-600">Total Places: <span className="font-bold text-gray-900">{places.total || places.length || 0}</span></p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Published</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(places.data || places).map((p: any, idx: number) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-900">#{p.id}</td>
                      <td className="py-3 px-4">{p.name}</td>
                      <td className="py-3 px-4">{p.category}</td>
                      <td className="py-3 px-4">{p.published ? 'Yes' : 'No'}</td>
                      <td className="py-3 px-4">
                        <a href={`/places/${p.id}/edit`} className="text-blue-600 hover:underline mr-3">Edit</a>
                        <button onClick={async () => {
                          if (!confirm('Hapus place ini?')) return;
                          try {
                            await fetch(`/places/${p.id}`, {
                              method: 'DELETE',
                              headers: { 'X-CSRF-TOKEN': csrf_token },
                            });
                            window.location.reload();
                          } catch (e) { alert('Gagal menghapus'); }
                        }} className="text-red-600">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
