import React from 'react';
import { BarChart3, TrendingUp, Download, FileSpreadsheet } from 'lucide-react';
import { Layout } from '../../Components/Layout';

interface AnalyticsProps {
  ticketsByAttraction: any[];
  ordersByMonth: any[];
  averageOrderValue: number;
  totalTicketsSold: number;
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  todayOrders: number;
  todayRevenue: number;
  thisMonthOrders: number;
  thisMonthRevenue: number;
  paymentStatusBreakdown: any[];
}

export default function Analytics({
  ticketsByAttraction,
  ordersByMonth,
  averageOrderValue,
  totalTicketsSold,
  totalRevenue,
  totalOrders,
  totalUsers,
  todayOrders,
  todayRevenue,
  thisMonthOrders,
  thisMonthRevenue,
  paymentStatusBreakdown,
}: AnalyticsProps) {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">Detailed insights into your business performance</p>
          </div>
          <div className="flex gap-3">
            <a
              href={route('admin.analytics.export')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
            >
              <Download size={18} />
              Export PDF
            </a>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-green-600">Rp {Number(totalRevenue).toLocaleString('id-ID')}</p>
            <p className="text-sm text-gray-500 mt-2">All time</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Average Order Value</h3>
              <TrendingUp className="text-blue-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-blue-600">Rp {Number(averageOrderValue).toLocaleString('id-ID')}</p>
            <p className="text-sm text-gray-500 mt-2">Per order</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Tickets Sold</h3>
              <BarChart3 className="text-purple-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-purple-600">{totalTicketsSold}</p>
            <p className="text-sm text-gray-500 mt-2">All time</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
              <BarChart3 className="text-orange-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-orange-600">{totalOrders}</p>
            <p className="text-sm text-gray-500 mt-2">All time</p>
          </div>
        </div>

        {/* Today & This Month Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6 border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Today's Orders</h3>
            <p className="text-2xl font-bold text-blue-700">{todayOrders}</p>
            <p className="text-sm text-blue-600 mt-1">Rp {Number(todayRevenue).toLocaleString('id-ID')}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-6 border border-green-200">
            <h3 className="text-sm font-semibold text-green-900 mb-2">This Month Orders</h3>
            <p className="text-2xl font-bold text-green-700">{thisMonthOrders}</p>
            <p className="text-sm text-green-600 mt-1">Rp {Number(thisMonthRevenue).toLocaleString('id-ID')}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md p-6 border border-purple-200">
            <h3 className="text-sm font-semibold text-purple-900 mb-2">Total Users</h3>
            <p className="text-2xl font-bold text-purple-700">{totalUsers}</p>
            <p className="text-sm text-purple-600 mt-1">Registered users</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-md p-6 border border-amber-200">
            <h3 className="text-sm font-semibold text-amber-900 mb-2">Conversion Rate</h3>
            <p className="text-2xl font-bold text-amber-700">
              {totalUsers > 0 ? ((totalOrders / totalUsers) * 100).toFixed(1) : 0}%
            </p>
            <p className="text-sm text-amber-600 mt-1">Orders per user</p>
          </div>
        </div>

        {/* Payment Status Breakdown */}
        {paymentStatusBreakdown && paymentStatusBreakdown.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Status Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paymentStatusBreakdown.map((status, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700 capitalize">{status.payment_status}</span>
                    <span className="text-lg font-bold text-gray-900">{status.count}</span>
                  </div>
                  <p className="text-sm text-gray-600">Rp {Number(status.revenue).toLocaleString('id-ID')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sales by Attraction */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sales by Attraction</h2>
          <div className="space-y-4">
            {ticketsByAttraction.map((attr, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">{attr.attraction_name}</span>
                  <span className="text-gray-600 text-sm">{attr.count} orders • Rp {Number(attr.revenue).toLocaleString('id-ID')}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${(attr.count / (ticketsByAttraction[0]?.count || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders by Month */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Orders by Month</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Month</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Orders</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {ordersByMonth.map((month, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(month.month).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">{month.count}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">Rp {Number(month.revenue).toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
}
