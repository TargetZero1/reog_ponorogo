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
  
  // Normalize params - ensure it's an object
  let normalizedParams: any = {};
  
  if (params !== undefined && params !== null) {
    if (typeof params === 'object' && !Array.isArray(params)) {
      normalizedParams = { ...params };
    } else if (typeof params === 'number' || typeof params === 'string') {
      // If a single value is passed, try to infer the parameter name from route
      // This is a fallback for routes that might accept a single ID
      normalizedParams = { id: params };
    }
  }
  
  // Always add locale
  normalizedParams.locale = currentLocale;
  
  // Fallback: construct URL manually for admin routes to ensure they work
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const localePath = `/${currentLocale}`;
  
  // Extract ID from params (could be 'event', 'place', or 'id')
  const getId = (params: any): number | string | null => {
    if (params.event) return params.event;
    if (params.place) return params.place;
    if (params.id) return params.id;
    return null;
  };
  
  const resourceId = getId(normalizedParams);
  
  // Manual URL construction for admin routes to ensure they work
  // ALWAYS use manual construction for admin routes to avoid Ziggy issues
  if (routeName.startsWith('admin.events.')) {
    if (routeName === 'admin.events.show' && resourceId) {
      const url = `${baseUrl}${localePath}/admin/events/${resourceId}`;
      console.log('[Route] admin.events.show:', url, { params: normalizedParams, resourceId });
      return url;
    }
    if (routeName === 'admin.events.edit' && resourceId) {
      const url = `${baseUrl}${localePath}/admin/events/${resourceId}/edit`;
      console.log('[Route] admin.events.edit:', url, { params: normalizedParams, resourceId });
      return url;
    }
    if (routeName === 'admin.events.destroy' && resourceId) {
      const url = `${baseUrl}${localePath}/admin/events/${resourceId}`;
      console.log('[Route] admin.events.destroy:', url, { params: normalizedParams, resourceId });
      return url;
    }
    if (routeName === 'admin.events.update' && resourceId) {
      const url = `${baseUrl}${localePath}/admin/events/${resourceId}`;
      console.log('[Route] admin.events.update:', url, { params: normalizedParams, resourceId });
      return url;
    }
    if (routeName === 'admin.events.toggle-publish' && normalizedParams.id) {
      const url = `${baseUrl}${localePath}/admin/events/${normalizedParams.id}/toggle-publish`;
      console.log('[Route] admin.events.toggle-publish:', url, { params: normalizedParams });
      return url;
    }
    if (routeName === 'admin.events.report' && normalizedParams.id) {
      const url = `${baseUrl}${localePath}/admin/events/${normalizedParams.id}/report`;
      console.log('[Route] admin.events.report:', url, { params: normalizedParams });
      return url;
    }
  }
  
  if (routeName.startsWith('admin.places.')) {
    if (routeName === 'admin.places.show' && resourceId) {
      const url = `${baseUrl}${localePath}/admin/places/${resourceId}`;
      console.log('[Route] admin.places.show:', url, { params: normalizedParams, resourceId });
      return url;
    }
    if (routeName === 'admin.places.edit' && resourceId) {
      const url = `${baseUrl}${localePath}/admin/places/${resourceId}/edit`;
      console.log('[Route] admin.places.edit:', url, { params: normalizedParams, resourceId });
      return url;
    }
    if (routeName === 'admin.places.destroy' && resourceId) {
      const url = `${baseUrl}${localePath}/admin/places/${resourceId}`;
      console.log('[Route] admin.places.destroy:', url, { params: normalizedParams, resourceId });
      return url;
    }
    if (routeName === 'admin.places.update' && resourceId) {
      const url = `${baseUrl}${localePath}/admin/places/${resourceId}`;
      console.log('[Route] admin.places.update:', url, { params: normalizedParams, resourceId });
      return url;
    }
    if (routeName === 'admin.places.toggle-publish' && normalizedParams.id) {
      const url = `${baseUrl}${localePath}/admin/places/${normalizedParams.id}/toggle-publish`;
      console.log('[Route] admin.places.toggle-publish:', url, { params: normalizedParams });
      return url;
    }
  }
  
  // Manual URL construction for admin orders routes
  if (routeName.startsWith('admin.orders.')) {
    if (routeName === 'admin.orders.index' || routeName === 'admin.orders') {
      return `${baseUrl}${localePath}/admin/orders`;
    }
    if (routeName === 'admin.orders.show' && normalizedParams.id) {
      const url = `${baseUrl}${localePath}/admin/orders/${normalizedParams.id}`;
      console.log('[Route] admin.orders.show:', url, { params: normalizedParams });
      return url;
    }
    if (routeName === 'admin.orders.update_status' && normalizedParams.id) {
      const url = `${baseUrl}${localePath}/admin/orders/${normalizedParams.id}/status`;
      console.log('[Route] admin.orders.update_status:', url, { params: normalizedParams });
      return url;
    }
    if (routeName === 'admin.orders.export') {
      return `${baseUrl}${localePath}/admin/orders/export`;
    }
  }
  
  // Try Ziggy route helper for other routes
  try {
    return route(routeName, normalizedParams);
  } catch (error) {
    console.error('Route generation error:', {
      routeName,
      params: normalizedParams,
      error
    });
    // Generic fallback
    return `${baseUrl}${localePath}`;
  }
}
