import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import { Layout } from '../../Components/Layout';
import { Trash2, Edit, Eye, Plus, Calendar, MapPin, Users, BarChart3, X, TrendingUp, DollarSign, Ticket, UserCheck, Percent } from 'lucide-react';

export default function Index(props: any) {
  const upcomingEvents = props.upcomingEvents || { data: [] };
  const pastEvents = props.pastEvents || { data: [] };
  const places = props.places || { data: [] };
  const [tab, setTab] = React.useState<'events' | 'places'>('events');
  const [selectedEventReport, setSelectedEventReport] = useState<any>(null);
  const [loadingReport, setLoadingReport] = useState<number | null>(null);

  function deleteEvent(id: number) {
    if (!confirm('Yakin ingin menghapus event ini?')) return;
    router.delete(route('admin.events.destroy', id));
  }

  function togglePublish(id: number, currentStatus: boolean) {
    router.patch(route('admin.events.toggle-publish', id), {}, { preserveScroll: true });
  }

  async function loadEventReport(eventId: number) {
    setLoadingReport(eventId);
    try {
      const response = await fetch(route('admin.events.report', eventId));
      const data = await response.json();
      setSelectedEventReport(data);
    } catch (error) {
      alert('Gagal memuat report');
    } finally {
      setLoadingReport(null);
    }
  }

  function EventCard({ e, isPast = false }: { e: any; isPast?: boolean }) {
    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border-l-4 border-red-600 group">
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
            {isPast && (
              <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
                Past Event
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
          {isPast ? (
            <>
              <button
                onClick={() => loadEventReport(e.id)}
                disabled={loadingReport === e.id}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50"
              >
                {loadingReport === e.id ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    <BarChart3 size={16} />
                    Lihat Report Detail
                  </>
                )}
              </button>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-red-50 -mt-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-6">
          <div className="bg-gradient-to-r from-[#6b0000] via-[#7b0b0b] to-[#8b0b0b] text-white rounded-xl shadow-lg py-8 px-6">
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
                <strong>Info:</strong> Hanya event yang dipublikasikan dan belum lewat tanggalnya yang akan muncul di halaman publik (<a href={route('events.index')} target="_blank" rel="noopener noreferrer" className="underline font-semibold">/events</a>). 
                Event yang sudah lewat akan otomatis masuk ke Past Events.
              </p>
            </div>
          )}

          {/* Content Grid */}
          {tab === 'events' ? (
            <>
              {/* Upcoming Events Section */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 flex-1 bg-gradient-to-r from-red-600 to-amber-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-red-950 whitespace-nowrap">Upcoming Events</h2>
                  <div className="h-1 flex-1 bg-gradient-to-r from-amber-500 to-red-600 rounded-full"></div>
                </div>
                {upcomingEvents.data.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-lg p-12 text-center border-2 border-red-100">
                    <div className="text-gray-400 mb-4 text-6xl">📅</div>
                    <p className="text-gray-600 text-lg mb-4">Belum ada upcoming event</p>
                    <a
                      href={route('admin.events.create')}
                      className="inline-block px-6 py-2 bg-amber-500 text-red-950 rounded-lg font-semibold hover:bg-amber-600"
                    >
                      Buat Event Baru
                    </a>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {upcomingEvents.data.map((e: any) => (
                      <EventCard key={e.id} e={e} isPast={false} />
                    ))}
                  </div>
                )}
              </div>

              {/* Past Events Section */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 flex-1 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-700 whitespace-nowrap">Past Events</h2>
                  <div className="h-1 flex-1 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full"></div>
                </div>
                {pastEvents.data.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-lg p-8 text-center border-2 border-gray-200">
                    <div className="text-gray-400 mb-4 text-5xl">📊</div>
                    <p className="text-gray-600">Belum ada past event</p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {pastEvents.data.map((e: any) => (
                      <EventCard key={e.id} e={e} isPast={true} />
                    ))}
                  </div>
                )}
              </div>
            </>
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

      {/* Event Report Modal */}
      {selectedEventReport && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setSelectedEventReport(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[slideUp_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-red-950 to-red-900 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold mb-1">{selectedEventReport.event.title}</h2>
                <p className="text-red-100 text-sm">
                  {new Date(selectedEventReport.event.date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <button
                onClick={() => setSelectedEventReport(null)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Report Content */}
            <div className="p-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Ticket size={20} className="text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">Tickets Sold</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{selectedEventReport.total_tickets_sold}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign size={20} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-800">Total Revenue</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">
                    Rp {Number(selectedEventReport.total_revenue).toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck size={20} className="text-purple-600" />
                    <span className="text-sm font-semibold text-purple-800">Unique Buyers</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">{selectedEventReport.unique_buyers}</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Percent size={20} className="text-amber-600" />
                    <span className="text-sm font-semibold text-amber-800">Capacity</span>
                  </div>
                  <p className="text-2xl font-bold text-amber-900">
                    {selectedEventReport.capacity_utilization.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Payment Status Breakdown */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Status Breakdown</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(selectedEventReport.payment_status_breakdown).map(([status, count]: [string, any]) => (
                    <div key={status} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700 capitalize">{status}</span>
                        <span className="text-lg font-bold text-gray-900">{count} tickets</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Revenue: Rp {Number(selectedEventReport.revenue_by_status[status] || 0).toLocaleString('id-ID')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tickets List */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Detail Orders ({selectedEventReport.total_orders})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 border-b-2 border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Qty</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEventReport.tickets.map((ticket: any) => (
                        <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">#{ticket.id}</td>
                          <td className="py-3 px-4 text-gray-700">{ticket.user_name}</td>
                          <td className="py-3 px-4 text-gray-600 text-xs">{ticket.user_email}</td>
                          <td className="py-3 px-4 text-center font-semibold">{ticket.quantity}</td>
                          <td className="py-3 px-4 font-semibold text-green-600">
                            Rp {Number(ticket.total_price).toLocaleString('id-ID')}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                              ticket.payment_status === 'completed' ? 'bg-green-100 text-green-700' :
                              ticket.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              ticket.payment_status === 'cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {ticket.payment_status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-xs">
                            {new Date(ticket.created_at).toLocaleDateString('id-ID')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
