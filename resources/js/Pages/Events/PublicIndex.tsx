import React from 'react';
import { Layout } from '../../Components/Layout';
import { Calendar, MapPin } from 'lucide-react';

export default function PublicIndex({ events }: any) {
  events = events || { data: [] };

  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-red-900">Agenda & Events</h1>
            <p className="text-gray-600 mt-2">Lihat acara budaya dan pertunjukan yang akan datang</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.data.map((e: any) => (
              <div key={e.id} className="bg-white rounded-xl shadow p-4 border">
                <h3 className="font-bold text-lg text-red-900">{e.title}</h3>
                <div className="mt-2 text-sm text-gray-600 flex items-center gap-3">
                  <Calendar size={16} />
                  <span>{e.date ? new Date(e.date).toLocaleDateString('id-ID') : 'Tanggal TBA'}</span>
                </div>
                <div className="mt-2 text-sm text-gray-600 flex items-center gap-3">
                  <MapPin size={16} />
                  <span>{e.location || 'Lokasi TBA'}</span>
                </div>
                <p className="mt-3 text-sm text-gray-700 line-clamp-3">{e.description}</p>
                <a href={`/events/${e.slug || e.id}`} className="inline-block mt-4 text-amber-600 font-semibold">Lihat detail</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
