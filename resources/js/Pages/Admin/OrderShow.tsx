import React, { useState } from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import { Layout } from '../../Components/Layout';
import { useTranslations, getLocalizedRoute } from '@/utils/translations';

interface OrderShowProps {
  order: any;
}

export default function OrderShow({ order }: OrderShowProps) {
  const page = usePage();
  const { csrf_token } = page.props as any;
  const { locale } = useTranslations();

  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(order.payment_status);

  async function updateStatus(newStatus: string) {
    if (updatingStatus) return;
    if (!confirm(`Update order status to "${newStatus}"?`)) return;

    setUpdatingStatus(true);
    try {
      const response = await fetch(getLocalizedRoute('admin.orders.update_status', { id: order.id }, locale), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf_token,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setCurrentStatus(newStatus);
        router.reload({ only: ['order'] });
      } else {
        alert('Failed to update status.');
      }
    } catch (e) {
      alert('Failed to update status.');
    } finally {
      setUpdatingStatus(false);
    }
  }

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
          <select 
            value={currentStatus}
            onChange={(e) => updateStatus(e.target.value)}
            disabled={updatingStatus}
            className="border rounded px-3 py-2 mr-2 disabled:opacity-50"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
          <button 
            onClick={() => updateStatus(currentStatus)} 
            disabled={updatingStatus}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {updatingStatus ? 'Updating...' : 'Update Status'}
          </button>

          <Link href={getLocalizedRoute('admin.orders', {}, locale)} className="text-sm text-gray-600 hover:text-gray-800">← Back to orders</Link>
        </div>
        </div>
      </div>
    </Layout>
  );
}
