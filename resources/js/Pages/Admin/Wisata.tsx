import React, { useState } from 'react';
import { Layout } from '../../Components/Layout';
import { usePage, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Filter, CheckSquare, Square } from 'lucide-react';

interface WisataProps {
  places: any;
}

export default function Wisata({ places }: WisataProps) {
  const page = usePage();
  const { csrf_token } = page.props as any;
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const placesData = places.data || places;
  const filteredPlaces = searchQuery
    ? placesData.filter((p: any) =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : placesData;

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredPlaces.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredPlaces.map((p: any) => p.id));
    }
  };

  const handleTogglePublish = async (id: number) => {
    try {
      const response = await fetch(route('admin.places.toggle-publish', id), {
        method: 'PATCH',
        headers: {
          'X-CSRF-TOKEN': csrf_token,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        router.reload({ only: ['places'] });
      }
    } catch (e) {
      alert('Gagal mengubah status publish');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus place ini?')) return;
    try {
      await fetch(route('admin.places.destroy', id), {
        method: 'DELETE',
        headers: { 'X-CSRF-TOKEN': csrf_token },
      });
      router.reload({ only: ['places'] });
    } catch (e) {
      alert('Gagal menghapus');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Hapus ${selectedIds.length} place(s)?`)) return;
    try {
      await fetch(route('admin.places.bulk-delete'), {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrf_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedIds }),
      });
      setSelectedIds([]);
      router.reload({ only: ['places'] });
    } catch (e) {
      alert('Gagal menghapus');
    }
  };

  const handleBulkPublish = async (action: 'publish' | 'unpublish') => {
    if (selectedIds.length === 0) return;
    try {
      await fetch(route('admin.places.bulk-publish'), {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrf_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedIds, action }),
      });
      setSelectedIds([]);
      router.reload({ only: ['places'] });
    } catch (e) {
      alert('Gagal mengubah status');
    }
  };

  const viewOnPublicSite = () => {
    window.open(route('places.index'), '_blank');
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6 md:p-8 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Wisata</h1>
                <p className="text-gray-600">Manage places and tourist attractions</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={viewOnPublicSite}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  <Eye size={18} />
                  View Public Site
                </button>
                <a
                  href={route('admin.places.create')}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-red-950 rounded-lg hover:from-amber-600 hover:to-amber-700 transition shadow-lg font-semibold"
                >
                  <Plus size={18} />
                  Create Place
                </a>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search places by name, category, or location..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedIds.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between">
                <span className="text-amber-800 font-semibold">
                  {selectedIds.length} place(s) selected
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBulkPublish('publish')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                  >
                    Publish Selected
                  </button>
                  <button
                    onClick={() => handleBulkPublish('unpublish')}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm"
                  >
                    Unpublish Selected
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                  >
                    Delete Selected
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Places Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-amber-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Places</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {places.total || places.length || 0}
                  </p>
                </div>
                {filteredPlaces.length > 0 && (
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">Showing</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {filteredPlaces.length} of {places.total || places.length || 0}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-red-950 to-red-900 text-white">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold w-12">
                      <button
                        onClick={toggleSelectAll}
                        className="p-1 hover:bg-white/20 rounded transition"
                      >
                        {selectedIds.length === filteredPlaces.length && filteredPlaces.length > 0 ? (
                          <CheckSquare size={20} />
                        ) : (
                          <Square size={20} />
                        )}
                      </button>
                    </th>
                    <th className="text-left py-4 px-6 font-semibold">ID</th>
                    <th className="text-left py-4 px-6 font-semibold">Name</th>
                    <th className="text-left py-4 px-6 font-semibold">Category</th>
                    <th className="text-left py-4 px-6 font-semibold">Location</th>
                    <th className="text-center py-4 px-6 font-semibold">Rating</th>
                    <th className="text-center py-4 px-6 font-semibold">Published</th>
                    <th className="text-center py-4 px-6 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlaces.map((p: any, idx: number) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleSelect(p.id)}
                          className="p-1 hover:bg-gray-100 rounded transition"
                        >
                          {selectedIds.includes(p.id) ? (
                            <CheckSquare size={18} className="text-red-600" />
                          ) : (
                            <Square size={18} className="text-gray-400" />
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900">#{p.id}</td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-900">{p.name}</div>
                        {p.description && (
                          <div className="text-sm text-gray-500 line-clamp-1 mt-1">
                            {p.description}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {p.category || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-700 text-sm">{p.location || 'N/A'}</td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                          ⭐ {p.rating || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleTogglePublish(p.id)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition ${
                            p.published
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {p.published ? (
                            <>
                              <Eye size={14} />
                              Published
                            </>
                          ) : (
                            <>
                              <EyeOff size={14} />
                              Draft
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={route('admin.places.edit', p.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </a>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredPlaces.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-500">
                        <p className="text-lg">No places found</p>
                        <p className="text-sm mt-2">
                          {searchQuery ? 'Try adjusting your search' : 'Create your first place'}
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {places.last_page > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {places.from} to {places.to} of {places.total} places
                  </p>
                  <div className="flex gap-2">
                    {places.current_page > 1 && (
                      <button
                        onClick={() => router.get(route('admin.places.index'), { page: places.current_page - 1 })}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition text-sm font-medium"
                      >
                        Previous
                      </button>
                    )}
                    {places.current_page < places.last_page && (
                      <button
                        onClick={() => router.get(route('admin.places.index'), { page: places.current_page + 1 })}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition text-sm font-medium"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
