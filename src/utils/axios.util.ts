import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type AxiosConfig = AxiosRequestConfig & {
  metadata: { startTime: Date };
};

type ModifiedAxiosResponse = AxiosResponse & { duration: number };

axios.interceptors.request.use(
  function (config) {
    (config as AxiosConfig).metadata = { startTime: new Date() };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    const { metadata } = response.config as AxiosConfig;

    (response as ModifiedAxiosResponse).duration =
      new Date().getTime() - metadata.startTime.getTime();

    return response;
  },
  function (error) {
    error.duration =
      new Date().getTime() - error.config.metadata.startTime.getTime();

    return Promise.reject(error);
  }
);

export { axios };
