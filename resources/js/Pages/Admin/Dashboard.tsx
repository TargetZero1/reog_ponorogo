import React from 'react';
import { BarChart3, ShoppingCart, Users, Zap, Calendar, TrendingUp, DollarSign, FileText } from 'lucide-react';
import { Layout } from '../../Components/Layout';
import { Link } from '@inertiajs/react';

interface AdminDashboardProps {
  stats: {
    totalOrders: number;
    totalRevenue: number;
    totalUsers: number;
    totalEvents: number;
    todayOrders: number;
    todayRevenue: number;
    thisMonthOrders: number;
    thisMonthRevenue: number;
    thisMonthNewUsers: number;
    thisMonthNewEvents: number;
  };
  recentOrders: any[];
  ordersByMonth: any[];
  revenueByAttraction: any[];
  paymentStatusBreakdown: any[];
}

export default function Dashboard({ stats, recentOrders, ordersByMonth, revenueByAttraction, paymentStatusBreakdown }: AdminDashboardProps) {
  const statCards = [
    {
      icon: ShoppingCart,
      label: 'Total Orders',
      value: stats.totalOrders,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      change: stats.todayOrders,
      changeLabel: 'Today',
      changeType: 'number',
      showChange: true
    },
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: `Rp ${Number(stats.totalRevenue).toLocaleString('id-ID')}`,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      change: stats.todayRevenue,
      changeLabel: 'Today',
      changeType: 'currency',
      showChange: true
    },
    {
      icon: Users,
      label: 'Total Users',
      value: stats.totalUsers,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      change: stats.thisMonthNewUsers || 0,
      changeLabel: 'New This Month',
      changeType: 'number',
      showChange: true
    },
    {
      icon: Calendar,
      label: 'Total Events',
      value: stats.totalEvents,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      change: stats.thisMonthNewEvents || 0,
      changeLabel: 'New This Month',
      changeType: 'number',
      showChange: true
    },
  ];

  // Calculate max values for charts
  const maxOrders = Math.max(...ordersByMonth.map(m => m.count), 1);
  const maxRevenue = Math.max(...revenueByAttraction.map(a => a.revenue), 1);

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6 md:p-8 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's an overview of your business.</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, idx) => {
              const Icon = card.icon;
              const formattedChange = card.changeType === 'currency' 
                ? `Rp ${Number(card.change || 0).toLocaleString('id-ID')}` 
                : (card.change || 0);
              const changeSuffix = card.changeLabel === 'Today' 
                ? 'today' 
                : card.changeLabel === 'New This Month' 
                  ? 'new this month' 
                  : 'this month';
              
              return (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color} text-white shadow-md`}>
                      <Icon size={24} />
                    </div>
                    {card.showChange && (
                      <div className={`text-xs px-3 py-1 rounded-full ${card.bgColor} text-gray-700 font-semibold border border-gray-200`}>
                        {card.changeLabel}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-2">{card.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-3">{card.value}</p>
                    {card.showChange && (
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold text-gray-800">{formattedChange}</span>
                        <span className="text-gray-500 ml-1">{changeSuffix}</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Orders by Month Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-500" />
                  Orders by Month (Last 6 Months)
                </h2>
              </div>
              <div className="space-y-4">
                {ordersByMonth.map((month, idx) => {
                  const percentage = (month.count / maxOrders) * 100;
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-600 font-medium">
                        {new Date(month.month + '-01').toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">{month.count} orders</span>
                          <span className="text-sm text-gray-500">Rp {Number(month.revenue).toLocaleString('id-ID')}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {ordersByMonth.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No data available</p>
                )}
              </div>
            </div>

            {/* Revenue by Attraction Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 size={20} className="text-green-500" />
                  Top Attractions by Revenue
                </h2>
              </div>
              <div className="space-y-4">
                {revenueByAttraction.map((attr, idx) => {
                  const percentage = (attr.revenue / maxRevenue) * 100;
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-32 text-sm text-gray-600 font-medium truncate">
                        {attr.attraction_name}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">{attr.orders} orders</span>
                          <span className="text-sm text-green-600 font-semibold">Rp {Number(attr.revenue).toLocaleString('id-ID')}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {revenueByAttraction.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No data available</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Status & Recent Orders Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Payment Status Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText size={20} className="text-purple-500" />
                Payment Status Breakdown
              </h2>
              <div className="space-y-4">
                {paymentStatusBreakdown.map((status, idx) => {
                  const total = paymentStatusBreakdown.reduce((sum, s) => sum + s.count, 0);
                  const percentage = total > 0 ? (status.count / total) * 100 : 0;
                  const colors = {
                    'paid': 'from-green-500 to-green-600',
                    'pending': 'from-yellow-500 to-yellow-600',
                    'cancelled': 'from-red-500 to-red-600',
                    'refunded': 'from-gray-500 to-gray-600',
                  };
                  const color = colors[status.payment_status as keyof typeof colors] || 'from-gray-500 to-gray-600';
                  
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-700 font-medium capitalize">
                        {status.payment_status}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">{status.count} orders</span>
                          <span className="text-sm text-gray-500">Rp {Number(status.revenue).toLocaleString('id-ID')}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`bg-gradient-to-r ${color} h-full rounded-full transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {paymentStatusBreakdown.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No data available</p>
                )}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart size={20} className="text-amber-500" />
                  Recent Orders
                </h2>
                <Link
                  href={route('admin.orders')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                >
                  View All →
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b-2 border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-900">#{order.id}</td>
                        <td className="py-3 px-4 text-gray-700">{order.user?.name || 'Unknown'}</td>
                        <td className="py-3 px-4 font-semibold text-green-600">Rp {Number(order.total_price).toLocaleString('id-ID')}</td>
                        <td className="py-3 px-4 text-gray-600">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                      </tr>
                    ))}
                    {recentOrders.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-500">No recent orders</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
