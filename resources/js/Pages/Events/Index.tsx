import { router } from '@inertiajs/react';
import React from 'react';
import { Layout } from '../../Components/Layout';
import { Trash2, Edit, Eye, Plus, Calendar, MapPin, Users, Eye as EyeOff } from 'lucide-react';

export default function Index(props: any) {
  const events = props.events || { data: [] };
  const places = props.places || { data: [] };
  const [tab, setTab] = React.useState<'events' | 'places'>('events');

  function deleteEvent(id: number) {
    if (!confirm('Yakin ingin menghapus event ini?')) return;
    router.delete(route('admin.events.destroy', id));
  }

  function togglePublish(id: number, currentStatus: boolean) {
    router.patch(route('admin.events.toggle-publish', id), {}, { preserveScroll: true });
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6b0000] via-[#7b0b0b] to-[#8b0b0b] text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Kelola Pertunjukan Reog</h1>
            <p className="text-red-100">Manage all events and performances for Reog Ponorogo</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8 flex items-center justify-between">
            <div className="space-x-2">
              <button onClick={() => setTab('events')} className={`px-4 py-2 rounded ${tab === 'events' ? 'bg-red-700 text-white' : 'bg-white text-red-700 border'}`}>Events</button>
              <button onClick={() => setTab('places')} className={`px-4 py-2 rounded ${tab === 'places' ? 'bg-amber-500 text-red-950' : 'bg-white text-red-700 border'}`}>Places</button>
            </div>

            <div className="flex items-center gap-3">
              {tab === 'events' && (
                <a
                  href={route('events.index')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold hover:bg-blue-100 transition border border-blue-200"
                >
                  <Eye size={18} />
                  Lihat Situs Publik
                </a>
              )}
              {tab === 'events' ? (
                <a
                  href={route('admin.events.create')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-red-950 rounded-lg font-semibold hover:from-amber-400 hover:to-amber-500 transition shadow-lg"
                >
                  <Plus size={20} />
                  Tambah Event Baru
                </a>
              ) : (
                <a
                  href={route('admin.places.create')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-red-950 rounded-lg font-semibold hover:from-amber-400 hover:to-amber-500 transition shadow-lg"
                >
                  <Plus size={20} />
                  Tambah Place Baru
                </a>
              )}
            </div>
          </div>
          
          {/* Info Banner */}
          {tab === 'events' && (
            <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Info:</strong> Hanya event yang dipublikasikan yang akan muncul di halaman publik (<a href={route('events.index')} target="_blank" rel="noopener noreferrer" className="underline font-semibold">/events</a>). 
                Event draft hanya terlihat di panel admin ini.
              </p>
            </div>
          )}

          {/* Content Grid */}
          {tab === 'events' ? (
            events.data.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center border-2 border-red-100">
                <div className="text-gray-400 mb-4 text-6xl">📅</div>
                <p className="text-gray-600 text-lg mb-4">Belum ada event yang dibuat</p>
                <a
                  href={route('admin.events.create')}
                  className="inline-block px-6 py-2 bg-amber-500 text-red-950 rounded-lg font-semibold hover:bg-amber-600"
                >
                  Buat Event Pertama
                </a>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.data.map((e: any) => (
                  <div
                    key={e.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border-l-4 border-red-600 group"
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-50 to-amber-50 p-4 border-b border-red-100">
                      <h3 className="font-bold text-lg text-red-950 group-hover:text-red-700 transition line-clamp-2">
                        {e.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {e.published ? (
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                            Published
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                            Draft
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <Calendar size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                        <span>
                          {e.date ? new Date(e.date).toLocaleDateString('id-ID', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }) : 'Tanggal TBA'}
                        </span>
                      </div>

                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <MapPin size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{e.location || 'Lokasi TBA'}</span>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-700">
                          <Users size={16} className="text-amber-600" />
                          <span>{e.capacity} orang</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-700 font-semibold">
                          <span>Rp</span>
                          <span>
                            {Number(e.price) > 0 ? Number(e.price).toLocaleString('id-ID') : 'Gratis'}
                          </span>
                        </div>
                      </div>

                      {e.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 pt-2 border-t border-gray-100">
                          {e.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="bg-gray-50 px-4 py-3 space-y-2 border-t border-gray-100">
                      <div className="flex gap-2">
                        <a
                          href={route('admin.events.show', e.id)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded font-semibold text-sm hover:bg-blue-100 transition"
                        >
                          <Eye size={16} />
                          Lihat
                        </a>
                        <a
                          href={route('admin.events.edit', e.id)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-50 text-green-700 rounded font-semibold text-sm hover:bg-green-100 transition"
                        >
                          <Edit size={16} />
                          Edit
                        </a>
                        <button
                          onClick={() => deleteEvent(e.id)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-700 rounded font-semibold text-sm hover:bg-red-100 transition"
                        >
                          <Trash2 size={16} />
                          Hapus
                        </button>
                      </div>
                      <button
                        onClick={() => togglePublish(e.id, e.published)}
                        className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded font-semibold text-sm transition ${
                          e.published
                            ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                            : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                        }`}
                      >
                        {e.published ? '🔓 Sembunyikan' : '🔓 Publikasikan'}
                      </button>
                      {e.published && e.slug && (
                        <a
                          href={route('events.show', e.slug)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 rounded font-semibold text-sm hover:bg-purple-100 transition"
                        >
                          <Eye size={16} />
                          Lihat di Situs Publik
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            // Places grid for admin management
            places.data.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center border-2 border-red-100">
                <div className="text-gray-400 mb-4 text-6xl">📍</div>
                <p className="text-gray-600 text-lg mb-4">Belum ada tempat wisata</p>
                <a
                  href={route('admin.places.create')}
                  className="inline-block px-6 py-2 bg-amber-500 text-red-950 rounded-lg font-semibold hover:bg-amber-600"
                >
                  Buat Place Pertama
                </a>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {places.data.map((p: any) => (
                  <div key={p.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border-l-4 border-amber-400 group">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-red-950">{p.name}</h3>
                          <p className="text-sm text-gray-600 mt-2">{p.category}</p>
                        </div>
                        {p.published ? (
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded ml-2">
                            Published
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded ml-2">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mt-3 line-clamp-2">{p.description}</p>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 space-y-2 border-t border-gray-100">
                      <div className="flex gap-2">
                        <a href={route('admin.places.edit', p.id)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-50 text-green-700 rounded font-semibold text-sm hover:bg-green-100 transition"><Edit size={16} />Edit</a>
                        <button onClick={() => { if (confirm('Yakin ingin menghapus?')) { router.delete(route('admin.places.destroy', p.id)); } }} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-700 rounded font-semibold text-sm hover:bg-red-100 transition"><Trash2 size={16} />Hapus</button>
                      </div>
                      <button
                        onClick={() => router.patch(route('admin.places.toggle-publish', p.id), {}, { preserveScroll: true })}
                        className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded font-semibold text-sm transition ${
                          p.published
                            ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                            : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                        }`}
                      >
                        {p.published ? '🔓 Sembunyikan' : '🔓 Publikasikan'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}
