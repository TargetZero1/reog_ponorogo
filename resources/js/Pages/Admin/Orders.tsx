import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { Layout } from '../../Components/Layout';

interface OrdersProps {
  orders: any;
  filters?: any;
}

export default function Orders({ orders, filters }: OrdersProps) {
  const page = usePage();
  const { csrf_token } = page.props as any;

  const [q, setQ] = useState(filters?.q || '');
  const [startDate, setStartDate] = useState(filters?.start_date || '');
  const [endDate, setEndDate] = useState(filters?.end_date || '');
  const [status, setStatus] = useState(filters?.status || '');

  function buildExportUrl() {
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    if (status) params.append('status', status);
    return `/admin/orders/export?${params.toString()}`;
  }

  async function updateStatus(id: number, newStatus: string) {
    if (!confirm('Ubah status pesanan?')) return;
    try {
      await fetch(`/admin/orders/${id}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf_token,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      // simple reload to reflect changes
      window.location.reload();
    } catch (e) {
      alert('Gagal memperbarui status.');
    }
  }

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-2">View and manage all customer orders</p>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama, email, attraction, id" className="border rounded px-3 py-2" />
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border rounded px-3 py-2" />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border rounded px-3 py-2" />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded px-3 py-2">
            <option value="">Semua Status</option>
            <option value="pending">pending</option>
            <option value="completed">completed</option>
            <option value="cancelled">cancelled</option>
            <option value="refunded">refunded</option>
          </select>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div />
          <div>
            <a href={buildExportUrl()} className="inline-block bg-blue-600 text-white px-4 py-2 rounded mr-2">Export CSV</a>
            <button onClick={() => {
              const params = new URLSearchParams();
              if (q) params.append('q', q);
              if (startDate) params.append('start_date', startDate);
              if (endDate) params.append('end_date', endDate);
              if (status) params.append('status', status);
              window.location.href = `/admin/orders?${params.toString()}`;
            }} className="inline-block bg-green-600 text-white px-4 py-2 rounded">Apply</button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <p className="text-gray-600">Total Orders: <span className="font-bold text-gray-900">{orders.total}</span></p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Attraction</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Qty</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.data.map((order: any, idx: number) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900">#{order.id}</td>
                    <td className="py-3 px-4 text-gray-700">{order.user?.name || 'Unknown'}</td>
                    <td className="py-3 px-4 text-gray-700 text-xs">{order.user?.email || '-'}</td>
                    <td className="py-3 px-4 text-gray-700">{order.attraction_name}</td>
                    <td className="py-3 px-4 font-medium text-center">{order.quantity}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">Rp {Number(order.total_price).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">{order.payment_status}</span>
                        <a href={`/admin/orders/${order.id}`} className="text-blue-600 hover:underline flex items-center"><Eye size={16} className="mr-1" />View</a>
                        <select value={order.payment_status} onChange={(e) => updateStatus(order.id, e.target.value)} className="border rounded px-2 py-1 text-sm">
                          <option value="pending">pending</option>
                          <option value="completed">completed</option>
                          <option value="cancelled">cancelled</option>
                          <option value="refunded">refunded</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Info */}
          {orders.total > orders.per_page && (
            <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-600">
              Showing {orders.from} to {orders.to} of {orders.total} orders
            </div>
          )}
        </div>
        </div>
      </div>
    </Layout>
  );
}
