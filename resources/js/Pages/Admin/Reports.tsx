import React from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Users as UsersIcon, Download, FileSpreadsheet } from 'lucide-react';
import { Layout } from '../../Components/Layout';

interface ReportsProps {
  summary: {
    totalOrders: number;
    totalRevenue: number;
    totalUsers: number;
    averageOrderValue: number;
  };
  topAttractions: any[];
  topCustomers: any[];
}

export default function Reports({ summary, topAttractions, topCustomers }: ReportsProps) {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-2">Comprehensive business reports and insights</p>
          </div>
          <div className="flex gap-3">
            <a
              href={route('admin.reports.export')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
            >
              <Download size={18} />
              Export PDF
            </a>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{summary.totalOrders}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg text-white">
                <ShoppingCart size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600 mt-2">Rp {Number(summary.totalRevenue).toLocaleString('id-ID')}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg text-white">
                <DollarSign size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{summary.totalUsers}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg text-white">
                <UsersIcon size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Order Value</p>
                <p className="text-2xl font-bold text-orange-600 mt-2">Rp {Number(summary.averageOrderValue).toLocaleString('id-ID')}</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-lg text-white">
                <TrendingUp size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Attractions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Attractions</h2>
            <div className="space-y-4">
              {topAttractions.map((attr, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{attr.attraction_name}</p>
                      <p className="text-sm text-gray-600">{attr.orders} orders</p>
                    </div>
                    <p className="text-lg font-bold text-green-600">Rp {Number(attr.revenue).toLocaleString('id-ID')}</p>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${(attr.revenue / (topAttractions[0]?.revenue || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Customers</h2>
            <div className="space-y-3">
              {topCustomers.map((customer, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{customer.name}</p>
                      <p className="text-xs text-gray-600">{customer.email}</p>
                    </div>
                  </div>
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {customer.tickets_count} orders
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
}
