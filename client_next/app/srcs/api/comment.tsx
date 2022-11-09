import { CreateAxiosDefaults } from 'axios';
import { Comment } from 'Data';
import HttpClient, { Interceptor } from './http';

class CommentAPI {
  private http;

  constructor(
    config?: CreateAxiosDefaults<any>,
    interceptor?: Interceptor,
    dev?: boolean,
  ) {
    this.http = new HttpClient(config, interceptor, dev);
  }

  public async getAll(id: number) {
    const { comments } = await this.http.get<{ comments: Comment[] }>(
      `api/comment?article_id=${id}`,
    ).then((res) => res.data);
    comments.sort(
      (a, b) => (
        new Date(b.date).getTime()
        - new Date(a.date).getTime()
      ),
    );

    return comments;
  }

  public async post(data: { article_id: number, content: string }) {
    const code = await this.http.post(
      'author/comment',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((res) => res.status);
    return code;
  }

  public async patch(
    id: string,
    data: { article_id: number, content: string },
  ) {
    const code = await this.http.patch(
      `author/comment?comment_id=${id}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((res) => res.status);
    return code;
  }

  public async delete(id: string) {
    const code = await this.http.delete(
      `author/comment?comment_id=${id}`,
    ).then((res) => res.status);
    return code;
  }
}

export default CommentAPI;
