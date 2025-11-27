import React from 'react';
import { User as UserIcon } from 'lucide-react';
import { Layout } from '../../Components/Layout';

interface UsersProps {
  users: any;
}

export default function Users({ users }: UsersProps) {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-2">View and manage all registered users</p>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <p className="text-gray-600">Total Users: <span className="font-bold text-gray-900">{users.total}</span></p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">User ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Orders</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.data.map((user: any, idx: number) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900">#{user.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        {user.tickets_count || 0} orders
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{new Date(user.created_at).toLocaleDateString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Info */}
          {users.total > users.per_page && (
            <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-600">
              Showing {users.from} to {users.to} of {users.total} users
            </div>
          )}
        </div>
        </div>
      </div>
    </Layout>
  );
}
