import axios from 'axios';

const getCookies = () =>
  document.cookie.split(';').reduce((cookies, item) => {
    const [name, value] = item.split('=');
    cookies[name] = value;
    return cookies;
  }, {});

const baseURL = 'http://localhost:3000';

const ajax = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true
});

// Add a request interceptor
ajax.interceptors.request.use(function(config) {
  const xsrfToken = getCookies()['xsrfToken'];
  // CSRF Token.
  if (xsrfToken) config.headers['X-XSRF-TOKEN'] = xsrfToken;
  return config;
});

export default ajax;
