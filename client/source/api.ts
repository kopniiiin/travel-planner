import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import {BASE_URL} from './const';

const api: AxiosInstance = axios.create({baseURL: BASE_URL});

const onFulfilled = (response: AxiosResponse): AxiosResponse => response;

const onRejected = (error: AxiosError): void => {
  throw error;
};

api.interceptors.response.use(onFulfilled, onRejected);

export default api;
