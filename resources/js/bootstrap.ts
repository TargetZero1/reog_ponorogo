import axios from 'axios';
import route from 'ziggy-js';

(window as any).axios = axios;
(window as any).route = route;

(window as any).axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
