import axios, { AxiosResponse, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';

export type Interceptor = {
  response?: ResponseIntercepter;
  responseErr?: InterceptorErr;
  request?: RequestIntercepter;
  requestErr?: InterceptorErr;
};
type ResponseIntercepter = (
  (value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>
) | undefined;
type RequestIntercepter = (
  (value: AxiosRequestConfig<any>) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>
) | undefined;
type InterceptorErr = ((error: any) => any) | undefined;
class HttpClient {
  private http;

  constructor(
    config?: CreateAxiosDefaults<any>,
    interceptor?: Interceptor,
    dev?: boolean,
  ) {
    this.http = axios.create({
      baseURL: !dev ? process.env.NEXT_PUBLIC_BASEURL as string : 'http://localhost:4000/',
      timeout: 2000,
      ...config,
    });
    if (interceptor) {
      this.http.interceptors.request.use(
        interceptor.request,
        interceptor.requestErr,
      );
      this.http.interceptors.response.use(
        interceptor.response,
        interceptor.responseErr,
      );
    }
  }

  async get<T = any>(api: string, args?: AxiosRequestConfig<any>) {
    const response = await this.http.get<T>(api, args);
    return response;
  }

  async post<T = any>(api: string, data: {}, args?: AxiosRequestConfig<any>) {
    const response = await this.http.post<T>(api, data, args);
    console.log(response);
    return response;
  }

  async patch<T = any>(api: string, data: {}, args?: AxiosRequestConfig<any>) {
    const response = await this.http.patch<T>(api, data, args);
    return response;
  }

  async delete<T = any>(api: string, args?: AxiosRequestConfig<any>) {
    const response = await this.http.delete<T>(api, args);
    return response;
  }
}

export default HttpClient;
