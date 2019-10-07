import axios from "axios";

export const publicAxios = axios.create({ baseURL: "http://localhost:3000/public" });
export const authAxios = axios.create({ baseURL: "http://localhost:3000/auth" });

export const setAxiosToken = (token) => axiosInstance.defaults.headers.common = { "Authorization": `Bearer ${token}` };

export const isAxiosTokenSet = () =>  typeof axiosInstance.defaults.headers.common.Authorization !== "undefined";

export const deleteAxiosToken = () => {
  if(isAxiosTokenSet()) delete axiosInstance.defaults.headers.common.Authorization;
};