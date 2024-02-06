import axios from "axios";
import {useAppStore} from "@/store/app";

const pipe = (request) => {
  if (request.method.toUpperCase() === 'POST') {
    request.headers['X-CSRF-Token'] = useAppStore().getCSRF
  }
  if (request.url.includes('auth')) {
    request.headers['Authorization'] = `Bearer ${useAppStore().getUser.access_token}`
  }
  return request;
}

export default {
  install: (app) => {
    const _axios = axios.create({
      baseURL: import.meta.env.VITE_API_MODULE_URL
    })
    _axios.interceptors.request.use((request) => {
      return pipe(request);
    }, () => {})
    app.provide("axios", _axios);
  },
};
