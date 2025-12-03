import React from 'react';
import { usePage } from '@inertiajs/react';
import { Layout } from '../../Components/Layout';

interface OrderShowProps {
  order: any;
}

export default function OrderShow({ order }: OrderShowProps) {
  const page = usePage();
  const { csrf_token } = page.props as any;

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-neutral-600">Customer</p>
            <p className="font-semibold">{order.user?.name || 'Unknown'}</p>
            <p className="text-sm text-neutral-500">{order.user?.email}</p>
          </div>

          <div>
            <p className="text-sm text-neutral-600">Attraction</p>
            <p className="font-semibold">{order.attraction_name}</p>
            <p className="text-sm text-neutral-500">Visit: {order.visit_date}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-medium">Details</h2>
          <div className="mt-2 text-sm text-neutral-700">
            <p>Quantity: <strong>{order.quantity}</strong></p>
            <p>Total Price: <strong>Rp {Number(order.total_price).toLocaleString('id-ID')}</strong></p>
            <p>Status: <strong>{order.payment_status}</strong></p>
            <p>Created: <strong>{new Date(order.created_at).toLocaleString()}</strong></p>
          </div>
        </div>

        <div className="mt-6 flex items-center space-x-3">
          <form method="POST" action={`/admin/orders/${order.id}/status`}>
            <input type="hidden" name="_token" value={csrf_token} />
            <select name="status" defaultValue={order.payment_status} className="border rounded px-3 py-2 mr-2">
              <option value="pending">pending</option>
              <option value="completed">completed</option>
              <option value="cancelled">cancelled</option>
              <option value="refunded">refunded</option>
            </select>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Status</button>
          </form>

          <a href={route('admin.orders')} className="text-sm text-gray-600">Back to orders</a>
        </div>
        </div>
      </div>
    </Layout>
  );
}
