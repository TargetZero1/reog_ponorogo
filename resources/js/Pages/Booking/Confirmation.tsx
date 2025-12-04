import React, { useEffect } from 'react';
import { CheckCircle, MessageCircle, MapPin, Ticket } from 'lucide-react';
import { QRCode } from '@/Components/QRCode';
import { SEO } from '@/Components/SEO';
import { useTranslations } from '@/utils/translations';

interface ConfirmationProps {
  ticket: {
    id: number;
    attraction_name: string;
    quantity: number;
    total_price: number;
    visit_date: string;
    payment_status: string;
  };
  whatsappUrl?: string;
}

export default function Confirmation({ ticket, whatsappUrl }: ConfirmationProps) {
  const { t, locale } = useTranslations();
  const ticketUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/pesan-ticket/confirmation/${ticket.id}` 
    : '';
  const qrValue = `TICKET-${ticket.id}|${ticket.attraction_name}|${ticket.quantity}|${ticket.visit_date}`;

  // Auto-open WhatsApp in new tab after 2 seconds, user stays on confirmation
  useEffect(() => {
    if (whatsappUrl) {
      const timer = setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [whatsappUrl]);

  return (
    <>
      <SEO 
        title={`${t('booking.success')} #${ticket.id} - Reog Ponorogo`}
        description={`${t('booking.title')} ${ticket.attraction_name}`}
      />
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-green-50 flex items-center justify-center px-3 py-4 sm:py-8">
        <div className="max-w-2xl w-full">
          {/* Success Header */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-green-100 p-3 sm:p-4 rounded-full">
                <CheckCircle size={40} className="sm:size-12 text-green-600" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-green-600">{t('booking.success')}</h2>
            <p className="text-center text-neutral-600 mb-6 sm:mb-8 text-sm sm:text-base">{t('booking.thanks')}</p>

            {/* Ticket Details & QR Code */}
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Ticket Details - Cleaner Design */}
              <div className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-neutral-200">
                <div>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium tracking-wide uppercase mb-1">{t('booking.order_id')}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-red-600">#{ticket.id}</p>
                </div>

                <div className="border-t border-neutral-100 pt-4 sm:pt-6">
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium tracking-wide uppercase mb-2">{t('booking.destination')}</p>
                  <p className="text-lg sm:text-xl font-semibold text-neutral-900">{ticket.attraction_name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 border-t border-neutral-100 pt-4 sm:pt-6">
                  <div>
                    <p className="text-xs sm:text-sm text-neutral-500 font-medium tracking-wide uppercase mb-2">{t('booking.quantity')}</p>
                    <p className="text-xl sm:text-2xl font-bold text-neutral-900">{ticket.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-neutral-500 font-medium tracking-wide uppercase mb-2">{t('booking.status')}</p>
                    <span className={`inline-block font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm ${
                      ticket.payment_status === 'completed' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {ticket.payment_status === 'completed' ? t('booking.paid') : t('booking.pending')}
                    </span>
                  </div>
                </div>

                <div className="border-t border-neutral-100 pt-4 sm:pt-6">
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium tracking-wide uppercase mb-2">{t('booking.visit_date')}</p>
                  <p className="text-base sm:text-lg font-semibold text-neutral-900">{new Date(ticket.visit_date).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', { 
                    weekday: 'short',
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-amber-50 border border-red-100 rounded-lg p-4 sm:p-6 border-t-4 border-t-red-600">
                  <p className="text-xs sm:text-sm text-neutral-600 font-medium tracking-wide uppercase mb-2">{t('booking.total_price')}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-red-600">Rp {Number(ticket.total_price).toLocaleString(locale === 'en' ? 'en-US' : 'id-ID')}</p>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-neutral-200">
                <QRCode 
                  value={qrValue}
                  size={160}
                  title={`${t('booking.order_id')} #${ticket.id}`}
                  showDownload={true}
                />
              </div>
            </div>

            {whatsappUrl && (
              <>
                <p className="text-xs sm:text-sm text-neutral-600 text-center mb-3 sm:mb-4">
                  {t('booking.whatsapp_redirect')}
                </p>
                <button
                  onClick={() => window.open(whatsappUrl, '_blank')}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 sm:py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center gap-2 font-semibold mb-3 sm:mb-4 text-sm sm:text-base"
                >
                  <MessageCircle size={20} />
                  {t('booking.whatsapp_now')}
                </button>
              </>
            )}

            <div className="pt-4 border-t border-neutral-200">
              <a
                href={route('payment.history', { locale })}
                className="flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
              >
                <MapPin size={18} />
                {t('booking.view_history')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
