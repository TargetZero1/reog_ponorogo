import React, { useState } from 'react';
import { Eye, CheckCircle, Clock, XCircle, RefreshCw, Search, Filter, Download } from 'lucide-react';
import { usePage, router, Link } from '@inertiajs/react';
import { Layout } from '../../Components/Layout';
import { useTranslations, getLocalizedRoute } from '@/utils/translations';

interface OrdersProps {
  orders: any;
  filters?: any;
}

export default function Orders({ orders, filters }: OrdersProps) {
  const page = usePage();
  const { csrf_token } = page.props as any;
  const { locale } = useTranslations();

  const [q, setQ] = useState(filters?.q || '');
  const [startDate, setStartDate] = useState(filters?.start_date || '');
  const [endDate, setEndDate] = useState(filters?.end_date || '');
  const [status, setStatus] = useState(filters?.status || '');
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  function buildExportUrl() {
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    if (status) params.append('status', status);
    return `${getLocalizedRoute('admin.orders.export', {}, locale)}?${params.toString()}`;
  }

  function applyFilters() {
    const params: any = {};
    if (q) params.q = q;
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    if (status) params.status = status;
    
    router.get(getLocalizedRoute('admin.orders', {}, locale), params, {
      preserveState: true,
      preserveScroll: true,
    });
  }

  async function updateStatus(id: number, newStatus: string) {
    if (!confirm(`Ubah status pesanan #${id} menjadi "${newStatus}"?`)) return;
    
    setUpdatingStatus(id);
    try {
      const response = await fetch(getLocalizedRoute('admin.orders.update_status', { id }, locale), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf_token,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Use Inertia to reload without full page refresh
        router.reload({ only: ['orders'] });
      } else {
        alert('Gagal memperbarui status.');
      }
    } catch (e) {
      alert('Gagal memperbarui status.');
    } finally {
      setUpdatingStatus(null);
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; bgColor: string; icon: any; label: string }> = {
      pending: {
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-100 border-yellow-300',
        icon: Clock,
        label: 'Pending'
      },
      completed: {
        color: 'text-green-700',
        bgColor: 'bg-green-100 border-green-300',
        icon: CheckCircle,
        label: 'Completed'
      },
      cancelled: {
        color: 'text-red-700',
        bgColor: 'bg-red-100 border-red-300',
        icon: XCircle,
        label: 'Cancelled'
      },
      refunded: {
        color: 'text-blue-700',
        bgColor: 'bg-blue-100 border-blue-300',
        icon: RefreshCw,
        label: 'Refunded'
      },
    };

    const config = statusConfig[status] || {
      color: 'text-gray-700',
      bgColor: 'bg-gray-100 border-gray-300',
      icon: Clock,
      label: status
    };

    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bgColor} ${config.color}`}>
        <Icon size={14} />
        {config.label}
      </span>
    );
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-3 sm:p-4 md:p-6 pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Orders Management</h1>
            <p className="text-gray-600">View and manage all customer orders</p>
          </div>

          {/* Filters Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={20} className="text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                />
              </div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            <div className="flex items-center justify-end gap-3 mt-4">
              <a
                href={buildExportUrl()}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md font-medium"
              >
                <Download size={18} />
                Export PDF
              </a>
              <button
                onClick={applyFilters}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition shadow-md font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Orders Table Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-amber-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.total}</p>
                </div>
                {orders.total > 0 && (
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">Showing</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {orders.from} - {orders.to} of {orders.total}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <table className="w-full table-fixed">
                <thead className="bg-gradient-to-r from-red-950 to-red-900 text-white">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold">Order ID</th>
                    <th className="text-left py-4 px-6 font-semibold">Customer</th>
                    <th className="text-left py-4 px-6 font-semibold">Email</th>
                    <th className="text-left py-4 px-6 font-semibold">Attraction</th>
                    <th className="text-center py-4 px-6 font-semibold">Qty</th>
                    <th className="text-left py-4 px-6 font-semibold">Amount</th>
                    <th className="text-left py-4 px-6 font-semibold">Date</th>
                    <th className="text-left py-4 px-6 font-semibold w-40">Status</th>
                    <th className="text-center py-4 px-6 font-semibold w-48">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.data.map((order: any, idx: number) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">#{order.id}</td>
                      <td className="py-4 px-6 text-gray-700 font-medium">{order.user?.name || 'Unknown'}</td>
                      <td className="py-4 px-6 text-gray-600 text-sm">{order.user?.email || '-'}</td>
                      <td className="py-4 px-6 text-gray-700">{order.attraction_name}</td>
                      <td className="py-4 px-6 text-center font-semibold text-gray-900">{order.quantity}</td>
                      <td className="py-4 px-6 font-semibold text-green-600">
                        Rp {Number(order.total_price).toLocaleString('id-ID')}
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm">
                        {new Date(order.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(order.payment_status)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={getLocalizedRoute('admin.orders.show', { id: order.id }, locale)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition flex-shrink-0"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </Link>
                          <select
                            value={order.payment_status}
                            onChange={(e) => updateStatus(order.id, e.target.value)}
                            disabled={updatingStatus === order.id}
                            className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-red-500 focus:border-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[110px]"
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="refunded">Refunded</option>
                          </select>
                          {updatingStatus === order.id && (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 flex-shrink-0"></div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {orders.data.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-gray-500">
                        <p className="text-lg">No orders found</p>
                        <p className="text-sm mt-2">Try adjusting your filters</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {orders.last_page > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {orders.from} to {orders.to} of {orders.total} orders
                  </p>
                  <div className="flex gap-2">
                    {orders.current_page > 1 && (
                      <button
                        onClick={() => router.get(getLocalizedRoute('admin.orders', {}, locale), { ...filters, page: orders.current_page - 1 })}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition text-sm font-medium"
                      >
                        Previous
                      </button>
                    )}
                    {orders.current_page < orders.last_page && (
                      <button
                        onClick={() => router.get(getLocalizedRoute('admin.orders', {}, locale), { ...filters, page: orders.current_page + 1 })}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition text-sm font-medium"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
