import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';

interface CheckoutProps {
  attraction?: string;
  pricePerTicket: number;
  ticketType?: string;
  sourceId?: number;
}

export default function Checkout({ attraction, pricePerTicket, ticketType, sourceId }: CheckoutProps) {
  const page = usePage();
  const { errors, csrf_token } = page.props;
  const [quantity, setQuantity] = useState(1);
  const [visitDate, setVisitDate] = useState('');
  const [processing, setProcessing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Verify csrf_token on component mount and log debug info
  useEffect(() => {
    console.log('CSRF Token Available:', !!csrf_token);
  }, [csrf_token]);

  const totalPrice = useMemo(() => {
    const q = Number(quantity) || 1;
    return q * Number(pricePerTicket || 0);
  }, [quantity, pricePerTicket]);

  const today = new Date().toISOString().split('T')[0];

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // basic client-side guard
    if (!visitDate) {
      alert('Pilih tanggal kunjungan.');
      return;
    }

    setProcessing(true);
    // Use regular form submission (not Inertia post) to allow server-side redirect
    if (formRef.current) {
      formRef.current.submit();
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Pesan Tiket</h2>
        <p className="text-sm text-neutral-600 mb-2">Attraction: <span className="font-semibold">{attraction || '—'}</span></p>
        <p className="text-sm text-neutral-600 mb-4">Harga per tiket: <span className="font-semibold">Rp {Number(pricePerTicket).toLocaleString('id-ID')}</span></p>

        {(errors.attraction || errors.quantity || errors.total_price || errors.visit_date) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            {errors.attraction && <p className="text-red-600 text-sm">{Array.isArray(errors.attraction) ? errors.attraction[0] : errors.attraction}</p>}
            {errors.quantity && <p className="text-red-600 text-sm">{Array.isArray(errors.quantity) ? errors.quantity[0] : errors.quantity}</p>}
            {errors.total_price && <p className="text-red-600 text-sm">{Array.isArray(errors.total_price) ? errors.total_price[0] : errors.total_price}</p>}
            {errors.visit_date && <p className="text-red-600 text-sm">{Array.isArray(errors.visit_date) ? errors.visit_date[0] : errors.visit_date}</p>}
          </div>
        )}

        <form ref={formRef} onSubmit={submit} method="POST" action="/pesan-ticket/create" className="space-y-4">
          <input type="hidden" name="_token" value={csrf_token as string} />
          <input type="hidden" name="attraction" value={attraction || ''} />
          <input type="hidden" name="ticket_type" value={ticketType || ''} />
          <input type="hidden" name="source_id" value={sourceId || ''} />

          <div>
            <label className="block text-sm font-medium text-neutral-700">Jumlah Tiket</label>
            <input
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              type="number"
              min={1}
              max={10}
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.quantity ? 'border-red-300' : 'border-neutral-300'}`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">Tanggal Kunjungan</label>
            <input
              name="visit_date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              type="date"
              min={today}
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.visit_date ? 'border-red-300' : 'border-neutral-300'}`}
              required
            />
            <p className="text-xs text-neutral-500 mt-1">Pilih tanggal mulai hari ini</p>
          </div>

          <input type="hidden" name="total_price" value={totalPrice} />

          <div className="text-lg font-bold text-neutral-800 mt-4 bg-amber-50 p-3 rounded-md">
            Total Pembayaran: Rp {totalPrice.toLocaleString('id-ID')}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition disabled:opacity-50 mt-6 flex items-center justify-center"
          >
            {processing ? 'Memproses...' : 'Pesan via WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  );
}
