import { usePage } from '@inertiajs/react';

export function useTranslations() {
  const { translations, locale } = usePage().props as any;

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations || {};

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    if (params) {
      return Object.keys(params).reduce((str, paramKey) => {
        return str.replace(`:${paramKey}`, String(params[paramKey]));
      }, value);
    }

    return value;
  };

  return { t, locale: locale || 'id' };
}

export function getCurrentLocale(): string {
  if (typeof window === 'undefined') return 'id';
  
  const path = window.location.pathname;
  const locale = path.split('/')[1];
  return ['id', 'en'].includes(locale) ? locale : 'id';
}

export function getLocalizedRoute(routeName: string, params?: any, locale?: string): string {
  const currentLocale = locale || getCurrentLocale();
  const normalizedParams = {
    ...(typeof params === 'object' && !Array.isArray(params) ? params : {}),
    locale: currentLocale,
  };

  return route(routeName, normalizedParams);
}
