import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { UserCircle, LogOut, BarChart3, Users, ShoppingCart, FileText, Home, MapPin } from 'lucide-react';
import { useTranslations, getLocalizedRoute } from '@/utils/translations';

interface ProfileDropdownProps {
  scrolled: boolean;
  isMobile?: boolean;
  isWhiteBackgroundPage?: boolean;
}

export function ProfileDropdown({ scrolled, isMobile = false, isWhiteBackgroundPage = false }: ProfileDropdownProps) {
  // Use white background page logic if provided, otherwise fall back to scrolled
  const useWhiteTheme = isWhiteBackgroundPage || (scrolled && !isWhiteBackgroundPage);
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = usePage().props as any;
  const user = auth?.user;
  const isAdmin = user?.role === 'admin';
  const { t, locale } = useTranslations();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (e?: React.MouseEvent) => {
    e?.preventDefault();
    // ✅ FIXED: Use named route for logout
    router.post(getLocalizedRoute('logout', {}, locale));
    setIsOpen(false);
  };

  const dropdownClasses = `absolute right-0 mt-2 w-56 rounded-md shadow-lg ${useWhiteTheme ? 'bg-white ring-1 ring-black ring-opacity-5' : 'bg-red-900'} focus:outline-none`;
  const linkClasses = `block px-4 py-2 text-sm ${useWhiteTheme ? 'text-gray-700 hover:bg-gray-100' : 'text-amber-50 hover:bg-red-800'}`;
  const sectionHeaderClasses = `px-4 py-2 text-xs font-bold uppercase tracking-wider ${useWhiteTheme ? 'text-gray-600 bg-gray-100' : 'text-amber-200 bg-red-950'}`;
  const adminLinkClasses = `flex items-center gap-2 px-4 py-2 text-sm ${useWhiteTheme ? 'text-blue-700 hover:bg-blue-50' : 'text-blue-200 hover:bg-red-800'}`;

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
          useWhiteTheme ? 'bg-amber-500 text-red-950' : 'bg-red-800 text-amber-50'
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
                <div className={`px-4 py-3 text-xs ${useWhiteTheme ? 'text-gray-500 border-b border-gray-200' : 'text-amber-100 border-b border-red-700'}`}>
                  {user.name || user.email}
                  {isAdmin && <span className="ml-2 inline-block bg-red-600 text-white px-2 py-0.5 rounded text-xs">ADMIN</span>}
                </div>

                {/* User Section */}
                {!isAdmin && (
                  <>
                    <Link
                      href={getLocalizedRoute('profile', {}, locale)}
                      className={linkClasses}
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-profile"
                    >
                      {t('profile.title')}
                    </Link>
                    <Link
                      href={getLocalizedRoute('payment.history', {}, locale)}
                      className={linkClasses}
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-orders"
                    >
                      {t('payment_history.title')}
                    </Link>
                  </>
                )}

                {/* Admin Section */}
                {isAdmin && (
                  <>
                    <Link
                      href={getLocalizedRoute('profile', {}, locale)}
                      className={linkClasses}
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-admin-profile"
                    >
                      {t('profile.as_admin')}
                    </Link>
                    <div className={sectionHeaderClasses} role="none">
                      {t('nav.admin_label')}
                    </div>
                    <Link
                      href={getLocalizedRoute('admin.dashboard', {}, locale)}
                      className={adminLinkClasses}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <Home size={16} />
                      {t('nav.dashboard')}
                    </Link>
                    <Link
                      href={getLocalizedRoute('admin.analytics', {}, locale)}
                      className={adminLinkClasses}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <BarChart3 size={16} />
                      {t('nav.analytics')}
                    </Link>
                    <Link
                      href={getLocalizedRoute('admin.orders', {}, locale)}
                      className={adminLinkClasses}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <ShoppingCart size={16} />
                      {t('nav.orders')}
                    </Link>
                    <Link
                      href={getLocalizedRoute('admin.users', {}, locale)}
                      className={adminLinkClasses}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <Users size={16} />
                      {t('nav.users')}
                    </Link>
                    <Link
                      href={getLocalizedRoute('admin.reports', {}, locale)}
                      className={adminLinkClasses}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <FileText size={16} />
                      {t('nav.reports')}
                    </Link>
                    <Link
                      href={getLocalizedRoute('admin.events.index', {}, locale)}
                      className={adminLinkClasses}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <BarChart3 size={16} />
                      {t('nav.manage_events')}
                    </Link>
                    <Link
                      href={getLocalizedRoute('admin.places.index', {}, locale)}
                      className={adminLinkClasses}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <MapPin size={16} />
                      {t('nav.manage_places')}
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className={`${linkClasses} w-full text-left flex items-center gap-2 border-t ${useWhiteTheme ? 'border-gray-200' : 'border-red-700'}`}
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-logout"
                >
                  <LogOut size={16} />
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href={getLocalizedRoute('pesan.login', {}, locale)}
                  className={linkClasses}
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-login"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href={getLocalizedRoute('pesan.register', {}, locale)}
                  className={linkClasses}
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-register"
                >
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}