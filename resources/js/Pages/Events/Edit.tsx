import { useForm } from '@inertiajs/react';
import { Layout } from '../../Components/Layout';

export default function Edit(props: any) {
  const event = props.event || {};
  const { data, setData, put, errors, processing } = useForm({
    title: event.title || '',
    description: event.description || '',
    date: event.date ? new Date(event.date).toISOString().slice(0, 16) : '',
    location: event.location || '',
    price: event.price || '0',
    capacity: event.capacity || '0',
  });

  function submit(e: any) {
    e.preventDefault();
    put(`/events/${event.id}`);
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-gradient-to-r from-[#6b0000] via-[#7b0b0b] to-[#8b0b0b] text-white p-6 rounded-lg mb-6">
          <h1 className="text-2xl font-bold mb-0">Edit Event</h1>
        </div>
        <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-red-950">Title</label>
            <input
              value={data.title}
              onChange={e => setData('title', e.target.value)}
              className={`mt-1 block w-full border rounded p-2 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-red-950">Description</label>
            <textarea
              value={data.description}
              onChange={e => setData('description', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-red-950">Date</label>
            <input
              type="datetime-local"
              value={data.date}
              onChange={e => setData('date', e.target.value)}
              className={`mt-1 block w-full border rounded p-2 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-red-950">Location</label>
            <input
              value={data.location}
              onChange={e => setData('location', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-950">Price</label>
              <input
                type="number"
                value={data.price}
                onChange={e => setData('price', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-red-950">Capacity</label>
              <input
                type="number"
                value={data.capacity}
                onChange={e => setData('capacity', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
              {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-amber-500 text-red-950 rounded font-semibold hover:bg-amber-600 disabled:opacity-50"
            >
              {processing ? 'Updating...' : 'Update Event'}
            </button>
            <a href="/events" className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-semibold hover:bg-gray-300">
              Cancel
            </a>
          </div>
        </form>
      </div>
    </Layout>
  );
}
