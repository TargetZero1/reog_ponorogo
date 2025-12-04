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
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-green-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          {/* Success Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle size={48} className="text-green-600" />
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-2 text-center text-green-600">{t('booking.success')}</h2>
            <p className="text-center text-neutral-600 mb-8">{t('booking.thanks')}</p>

            {/* Ticket Details & QR Code */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Ticket Details - Cleaner Design */}
              <div className="space-y-6 bg-white p-8 rounded-xl border border-neutral-200">
                <div>
                  <p className="text-sm text-neutral-500 font-medium tracking-wide uppercase mb-1">{t('booking.order_id')}</p>
                  <p className="text-3xl font-bold text-red-600">#{ticket.id}</p>
                </div>

                <div className="border-t border-neutral-100 pt-6">
                  <p className="text-sm text-neutral-500 font-medium tracking-wide uppercase mb-2">{t('booking.destination')}</p>
                  <p className="text-xl font-semibold text-neutral-900">{ticket.attraction_name}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 border-t border-neutral-100 pt-6">
                  <div>
                    <p className="text-sm text-neutral-500 font-medium tracking-wide uppercase mb-2">{t('booking.quantity')}</p>
                    <p className="text-2xl font-bold text-neutral-900">{ticket.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 font-medium tracking-wide uppercase mb-2">{t('booking.status')}</p>
                    <span className={`inline-block font-semibold px-4 py-2 rounded-lg text-sm ${
                      ticket.payment_status === 'completed' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {ticket.payment_status === 'completed' ? t('booking.paid') : t('booking.pending')}
                    </span>
                  </div>
                </div>

                <div className="border-t border-neutral-100 pt-6">
                  <p className="text-sm text-neutral-500 font-medium tracking-wide uppercase mb-2">{t('booking.visit_date')}</p>
                  <p className="text-lg font-semibold text-neutral-900">{new Date(ticket.visit_date).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', { 
                    weekday: 'short',
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-amber-50 border border-red-100 rounded-lg p-6 border-t-4 border-t-red-600">
                  <p className="text-sm text-neutral-600 font-medium tracking-wide uppercase mb-2">{t('booking.total_price')}</p>
                  <p className="text-3xl font-bold text-red-600">Rp {Number(ticket.total_price).toLocaleString(locale === 'en' ? 'en-US' : 'id-ID')}</p>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center bg-white p-8 rounded-xl border border-neutral-200">
                <QRCode 
                  value={qrValue}
                  size={200}
                  title={`${t('booking.order_id')} #${ticket.id}`}
                  showDownload={true}
                />
              </div>
            </div>

            {whatsappUrl && (
              <>
                <p className="text-sm text-neutral-600 text-center mb-4">
                  {t('booking.whatsapp_redirect')}
                </p>
                <button
                  onClick={() => window.open(whatsappUrl, '_blank')}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center gap-2 font-semibold mb-4"
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
