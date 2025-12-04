import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Layout } from '@/Components/Layout';
import { SEO } from '@/Components/SEO';
import { QRCode } from '@/Components/QRCode';
import { useTranslations } from '@/utils/translations';
import { Ticket, QrCode } from 'lucide-react';

interface Payment {
  id: number;
  attraction_name: string;
  quantity: number;
  total_price: number;
  created_at: string;
  visit_date?: string;
}

interface PaymentHistoryProps {
  payments: Payment[];
}

export default function PaymentHistory({ payments }: PaymentHistoryProps) {
  const { t, locale } = useTranslations();
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  const getQRValue = (payment: Payment) => {
    return `TICKET-${payment.id}|${payment.attraction_name}|${payment.quantity}|${payment.visit_date || payment.created_at}`;
  };

  return (
    <Layout>
      <SEO 
        title={`${t('payment_history.title')} - Reog Ponorogo`}
        description={t('payment_history.subtitle')}
      />
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-red-50 py-4 sm:py-6 md:py-8 px-3 sm:px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Ticket className="text-red-600" size={32} />
              <h2 className="text-3xl font-bold text-red-950">{t('payment_history.title')}</h2>
            </div>

          {payments.length === 0 ? (
            <p className="text-neutral-600">{t('payment_history.no_history')}</p>
          ) : (
            <>
              {/* Mobile Card Layout */}
              <div className="block md:hidden space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-red-950">#{payment.id}</h3>
                        <p className="text-sm text-neutral-600">{payment.attraction_name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-neutral-900">
                          Rp {payment.total_price.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {payment.quantity} tiket
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-neutral-500">{t('payment_history.visit_date')}</p>
                        <p className="text-neutral-900">
                          {payment.visit_date ? new Date(payment.visit_date).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID') : '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-500">{t('payment_history.order_date')}</p>
                        <p className="text-neutral-900">
                          {new Date(payment.created_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table Layout */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        {t('payment_history.order_id')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        {t('payment_history.attraction')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        {t('payment_history.ticket_count')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        {t('payment_history.total')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        {t('payment_history.visit_date')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        {t('payment_history.order_date')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        {t('payment_history.qr_code')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                          #{payment.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          {payment.attraction_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          {payment.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">
                          Rp {payment.total_price.toLocaleString(locale === 'en' ? 'en-US' : 'id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          {payment.visit_date ? new Date(payment.visit_date).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID') : '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          {new Date(payment.created_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedTicket(selectedTicket === payment.id ? null : payment.id)}
                            className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                          >
                            <QrCode size={16} />
                            {selectedTicket === payment.id ? t('payment_history.close') : t('payment_history.view_qr')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* QR Code Modal/Display */}
              {selectedTicket && (
                <div className="mt-8 p-6 bg-gradient-to-br from-red-50 to-amber-50 rounded-xl border-2 border-red-200">
                  <h3 className="text-xl font-bold text-red-950 mb-4 flex items-center gap-2">
                    <QrCode size={24} />
                    {t('payment_history.qr_code')} {t('payment_history.order_id')} #{selectedTicket}
                  </h3>
                  <div className="flex justify-center">
                    {(() => {
                      const payment = payments.find(p => p.id === selectedTicket);
                      return payment ? (
                        <QRCode 
                          value={getQRValue(payment)}
                          size={250}
                          title={`${t('payment_history.order_id')} #${payment.id} - ${payment.attraction_name}`}
                          showDownload={true}
                        />
                      ) : null;
                    })()}
                  </div>
                </div>
              )}

              {/* Mobile QR Code */}
              <div className="block md:hidden space-y-4 mt-6">
                {payments.map((payment) => (
                  <div key={payment.id} className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-red-950">#{payment.id}</h3>
                        <p className="text-sm text-neutral-600">{payment.attraction_name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-neutral-900">
                          Rp {payment.total_price.toLocaleString(locale === 'en' ? 'en-US' : 'id-ID')}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {payment.quantity} {locale === 'en' ? 'tickets' : 'tiket'}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-neutral-500">{t('payment_history.visit_date')}</p>
                        <p className="text-neutral-900">
                          {payment.visit_date ? new Date(payment.visit_date).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID') : '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-500">{t('payment_history.order_date')}</p>
                        <p className="text-neutral-900">
                          {new Date(payment.created_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID')}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-neutral-200">
                      <div className="flex justify-center">
                        <QRCode 
                          value={getQRValue(payment)}
                          size={180}
                          title={`${t('payment_history.order_id')} #${payment.id}`}
                          showDownload={true}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
