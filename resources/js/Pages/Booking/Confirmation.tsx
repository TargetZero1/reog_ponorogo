import React, { useEffect } from 'react';
import { CheckCircle, MessageCircle, MapPin } from 'lucide-react';

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
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle size={48} className="text-green-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-center text-green-600">Pesanan Berhasil!</h2>
        <p className="text-center text-neutral-600 mb-6">Terima kasih telah memesan tiket</p>

        <div className="space-y-3 bg-neutral-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between">
            <span className="text-neutral-600">ID Pesanan:</span>
            <span className="font-semibold text-neutral-900">{ticket.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Destinasi:</span>
            <span className="font-semibold text-neutral-900">{ticket.attraction_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Jumlah Tiket:</span>
            <span className="font-semibold text-neutral-900">{ticket.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Total Harga:</span>
            <span className="font-semibold text-neutral-900">Rp {Number(ticket.total_price).toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Tanggal Kunjungan:</span>
            <span className="font-semibold text-neutral-900">{new Date(ticket.visit_date).toLocaleDateString('id-ID')}</span>
          </div>
        </div>

        {whatsappUrl && (
          <>
            <p className="text-sm text-neutral-600 text-center mb-4">
              Anda akan diarahkan ke WhatsApp dalam 2 detik untuk mengkonfirmasi pesanan...
            </p>
            <button
              onClick={() => window.location.href = whatsappUrl}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center gap-2 font-semibold"
            >
              <MessageCircle size={20} />
              Kirim ke WhatsApp Sekarang
            </button>
          </>
        )}

        <div className="mt-4 pt-4 border-t border-neutral-200">
          <a
            href={route('places.index')}
            className="flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
          >
            <MapPin size={18} />
            Kembali ke Destinasi
          </a>
        </div>
      </div>
    </div>
  );
}
