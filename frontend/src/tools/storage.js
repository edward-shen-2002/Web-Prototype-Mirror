import { setAxiosToken } from "tools/rest";

export const saveToken = (token) => {
  if(typeof Storage !== "undefined") localStorage.token = token;
};

export const deleteToken = () => {
  if(typeof Storage !== "undefined") delete localStorage.token;
};

export const isTokenSaved = () => typeof Storage !== "undefined" && typeof localStorage.token !== "undefined" && localStorage.token !== "";

export const findAndSaveToken = () => {
  if(isTokenSaved()) setAxiosToken(localStorage.token);
};