import { ajax } from '../utils';

const login = async body => {
  const { data } = await ajax.post(`/users/authenticate`, body);
  return data;
};

const logout = async () => {
  const { data } = await ajax.post(`/logout`);
  document.cookie = `xsrfToken=;expires=${new Date().toGMTString()};`;
  return data;
};

export default { login, logout };
