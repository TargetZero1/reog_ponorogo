import { useForm } from '@inertiajs/react';
import { Layout } from '../../Components/Layout';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useTranslations, getLocalizedRoute } from '@/utils/translations';
import { useState } from 'react';

export default function Create() {
  const { locale } = useTranslations();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { data, setData, post, errors, processing } = useForm({
    title: '',
    title_en: '',
    description: '',
    description_en: '',
    date: '',
    location: '',
    location_en: '',
    price: '0',
    capacity: '0',
    published: true,
    image: null as File | null,
  });

  function submit(e: any) {
    e.preventDefault();
    post(getLocalizedRoute('admin.events.store', {}, locale), {
      forceFormData: true,
    });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setData('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function removeImage() {
    setData('image', null);
    setImagePreview(null);
  }
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-red-50 -mt-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-3 sm:px-4 pt-16 sm:pt-20 pb-4 sm:pb-6">
          <div className="bg-gradient-to-r from-[#6b0000] via-[#7b0b0b] to-[#8b0b0b] text-white rounded-lg sm:rounded-xl shadow-lg py-4 sm:py-6 md:py-8 px-4 sm:px-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <a href={getLocalizedRoute('admin.events.index', {}, locale)} className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition">
                <ArrowLeft size={20} className="sm:size-6" />
              </a>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Tambah Event Baru</h1>
                <p className="text-red-100 text-sm sm:text-base">Buat pertunjukan Reog baru untuk kalender</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
          <form onSubmit={submit} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border border-red-100">
            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-red-950 mb-2">Event Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition">
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload size={48} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 mb-2">Click to upload event image</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition"
                >
                  Choose Image
                </label>
              </div>
              {errors.image && <p className="text-red-600 text-sm mt-2">{errors.image}</p>}
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-red-950 mb-2">Judul Event (Indonesia) *</label>
              <input
                value={data.title}
                onChange={e => setData('title', e.target.value)}
                placeholder="Nama pertunjukan (cth: Grebeg Suro, Pertunjukan Reog Malam)"
                className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                  errors.title ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="text-red-600 text-sm mt-2 font-semibold">{errors.title}</p>}
            </div>

            {/* Title English */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-red-950 mb-2">Title (English)</label>
              <input
                value={data.title_en}
                onChange={e => setData('title_en', e.target.value)}
                placeholder="Event title in English"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-red-950 mb-2">Deskripsi</label>
              <textarea
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                placeholder="Jelaskan detail pertunjukan, apa yang akan ditampilkan, dan nilai budaya..."
                rows={5}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
              {errors.description && <p className="text-red-600 text-sm mt-2">{errors.description}</p>}
            </div>

            {/* Description English */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-red-950 mb-2">Description (English)</label>
              <textarea
                value={data.description_en}
                onChange={e => setData('description_en', e.target.value)}
                placeholder="Event description in English"
                rows={5}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>

            {/* Date & Location */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-red-950 mb-2">Tanggal & Waktu *</label>
                <input
                  type="datetime-local"
                  value={data.date}
                  onChange={e => setData('date', e.target.value)}
                  className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                    errors.date ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.date && <p className="text-red-600 text-sm mt-2">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-950 mb-2">Lokasi *</label>
                <input
                  value={data.location}
                  onChange={e => setData('location', e.target.value)}
                  placeholder="Lokasi pertunjukan (cth: Alun-alun Ponorogo)"
                  className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                    errors.location ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.location && <p className="text-red-600 text-sm mt-2">{errors.location}</p>}
              </div>
            </div>

            {/* Location English */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-red-950 mb-2">Location (English)</label>
              <input
                value={data.location_en}
                onChange={e => setData('location_en', e.target.value)}
                placeholder="Event location in English"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>

            {/* Price & Capacity */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-red-950 mb-2">Harga Tiket (Rp)</label>
                <input
                  type="number"
                  value={data.price}
                  onChange={e => setData('price', e.target.value)}
                  placeholder="0"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
                {errors.price && <p className="text-red-600 text-sm mt-2">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-950 mb-2">Kapasitas Pengunjung</label>
                <input
                  type="number"
                  value={data.capacity}
                  onChange={e => setData('capacity', e.target.value)}
                  placeholder="0"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
                {errors.capacity && <p className="text-red-600 text-sm mt-2">{errors.capacity}</p>}
              </div>
            </div>

            {/* Published */}
            <div className="mb-8 flex items-center gap-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
              <input
                type="checkbox"
                checked={data.published}
                onChange={e => setData('published', e.target.checked)}
                className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"
              />
              <label className="text-sm font-semibold text-red-950">Publikasikan event ini sekarang</label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={processing}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold hover:from-red-700 hover:to-red-800 disabled:opacity-50 transition shadow-lg"
              >
                {processing ? 'Membuat...' : 'Buat Event'}
              </button>
              <a
                href={getLocalizedRoute('admin.events.index', {}, locale)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition text-center"
              >
                Batal
              </a>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
