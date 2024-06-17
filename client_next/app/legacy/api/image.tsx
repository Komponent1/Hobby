import { CreateAxiosDefaults } from 'axios';
import HttpClient, { Interceptor } from './http';

class ImageAPI {
  private http;

  constructor(
    config?: CreateAxiosDefaults<any>,
    interceptor?: Interceptor,
    isServer?: boolean,
    dev?: boolean,
  ) {
    this.http = new HttpClient(config, interceptor, isServer, dev);
  }

  public async post(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const { url } = await this.http.post<{ url: string }>(
      'author/image',
      formData,
      { withCredentials: true },
    ).then((res) => res.data);
    return url;
  }

  public async getAll() {
    const { images } = await this.http.get<{ images: string[] }>(
      'api/images',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    ).then((res) => res.data);
    return images;
  }
}

export default ImageAPI;
