import axios from 'axios';
import route from 'ziggy-js';

(window as any).axios = axios;

const detectLocale = () => {
  if (typeof window === 'undefined') {
    return 'id';
  }

  const pathLocale = window.location.pathname.split('/')[1];
  if (['id', 'en'].includes(pathLocale)) {
    return pathLocale;
  }

  const htmlLang = document.documentElement.getAttribute('lang');
  if (htmlLang && ['id', 'en'].includes(htmlLang)) {
    return htmlLang as string;
  }

  return 'id';
};

// Routes that should NOT have locale parameter
const nonLocalizedRoutes = ['logout'];

const originalRoute = route;

(window as any).route = (name: any, params?: any, absolute?: any, config?: any) => {
  let processedParams = params;

  if (processedParams === undefined || processedParams === null) {
    processedParams = {};
  }

  // Skip adding locale for routes that don't need it
  if (!nonLocalizedRoutes.includes(name)) {
    if (typeof processedParams === 'object' && !Array.isArray(processedParams)) {
      processedParams = {
        ...processedParams,
        locale: processedParams.locale || detectLocale(),
      };
    }
  }

  return (originalRoute as any)(name, processedParams, absolute, config);
};

(window as any).axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
