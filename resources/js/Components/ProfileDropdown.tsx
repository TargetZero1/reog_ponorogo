
import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { UserCircle, LogOut, BarChart3, Users, ShoppingCart, FileText, Home, MapPin } from 'lucide-react';

interface ProfileDropdownProps {
  scrolled: boolean;
  isMobile?: boolean;
}

export function ProfileDropdown({ scrolled, isMobile = false }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = usePage().props as any;
  const user = auth?.user;
  const isAdmin = user?.role === 'admin';

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (e?: React.MouseEvent) => {
    e?.preventDefault();
    router.post('/logout');
    setIsOpen(false);
  };


  const dropdownClasses = `absolute right-0 mt-2 w-56 rounded-md shadow-lg ${scrolled ? 'bg-white ring-1 ring-black ring-opacity-5' : 'bg-red-900'} focus:outline-none`;
  const linkClasses = `block px-4 py-2 text-sm ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-amber-50 hover:bg-red-800'}`;
  const sectionHeaderClasses = `px-4 py-2 text-xs font-bold uppercase tracking-wider ${scrolled ? 'text-gray-600 bg-gray-100' : 'text-amber-200 bg-red-950'}`;
  const adminLinkClasses = `flex items-center gap-2 px-4 py-2 text-sm ${scrolled ? 'text-blue-700 hover:bg-blue-50' : 'text-blue-200 hover:bg-red-800'}`;

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
          scrolled ? 'bg-amber-500 text-red-950' : 'bg-red-800 text-amber-50'
        }`}
        aria-label="User profile menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <UserCircle size={24} />
      </button>

      {isOpen && (
        <div
          className={dropdownClasses}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {user ? (
              <>
                <div className={`px-4 py-3 text-xs ${scrolled ? 'text-gray-500 border-b border-gray-200' : 'text-amber-100 border-b border-red-700'}`}>
                  {user.name || user.email}
                  {isAdmin && <span className="ml-2 inline-block bg-red-600 text-white px-2 py-0.5 rounded text-xs">ADMIN</span>}
                </div>

                {/* User Section */}
                <Link
                  href="/profile"
                  className={linkClasses}
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-profile"
                >
                  Profile
                </Link>
                <Link
                  href="/payment-history"
                  className={linkClasses}
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-orders"
                >
                  My Orders
                </Link>

                {/* Admin Section */}
                {isAdmin && (
                  <>
                    <div className={sectionHeaderClasses} role="none">
                      Admin Panel
                    </div>
                    <Link
                      href="/admin/dashboard"
                      className={adminLinkClasses}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <Home size={16} />
                      Dashboard
                    </Link>
                    <Link
                      href="/admin/analytics"
                      className={adminLinkClasses}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <BarChart3 size={16} />
                      Analytics
                    </Link>
                    <Link
                      href="/admin/orders"
                      className={adminLinkClasses}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <ShoppingCart size={16} />
                      Orders
                    </Link>
                    <Link
                      href="/admin/users"
                      className={adminLinkClasses}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <Users size={16} />
                      Users
                    </Link>
                    <Link
                      href="/admin/reports"
                      className={adminLinkClasses}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <FileText size={16} />
                      Reports
                    </Link>
                    <Link
                      href="/admin/events"
                      className={adminLinkClasses}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <BarChart3 size={16} />
                      Manage Events
                    </Link>
                    <Link
                      href="/admin/places"
                      className={adminLinkClasses}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <MapPin size={16} />
                      Manage Wisata
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className={`${linkClasses} w-full text-left flex items-center gap-2 border-t ${scrolled ? 'border-gray-200' : 'border-red-700'}`}
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-logout"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/pesan-ticket/login"
                  className={linkClasses}
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-login"
                >
                  Login
                </Link>
                <Link
                  href="/pesan-ticket/register"
                  className={linkClasses}
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
