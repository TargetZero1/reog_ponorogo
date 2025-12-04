import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProfileDropdown } from './ProfileDropdown';
import { usePage } from '@inertiajs/react';
import { useTranslations, getLocalizedRoute } from '@/utils/translations';

interface NavbarProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
}

export function Navbar({ activeSection = '', setActiveSection = () => {} }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const { auth } = usePage().props as any;
  const user = auth?.user;
  const { t, locale } = useTranslations();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const homeRoute = getLocalizedRoute('home', undefined, locale);
  const budayaRoute = getLocalizedRoute('budaya', undefined, locale);
  const wisataRoute = getLocalizedRoute('places.index', undefined, locale);
  const eventsRoute = getLocalizedRoute('events.index', undefined, locale);
  const adminEventsRoute = getLocalizedRoute('admin.events.index', undefined, locale);

  const adminBasePath = `/${locale}/admin`;
  const isAdminPage = currentPath.startsWith(adminBasePath);
  
  // Determine if current page has white background (needs maroon navbar)
  const homePathname = new URL(homeRoute, window.location.origin).pathname;
  const isWhiteBackgroundPage = currentPath !== homePathname || isAdminPage;

  const navLinks = [
    { id: 'beranda', label: t('nav.home'), href: homeRoute, isPage: false },
    { id: 'reog', label: t('nav.reog_section'), href: `${homeRoute}#reog`, isPage: false },
    { id: 'jenis-reog', label: t('nav.types_section'), href: `${homeRoute}#jenis-reog`, isPage: false },
    { id: 'budaya', label: t('nav.culture'), href: budayaRoute, isPage: true },
    { id: 'wisata', label: t('nav.places'), href: wisataRoute, isPage: true },
    { id: 'events', label: t('nav.events_page'), href: eventsRoute, isPage: true },
  ];

  const adminLinks = [
    { id: 'admin-events', label: t('admin.events'), href: adminEventsRoute, isPage: true },
  ];

  const scrollToSection = (id: string, href: string, isPage: boolean) => {
    setMobileMenuOpen(false);
    
    if (isPage) {
      window.location.href = href;
    } else {
      const homePath = new URL(homeRoute, window.location.origin).pathname;

      if (currentPath === homePath) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(id);
        }
      } else {
        // If on a different page, navigate to home anchor
        window.location.href = href;
      }
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:text-red-950 focus:px-4 focus:py-2 rounded-md z-50">Skip to content</a>

      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isAdminPage
            ? 'backdrop-blur-md bg-gradient-to-r from-red-950 via-red-900 to-red-950 shadow-lg border-b border-red-800/30'
            : scrolled 
              ? 'backdrop-blur-md bg-white/80 shadow-lg border-b border-white/20' 
              : isWhiteBackgroundPage
                ? 'backdrop-blur-md bg-gradient-to-r from-red-950 via-red-900 to-red-950 shadow-lg border-b border-red-800/30'
                : 'backdrop-blur-sm bg-black/20'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
            <a href={homeRoute} aria-label="Reog Ponorogo home" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-red-950">🦚</span>
              </div>
              <span className={`tracking-wide font-semibold drop-shadow-lg ${
                isAdminPage || (isWhiteBackgroundPage && !scrolled)
                  ? 'text-white' 
                  : scrolled 
                    ? 'text-red-950' 
                    : 'text-white'
              }`}>
                Reog Ponorogo
              </span>
            </a>
          </div>

          <div className="hidden md:flex space-x-2 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id, link.href, link.isPage)}
                aria-current={activeSection === link.id ? 'page' : undefined}
                className={`px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 font-medium ${
                  activeSection === link.id
                    ? isAdminPage || isWhiteBackgroundPage
                      ? 'bg-amber-500 text-red-950 shadow-lg'
                      : 'bg-amber-500 text-red-950 shadow-lg'
                    : isAdminPage || (isWhiteBackgroundPage && !scrolled)
                      ? 'text-white hover:bg-white/20 hover:text-amber-200 drop-shadow-lg'
                      : scrolled 
                        ? 'text-red-950 hover:bg-amber-50 hover:text-red-800 drop-shadow-sm' 
                        : 'text-white hover:bg-white/20 hover:text-amber-200 drop-shadow-lg'
                }`}
              >
                {link.label}
              </button>
            ))}
            {/* Admin section */}
            {user?.role === 'admin' && (
              <>
                <span className="ml-4 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold uppercase tracking-wider">{t('nav.admin_label')}</span>
                {adminLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id, link.href, link.isPage)}
                    aria-current={activeSection === link.id ? 'page' : undefined}
                    className={`px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 ${
                      activeSection === link.id
                        ? 'bg-red-700 text-white'
                        : 'text-red-700 hover:bg-red-100 hover:text-red-900'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </>
            )}
            <ProfileDropdown scrolled={scrolled} isWhiteBackgroundPage={isAdminPage || isWhiteBackgroundPage} />
          </div>
@@
          <div className="md:hidden flex items-center gap-2">
            <ProfileDropdown scrolled={scrolled} isMobile={true} isWhiteBackgroundPage={false} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className={`p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 drop-shadow-lg ${
                isAdminPage || (isWhiteBackgroundPage && !scrolled)
                  ? 'text-white hover:bg-white/20'
                  : scrolled 
                    ? 'text-red-950 hover:bg-amber-50' 
                    : 'text-white hover:bg-white/20'
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div id="mobile-menu" className={`md:hidden backdrop-blur-md ${
          isAdminPage || isWhiteBackgroundPage
            ? 'bg-gradient-to-r from-red-950/95 via-red-900/95 to-red-950/95 border-red-800/30'
            : scrolled 
              ? 'bg-white/90 border-neutral-200' 
              : 'bg-black/40 border-white/20'
        } border-t`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id, link.href, link.isPage)}
                className={`block w-full text-left px-3 py-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium ${
                  activeSection === link.id
                    ? 'bg-amber-500 text-red-950'
                    : isAdminPage || isWhiteBackgroundPage
                      ? 'text-white hover:bg-white/20 hover:text-amber-200'
                      : scrolled 
                        ? 'text-red-950 hover:bg-amber-50 hover:text-red-800' 
                        : 'text-white hover:bg-white/20 hover:text-amber-200'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
      </nav>
    </>
  );
}