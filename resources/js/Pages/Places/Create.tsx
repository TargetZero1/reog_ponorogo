import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Layout } from '../../Components/Layout';
import { Plus, X, Save, ArrowLeft } from 'lucide-react';

export default function CreatePlace() {
  const page = usePage();
  const { csrf_token } = page.props as any;
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    hours: '24 Jam',
    rating: 4.5,
    image_path: '',
    price: '',
    best_time: '',
    published: false,
    highlights: [''],
    activities: [''],
    facilities: [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post(route('admin.places.store'), formData, {
      onSuccess: () => {
        router.visit(route('admin.places.index'));
      },
    });
  };

  const addArrayItem = (field: 'highlights' | 'activities' | 'facilities') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (field: 'highlights' | 'activities' | 'facilities', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const updateArrayItem = (field: 'highlights' | 'activities' | 'facilities', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6 md:p-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center gap-4">
            <a
              href={route('admin.places.index')}
              className="p-2 hover:bg-white rounded-lg transition"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </a>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Place</h1>
              <p className="text-gray-600">Add a new tourist attraction</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Basic Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Wisata Alam, Wisata Budaya"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Kecamatan Ngebel, Ponorogo"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operating Hours</label>
                  <input
                    type="text"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
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
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rp)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Leave empty for free"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Describe the place..."
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image_path}
                  onChange={(e) => setFormData({ ...formData, image_path: e.target.value })}
                  placeholder="https://..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Best Time to Visit</label>
                <input
                  type="text"
                  value={formData.best_time}
                  onChange={(e) => setFormData({ ...formData, best_time: e.target.value })}
                  placeholder="e.g., Pagi hari untuk sunrise"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Highlights */}
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
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => updateArrayItem('highlights', index, e.target.value)}
                      placeholder="Enter highlight..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    {formData.highlights.length > 1 && (
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

            {/* Activities */}
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
                {formData.activities.map((activity, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={activity}
                      onChange={(e) => updateArrayItem('activities', index, e.target.value)}
                      placeholder="Enter activity..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    {formData.activities.length > 1 && (
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

            {/* Facilities */}
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
                {formData.facilities.map((facility, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={facility}
                      onChange={(e) => updateArrayItem('facilities', index, e.target.value)}
                      placeholder="Enter facility..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    {formData.facilities.length > 1 && (
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

            {/* Published Toggle */}
            <div className="mb-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                />
                <span className="text-sm font-medium text-gray-700">Publish this place (visible to public)</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <a
                href={route('admin.places.index')}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition shadow-lg"
              >
                <Save size={18} />
                Create Place
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
