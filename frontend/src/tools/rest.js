import axios from "axios";

export const publicAxios = axios.create({ baseURL: "http://localhost:3000/public" });

export const authAxios = axios.create({ baseURL: "http://localhost:3000/jwt" });

export const setAxiosToken = (token) => authAxios.defaults.headers.common = { ...authAxios.defaults.headers.common, Authorization: `Bearer ${token}` };

export const isAxiosTokenSet = () =>  typeof authAxios.defaults.headers.common.Authorization !== "undefined";

export const deleteAxiosToken = () => {
  if(isAxiosTokenSet()) delete authAxios.defaults.headers.common.Authorization;
};