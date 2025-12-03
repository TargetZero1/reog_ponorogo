import { Layout } from '../../Components/Layout';
import { Ticket, Calendar, MapPin } from 'lucide-react';

export default function Show(props: any) {
  const event = props.event;

  return (
    <Layout>
      <div className="py-12 md:py-16 bg-gradient-to-b from-white via-neutral-50 to-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-8 md:mb-12">
            <a 
              href={route('events.index')} 
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold mb-6 transition-colors"
            >
              ← Kembali ke Events
            </a>
            
            <div className="bg-gradient-to-br from-red-600 via-amber-500 to-red-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:20px_20px]"></div>
              <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-4 md:gap-6 text-amber-100">
                  <div className="flex items-center gap-2">
                    <Calendar size={20} />
                    <span>{event.date ? new Date(event.date).toLocaleDateString('id-ID', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'Tanggal TBA'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={20} />
                    <span>{event.location || 'Lokasi TBA'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="mb-6 pb-6 border-b border-neutral-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">Harga Tiket</h2>
                  <p className="text-3xl font-bold text-red-600">
                    {Number(event.price) > 0 ? `Rp ${Number(event.price).toLocaleString('id-ID')}` : 'Gratis'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    window.location.href = route('pesan.checkout', { 
                      type: 'event', 
                      id: event.id,
                      attraction: event.title 
                    });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl"
                >
                  <Ticket size={20} />
                  Pesan Ticket Sekarang
                </button>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-red-950 mb-4">Tentang Acara</h2>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
                {event.description || 'Acara budaya dan pertunjukan Reog Ponorogo yang menarik. Jangan lewatkan kesempatan untuk menyaksikan kemegahan pertunjukan tradisional ini.'}
              </p>
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="bg-gradient-to-br from-amber-50 to-red-50 rounded-2xl p-6 md:p-8 border border-amber-200">
            <h3 className="text-xl font-bold text-red-950 mb-4">Informasi Penting</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">•</span>
                <span>Tiket dapat dibeli melalui sistem online atau di lokasi acara</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">•</span>
                <span>Pastikan datang tepat waktu untuk mendapatkan tempat terbaik</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">•</span>
                <span>Acara akan berlangsung sesuai jadwal yang telah ditentukan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
