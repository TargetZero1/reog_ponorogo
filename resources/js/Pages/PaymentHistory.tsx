import React from 'react';
import { Head } from '@inertiajs/react';
import { Layout } from '@/Components/Layout';

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
  return (
    <Layout>
      <Head title="Payment History" />
      <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-red-950 mb-6">Riwayat Pembayaran</h2>

          {payments.length === 0 ? (
            <p className="text-neutral-600">Anda belum memiliki riwayat pembayaran.</p>
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
                        <p className="text-neutral-500">Tanggal Kunjungan</p>
                        <p className="text-neutral-900">
                          {payment.visit_date ? new Date(payment.visit_date).toLocaleDateString('id-ID') : '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-500">Tanggal Pesan</p>
                        <p className="text-neutral-900">
                          {new Date(payment.created_at).toLocaleDateString('id-ID')}
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
                        ID Pesanan
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Attraction
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Jumlah Tiket
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Total Harga
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Tanggal Kunjungan
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Tanggal Pesan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                          #{payment.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          {payment.attraction_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          {payment.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          Rp {payment.total_price.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          {payment.visit_date ? new Date(payment.visit_date).toLocaleDateString('id-ID') : '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          {new Date(payment.created_at).toLocaleDateString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
