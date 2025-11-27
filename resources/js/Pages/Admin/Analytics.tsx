import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { Layout } from '../../Components/Layout';

interface AnalyticsProps {
  ticketsByAttraction: any[];
  ordersByMonth: any[];
  averageOrderValue: number;
  totalTicketsSold: number;
}

export default function Analytics({
  ticketsByAttraction,
  ordersByMonth,
  averageOrderValue,
  totalTicketsSold,
}: AnalyticsProps) {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">Detailed insights into your business performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Average Order Value</h3>
              <TrendingUp className="text-blue-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-blue-600">Rp {Number(averageOrderValue).toLocaleString('id-ID')}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Tickets Sold</h3>
              <BarChart3 className="text-green-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-green-600">{totalTicketsSold}</p>
          </div>
        </div>

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
