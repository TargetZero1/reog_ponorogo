import { Globe } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';
import { getCurrentLocale } from '../utils/translations';

interface LanguageSwitcherProps {
  variant?: 'dark' | 'light';
}

export function LanguageSwitcher({ variant = 'dark' }: LanguageSwitcherProps) {
  const { locale } = usePage().props as any;
  const currentLocale = locale || getCurrentLocale();
  const isLight = variant === 'light';
  
  const switchLanguage = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(id|en)/, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    router.visit(newPath, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const containerClasses = isLight
    ? 'flex items-center gap-1 bg-white border border-red-200 rounded-lg p-1 shadow-sm'
    : 'flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20';

  const activeClasses = isLight
    ? 'bg-red-600 text-white shadow-sm'
    : 'bg-white text-red-950 shadow-sm';

  const inactiveClasses = isLight
    ? 'text-red-700 hover:bg-red-50'
    : 'text-white hover:bg-white/10';

  const iconColor = isLight ? 'text-red-700' : 'text-white';

  return (
    <div className="flex items-center gap-2">
      <Globe size={18} className={iconColor} />
      <div className={containerClasses}>
        <button
          onClick={() => switchLanguage('id')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            currentLocale === 'id' ? activeClasses : inactiveClasses
          }`}
          aria-label="Switch to Indonesian"
        >
          ID
        </button>
        <button
          onClick={() => switchLanguage('en')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            currentLocale === 'en' ? activeClasses : inactiveClasses
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>
    </div>
  );
}

