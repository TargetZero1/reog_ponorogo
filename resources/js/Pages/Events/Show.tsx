import { Layout } from '../../Components/Layout';
import { Ticket } from 'lucide-react';

export default function Show(props: any) {
  const event = props.event;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
        <p className="text-sm text-neutral-600 mb-2">{event.location} — {event.date ? new Date(event.date).toLocaleString() : 'TBA'}</p>
        <p className="text-sm text-neutral-600 mb-4 font-semibold">Harga: {Number(event.price) > 0 ? `Rp ${Number(event.price).toLocaleString('id-ID')}` : 'Gratis'}</p>
        <div className="prose">
          <p>{event.description}</p>
        </div>
        <div className="mt-6 flex gap-4">
          <a href="/events" className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200">Kembali ke Event</a>
          <button
            onClick={() => {
              window.location.href = `/pesan-ticket/checkout?type=event&id=${event.id}`;
            }}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
          >
            <Ticket size={20} />
            Pesan Ticket
          </button>
        </div>
      </div>
    </Layout>
  );
}
