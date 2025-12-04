import { Layout } from '../../Components/Layout';
import { SEO } from '../../Components/SEO';
import { ShareButtons } from '../../Components/ShareButtons';
import { useTranslations, getLocalizedRoute } from '../../utils/translations';
import { Ticket, Calendar, MapPin } from 'lucide-react';

export default function Show(props: any) {
  const event = props.event;
  const { t, locale } = useTranslations();
  const eventUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  // Helper function to get localized content
  const getLocalized = (field: string) => {
    const enField = `${field}_en`;
    return locale === 'en' && event[enField] ? event[enField] : event[field];
  };
  
  const eventTitle = getLocalized('title');
  const eventDescription = getLocalized('description');
  const eventLocation = getLocalized('location');
  
  const eventDescriptionMeta = eventDescription 
    ? eventDescription.substring(0, 160) + '...' 
    : locale === 'en' 
      ? `Performance ${eventTitle} - ${eventLocation || 'Ponorogo'}. Don't miss the opportunity to witness the grandeur of traditional Reog Ponorogo performance.`
      : `Pertunjukan ${eventTitle} - ${eventLocation || 'Ponorogo'}. Jangan lewatkan kesempatan untuk menyaksikan kemegahan pertunjukan tradisional Reog Ponorogo.`;

  return (
    <Layout>
      <SEO 
        title={`${eventTitle} - Reog Ponorogo`}
        description={eventDescriptionMeta}
        keywords={`${eventTitle}, Reog Ponorogo, ${eventLocation || 'Ponorogo'}, Event Budaya, Pertunjukan Tradisional`}
        url={eventUrl}
        type="article"
      />
      <div className="py-12 md:py-16 bg-gradient-to-b from-white via-neutral-50 to-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-8 md:mb-12">
            <a 
              href={getLocalizedRoute('events.index', {}, locale)} 
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold mb-6 transition-colors"
            >
              ← {t('common.back')} {t('nav.events')}
            </a>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Event Image or Gradient Background */}
              {event.image_path ? (
                <div className="relative h-80 md:h-96">
                  <img 
                    src={event.image_path} 
                    alt={eventTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-red-600 via-amber-500 to-red-700 h-80 md:h-96 relative">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:20px_20px]"></div>
                </div>
              )}
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
                  {eventTitle}
                </h1>
                <div className="flex flex-wrap gap-4 md:gap-6 text-amber-100">
                  <div className="flex items-center gap-2">
                    <Calendar size={20} />
                    <span>{event.date ? new Date(event.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : (locale === 'en' ? 'Date TBA' : 'Tanggal TBA')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={20} />
                    <span>{eventLocation || (locale === 'en' ? 'Location TBA' : 'Lokasi TBA')}</span>
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
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">{t('events.price')}</h2>
                  <p className="text-3xl font-bold text-red-600">
                    {Number(event.price) > 0 ? `Rp ${Number(event.price).toLocaleString(locale === 'en' ? 'en-US' : 'id-ID')}` : t('events.free')}
                  </p>
                </div>
                <button
                  onClick={() => {
                    window.location.href = getLocalizedRoute('pesan.checkout', { 
                      type: 'event', 
                      id: event.id,
                      attraction: eventTitle 
                    }, locale);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl"
                >
                  <Ticket size={20} />
                  {t('events.book_ticket')}
                </button>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-red-950 mb-4">{locale === 'en' ? 'About This Event' : 'Tentang Acara Ini'}</h2>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line mb-6">
                {eventDescription || (locale === 'en' ? 'Interesting cultural event and Reog Ponorogo performance. Don\'t miss the opportunity to witness the grandeur of this traditional performance.' : 'Acara budaya dan pertunjukan Reog Ponorogo yang menarik. Jangan lewatkan kesempatan untuk menyaksikan kemegahan pertunjukan tradisional ini.')}
              </p>
              
              {/* Share Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <ShareButtons 
                  url={eventUrl}
                  title={eventTitle}
                  description={eventDescriptionMeta}
                />
              </div>
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="bg-gradient-to-br from-amber-50 to-red-50 rounded-2xl p-6 md:p-8 border border-amber-200">
            <h3 className="text-xl font-bold text-red-950 mb-4">{t('events.important_info')}</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">•</span>
                <span>{locale === 'en' ? 'Tickets can be purchased online or at the event location' : 'Tiket dapat dibeli melalui sistem online atau di lokasi acara'}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">•</span>
                <span>{locale === 'en' ? 'Make sure to arrive on time to get the best seats' : 'Pastikan datang tepat waktu untuk mendapatkan tempat terbaik'}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">•</span>
                <span>{locale === 'en' ? 'The event will take place according to the scheduled time' : 'Acara akan berlangsung sesuai jadwal yang telah ditentukan'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
