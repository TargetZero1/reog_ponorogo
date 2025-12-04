import React from 'react';
import { Layout } from '../../Components/Layout';
import { SEO } from '../../Components/SEO';
import { useTranslations } from '../../utils/translations';
import { Calendar, MapPin, Ticket } from 'lucide-react';

export default function PublicIndex({ events }: any) {
  events = events || { data: [] };
  const { t, locale } = useTranslations();

  return (
    <Layout>
      <SEO 
        title={`${t('events.title')} - Reog Ponorogo`}
        description={t('events.subtitle')}
        keywords="Events Reog Ponorogo, Acara Budaya, Pertunjukan Tradisional, Grebeg Suro, Festival Reog"
      />
      <div className="py-12 md:py-16 bg-gradient-to-b from-white via-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-500 text-red-950 px-4 py-2 rounded-full mb-4 shadow-lg font-semibold text-sm">
              <Calendar size={18} />
              <span>{t('events.title')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-red-950 mb-4">{t('events.title')}</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('events.subtitle')}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-600 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Events Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.data.map((e: any, index: number) => (
              <div 
                key={e.id} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-neutral-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Event Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-red-600 via-amber-500 to-red-700 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:20px_20px]"></div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                    {Number(e.price) > 0 ? (
                      <span className="text-white font-bold text-sm">Rp {Number(e.price).toLocaleString(locale === 'en' ? 'en-US' : 'id-ID')}</span>
                    ) : (
                      <span className="text-white font-bold text-sm">{t('events.free')}</span>
                    )}
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-red-950 mb-3 group-hover:text-red-700 transition-colors line-clamp-2">
                    {e.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} className="text-amber-600" />
                      <span>{e.date ? new Date(e.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : (locale === 'en' ? 'Date TBA' : 'Tanggal TBA')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} className="text-red-600" />
                      <span className="line-clamp-1">{e.location || (locale === 'en' ? 'Location TBA' : 'Lokasi TBA')}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-3 mb-4 leading-relaxed">
                    {e.description || (locale === 'en' ? 'Interesting cultural event and Reog Ponorogo performance.' : 'Acara budaya dan pertunjukan Reog Ponorogo yang menarik.')}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-neutral-200">
                    <a 
                      href={route('events.show', { locale, slug: e.slug || e.id })} 
                      className="flex-1 text-center px-4 py-2 bg-neutral-100 text-red-950 font-semibold rounded-lg hover:bg-neutral-200 transition-colors text-sm"
                    >
                      {t('events.details')}
                    </a>
                    <button
                      onClick={() => {
                        window.location.href = route('pesan.checkout', { 
                          locale,
                          type: 'event', 
                          id: e.id,
                          attraction: e.title 
                        });
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg text-sm"
                    >
                      <Ticket size={16} />
                      {t('events.book_ticket')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {events.data.length === 0 && (
            <div className="text-center py-16">
              <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('events.no_events')}</h3>
              <p className="text-gray-500">{t('events.no_events_desc')}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
