import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProfileDropdown } from './ProfileDropdown';
import { usePage } from '@inertiajs/react';

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

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Determine if current page has white background (needs maroon navbar)
  const isWhiteBackgroundPage = currentPath !== '/' && 
    currentPath !== '/index.php' && 
    !currentPath.includes('#') &&
    currentPath !== route('home').replace(window.location.origin, '');

  // ✅ FIXED: Using named routes with the route() helper
  const navLinks = [
    // 1. Home (Use named route)
    { id: 'beranda', label: 'Beranda', href: route('home'), isPage: false },
    
    // 2. Anchors (Append the hash to the named route)
    { id: 'reog', label: 'Reog Ponorogo', href: `${route('home')}#reog`, isPage: false },
    { id: 'jenis-reog', label: 'Jenis Reog', href: `${route('home')}#jenis-reog`, isPage: false },
    
    // 3. Pages (Use named routes)
    { id: 'budaya', label: 'Budaya dan Sejarah', href: route('budaya'), isPage: true },
    { id: 'wisata', label: 'Tempat Wisata', href: route('places.index'), isPage: true },
    { id: 'events', label: 'Events', href: route('events.index'), isPage: true },
  ];

  // ✅ FIXED: Admin link now uses the named route too (pointing to admin.events.index)
  const adminLinks = [
    { id: 'events', label: 'Events', href: route('admin.events.index'), isPage: true },
  ];

  const scrollToSection = (id: string, href: string, isPage: boolean) => {
    setMobileMenuOpen(false);
    
    if (isPage) {
      // This forces the browser to go to the correct full URL (including /public)
      window.location.href = href;
    } else {
      // Logic for scrolling on the homepage
      // We check if we are on the homepage path (e.g., /reogheritage/public/)
      const homePath = new URL(route('home')).pathname;
      
      if (currentPath === homePath || currentPath === '/' || currentPath === '/index.php') {
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
          scrolled 
            ? 'backdrop-blur-md bg-white/80 shadow-lg border-b border-white/20' 
            : 'backdrop-blur-sm bg-black/20'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
            <a href={route('home')} aria-label="Reog Ponorogo home" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-red-950">🦚</span>
              </div>
              <span className={`tracking-wide font-semibold drop-shadow-lg ${
                scrolled 
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
                    ? 'bg-amber-500 text-red-950 shadow-lg'
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
                <span className="ml-4 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold uppercase tracking-wider">Admin</span>
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
            <ProfileDropdown scrolled={scrolled} isWhiteBackgroundPage={false} />
          </div>

          <div className="md:hidden flex items-center">
            <ProfileDropdown scrolled={scrolled} isMobile={true} isWhiteBackgroundPage={false} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className={`p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 drop-shadow-lg ${
                scrolled 
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
          scrolled 
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