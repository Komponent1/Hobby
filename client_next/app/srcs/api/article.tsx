import { CreateAxiosDefaults } from 'axios';
import { Article, ArticleContent } from 'Data';
import HttpClient, { Interceptor } from './http';

const makeFormData = (data: { [key: string]: any }) => {
  const formData = new FormData();
  if (data.bannerSrc !== '') formData.append('banner', new Blob([data.bannerSrc], { type: 'text/plain' }));
  else formData.append('banner', data.banner);
  formData.append('md', new Blob([data.content], { type: 'text/plain' }));
  formData.append('article', new Blob([JSON.stringify({
    title: data.title, tag: data.tag.map((s: string) => ({ name: s, color: 'grey' })), content: data.content,
  })], { type: 'application/json' }));

  return formData;
};

class ArticleAPI {
  private http;

  constructor(config?: CreateAxiosDefaults<any>, interceptor?: Interceptor, dev?: boolean) {
    this.http = new HttpClient(config, interceptor, dev);
  }

  public async getAll() {
    const { articles } = await this.http.get<{ articles: Article[] }>(
      'api/articles',
    ).then((res) => res.data);
    articles.sort(
      (a, b) => (
        new Date(b.publish_date).getTime()
        - new Date(a.publish_date).getTime()
      ),
    );
    return articles;
  }

  public async get(id: number) {
    const { article, user, content } = await this.http.get<ArticleContent>(
      `api/article?article_id=${id}`,
    ).then((res) => res.data);
    return { article, user, content };
  }

  public async post(data: { [key: string]: any }) {
    const { id } = await this.http.post<{ id: number }>(
      'author/article',
      makeFormData(data),
      { withCredentials: true },
    ).then((res) => res.data);
    return id;
  }

  public async patch(articleId: number, data: { [key: string]: any }) {
    const { id } = await this.http.post<{ id: number }>(
      `author/article?article_id=${articleId}`,
      makeFormData(data),
      { withCredentials: true },
    ).then((res) => res.data);
    return id;
  }

  public async delete(articleId: number) {
    const code = await this.http.delete<{ id: number }>(
      `author/article?article_id=${articleId}`,
      { withCredentials: true },
    ).then((res) => res.status);
    return code;
  }
}

export default ArticleAPI;
