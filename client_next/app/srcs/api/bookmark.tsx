import { CreateAxiosDefaults } from 'axios';
import HttpClient, { Interceptor } from './http';

class BookmarkAPI {
  private http;

  constructor(
    config?: CreateAxiosDefaults<any>,
    interceptor?: Interceptor,
    dev?: boolean,
  ) {
    this.http = new HttpClient(config, interceptor, dev);
  }

  public async get(href: string) {
    const ogTable = await this.http.get(
      `api/bookmark?url=${href}`,
    ).then((res) => res.data)
      .then(({ result }) => ({
        title: result.ogTitle,
        url: result.ogUrl,
        description: result.ogDescription,
        img: result.ogImage.url,
      }));
    return ogTable;
  }
}

export default BookmarkAPI;
