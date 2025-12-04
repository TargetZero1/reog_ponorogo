import React, { useState, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { Layout } from '../../Components/Layout';
import { Plus, X, Save, ArrowLeft, Eye } from 'lucide-react';
import { useTranslations, getLocalizedRoute } from '@/utils/translations';

export default function EditPlace({ place }: { place: any }) {
  const page = usePage();
  const { csrf_token } = page.props as any;
  const { locale } = useTranslations();
  
  const { data, setData, patch, processing, errors } = useForm({
    name: place.name || '',
    category: place.category || '',
    description: place.description || '',
    location: place.location || '',
    hours: place.hours || '24 Jam',
    rating: place.rating || 4.5,
    image_path: place.image_path || '',
    price: place.price || '',
    best_time: place.best_time || '',
    published: place.published || false,
    highlights: Array.isArray(place.highlights) && place.highlights.length > 0 ? place.highlights : [''],
    activities: Array.isArray(place.activities) && place.activities.length > 0 ? place.activities : [''],
    facilities: Array.isArray(place.facilities) && place.facilities.length > 0 ? place.facilities : [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(getLocalizedRoute('admin.places.update', { place: place.id }, locale), {
      onSuccess: () => {
        // Redirect handled by Laravel
      },
    });
  };

  const addArrayItem = (field: 'highlights' | 'activities' | 'facilities') => {
    setData(field, [...data[field], '']);
  };

  const removeArrayItem = (field: 'highlights' | 'activities' | 'facilities', index: number) => {
    const newArray = data[field].filter((_: string, i: number) => i !== index);
    setData(field, newArray);
  };

  const updateArrayItem = (field: 'highlights' | 'activities' | 'facilities', index: number, value: string) => {
    const newArray = [...data[field]];
    newArray[index] = value;
    setData(field, newArray);
  };

  const viewOnPublicSite = () => {
    if (place.published) {
      window.open(getLocalizedRoute('places.index', {}, locale), '_blank');
    } else {
      alert('Place must be published to view on public site');
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6 md:p-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center gap-4">
            <a
              href={getLocalizedRoute('admin.places.index', {}, locale)}
              className="p-2 hover:bg-white rounded-lg transition"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </a>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Edit Place</h1>
              <p className="text-gray-600">Update place information</p>
            </div>
            {place.published && (
              <button
                onClick={viewOnPublicSite}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                <Eye size={18} />
                View on Public Site
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            {}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Basic Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                    placeholder="e.g., Wisata Alam, Wisata Budaya"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                    placeholder="e.g., Kecamatan Ngebel, Ponorogo"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operating Hours</label>
                  <input
                    type="text"
                    value={data.hours}
                    onChange={(e) => setData('hours', e.target.value)}
                    placeholder="e.g., 08:00 - 17:00 WIB"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={data.rating}
                    onChange={(e) => setData('rating', parseFloat(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rp)</label>
                  <input
                    type="number"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                    placeholder="Leave empty for free"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Describe the place..."
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={data.image_path}
                  onChange={(e) => setData('image_path', e.target.value)}
                  placeholder="https://..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Best Time to Visit</label>
                <input
                  type="text"
                  value={data.best_time}
                  onChange={(e) => setData('best_time', e.target.value)}
                  placeholder="e.g., Pagi hari untuk sunrise"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Highlights</h2>
                <button
                  type="button"
                  onClick={() => addArrayItem('highlights')}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-red-950 rounded-lg hover:bg-amber-600 transition"
                >
                  <Plus size={18} />
                  Add Highlight
                </button>
              </div>
              <div className="space-y-2">
                {data.highlights.map((highlight: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => updateArrayItem('highlights', index, e.target.value)}
                      placeholder="Enter highlight..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    {data.highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('highlights', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Activities</h2>
                <button
                  type="button"
                  onClick={() => addArrayItem('activities')}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-red-950 rounded-lg hover:bg-amber-600 transition"
                >
                  <Plus size={18} />
                  Add Activity
                </button>
              </div>
              <div className="space-y-2">
                {data.activities.map((activity: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={activity}
                      onChange={(e) => updateArrayItem('activities', index, e.target.value)}
                      placeholder="Enter activity..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    {data.activities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('activities', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Facilities</h2>
                <button
                  type="button"
                  onClick={() => addArrayItem('facilities')}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-red-950 rounded-lg hover:bg-amber-600 transition"
                >
                  <Plus size={18} />
                  Add Facility
                </button>
              </div>
              <div className="space-y-2">
                {data.facilities.map((facility: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={facility}
                      onChange={(e) => updateArrayItem('facilities', index, e.target.value)}
                      placeholder="Enter facility..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    {data.facilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('facilities', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {}
            <div className="mb-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.published}
                  onChange={(e) => setData('published', e.target.checked)}
                  className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                />
                <span className="text-sm font-medium text-gray-700">Publish this place (visible to public)</span>
              </label>
            </div>

            {}
            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <a
                href={getLocalizedRoute('admin.places.index', {}, locale)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition"
              >
                Cancel
              </a>
              <button
                type="submit"
                disabled={processing}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition shadow-lg disabled:opacity-50"
              >
                <Save size={18} />
                {processing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
