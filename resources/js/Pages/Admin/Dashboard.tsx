import React from 'react';
import { BarChart3, ShoppingCart, Users, Zap } from 'lucide-react';
import { Layout } from '../../Components/Layout';

interface AdminDashboardProps {
  stats: {
    totalOrders: number;
    totalRevenue: number;
    totalUsers: number;
    totalEvents: number;
  };
  recentOrders: any[];
}

export default function Dashboard({ stats, recentOrders }: AdminDashboardProps) {
  const statCards = [
    {
      icon: ShoppingCart,
      label: 'Total Orders',
      value: stats.totalOrders,
      color: 'bg-blue-500',
    },
    {
      icon: Zap,
      label: 'Total Revenue',
      value: `Rp ${Number(stats.totalRevenue).toLocaleString('id-ID')}`,
      color: 'bg-green-500',
    },
    {
      icon: Users,
      label: 'Total Users',
      value: stats.totalUsers,
      color: 'bg-purple-500',
    },
    {
      icon: BarChart3,
      label: 'Total Events',
      value: stats.totalEvents,
      color: 'bg-orange-500',
    },
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your business.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
                  </div>
                  <div className={`${card.color} p-3 rounded-lg text-white`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Attraction</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">#{order.id}</td>
                    <td className="py-3 px-4 text-gray-700">{order.user?.name || 'Unknown'}</td>
                    <td className="py-3 px-4 text-gray-700">{order.attraction_name}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">Rp {Number(order.total_price).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4 text-gray-600">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
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
