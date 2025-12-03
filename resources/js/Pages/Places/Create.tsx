import React from 'react';
import { usePage } from '@inertiajs/react';
import { Layout } from '../../Components/Layout';

export default function CreatePlace() {
  const page = usePage();
  const { csrf_token } = page.props as any;

  return (
    <Layout>
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Create Place</h1>
        <form method="POST" action={route('admin.places.store')}>
          <input type="hidden" name="_token" value={csrf_token} />
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" className="mt-1 block w-full border rounded px-3 py-2" required />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input name="category" className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input name="price" type="number" className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" className="mt-1 block w-full border rounded px-3 py-2" rows={4} />
          </div>
          <div className="flex gap-3">
            <button className="bg-amber-500 text-red-950 px-4 py-2 rounded">Create</button>
            <a href={route('admin.places.index')} className="text-gray-600 self-center">Cancel</a>
          </div>
        </form>
      </div>
    </Layout>
  );
}
