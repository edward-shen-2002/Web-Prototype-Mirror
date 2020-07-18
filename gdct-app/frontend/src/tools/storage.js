import { setAxiosToken } from './rest';

export const saveToken = token => {
  if (Storage !== undefined) localStorage.token = token;
};

export const deleteToken = () => {
  if (Storage !== undefined) delete localStorage.token;
};

export const isTokenSaved = () =>
  Storage !== undefined && localStorage.token !== undefined && localStorage.token !== '';

export const findAndSaveToken = () => {
  if (isTokenSaved()) setAxiosToken(localStorage.token);
};
