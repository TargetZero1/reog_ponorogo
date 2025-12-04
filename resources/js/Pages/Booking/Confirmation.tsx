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

  // Auto-redirect to WhatsApp after 2 seconds
  useEffect(() => {
    if (whatsappUrl) {
      const timer = setTimeout(() => {
        window.location.href = whatsappUrl;
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
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Ticket Details */}
              <div className="space-y-3 bg-gradient-to-br from-red-50 to-amber-50 p-6 rounded-lg border-2 border-red-200">
                <div className="flex items-center gap-2 mb-4">
                  <Ticket className="text-red-600" size={24} />
                  <h3 className="text-lg font-bold text-red-950">{locale === 'en' ? 'Ticket Details' : 'Detail Tiket'}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 font-medium">{t('booking.order_id')}:</span>
                    <span className="font-bold text-red-950">#{ticket.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 font-medium">{t('booking.destination')}:</span>
                    <span className="font-semibold text-neutral-900 text-right">{ticket.attraction_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 font-medium">{t('booking.quantity')}:</span>
                    <span className="font-semibold text-neutral-900">{ticket.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 font-medium">{t('booking.total_price')}:</span>
                    <span className="font-bold text-red-600">Rp {Number(ticket.total_price).toLocaleString(locale === 'en' ? 'en-US' : 'id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 font-medium">{t('booking.visit_date')}:</span>
                    <span className="font-semibold text-neutral-900">{new Date(ticket.visit_date).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 font-medium">{t('booking.status')}:</span>
                    <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                      ticket.payment_status === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {ticket.payment_status === 'completed' ? t('booking.paid') : t('booking.pending')}
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center">
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
                  onClick={() => window.location.href = whatsappUrl}
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
