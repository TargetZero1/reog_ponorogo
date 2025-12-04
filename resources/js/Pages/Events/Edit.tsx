import { useForm } from '@inertiajs/react';
import { Layout } from '../../Components/Layout';
import { ArrowLeft, Eye } from 'lucide-react';
import { useTranslations, getLocalizedRoute } from '@/utils/translations';

export default function Edit(props: any) {
  const { locale } = useTranslations();
  const event = props.event || {};
  const { data, setData, put, errors, processing } = useForm({
    title: event.title || '',
    description: event.description || '',
    date: event.date ? new Date(event.date).toISOString().slice(0, 16) : '',
    location: event.location || '',
    price: event.price || '0',
    capacity: event.capacity || '0',
    published: event.published ?? false,
  });

  function submit(e: any) {
    e.preventDefault();
    put(getLocalizedRoute('admin.events.update', { event: event.id }, locale));
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-red-50 -mt-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-6">
          <div className="bg-gradient-to-r from-[#6b0000] via-[#7b0b0b] to-[#8b0b0b] text-white rounded-xl shadow-lg py-8 px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <a href={getLocalizedRoute('admin.events.index', {}, locale)} className="p-2 hover:bg-white/20 rounded-lg transition">
                  <ArrowLeft size={24} />
                </a>
                <div>
                  <h1 className="text-3xl font-bold">Edit Event</h1>
                  <p className="text-red-100">Ubah informasi pertunjukan Reog</p>
                </div>
              </div>
              <a
                href={getLocalizedRoute('admin.events.show', { event: event.id }, locale)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition backdrop-blur-sm"
              >
                <Eye size={18} />
                View Event
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <form onSubmit={submit} className="bg-white rounded-xl shadow-lg p-8 border border-red-100">
            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-red-950 mb-2">Judul Event *</label>
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
                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
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
