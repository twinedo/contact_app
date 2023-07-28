import axios, { AxiosResponse } from "axios";

interface configProps {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    params?: object;
    data?: any;
    headers?: any;
    cancelToken?: any;
    isAuth?: boolean;
}

const instance = axios;

export const useAxios = async (props: configProps) => {
    const {
      url,
      method,
      params,
      data,
      headers,
      cancelToken,
    } = props

  try {
      const response: AxiosResponse = await instance({
        url,
        method,
        params,
        data,
        cancelToken,
        headers,
      });

      return Promise.resolve(response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
          return Promise.reject(err);
      } else {
        throw new Error('different error than axios');
      }
    }
  };