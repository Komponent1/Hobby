declare module 'Data' {
  export interface Tag {
    id: number;
    name: string;
    color: string;
  }
  export interface Article {
    id: number;
    publish_date: string;
    update_date?: string;
    src: string;
    path: string;
    title: string;
    user_id: string;
    next_id?: number;
    prev_id?: number;
    tag: Tag[];
  }
  export interface User {
    id?: string;
    src?: string;
    github?: string;
  }
  export interface Comment {
    id: string;
    user_id: string;
    user_src: string;
    content: string;
    date: string;
  }
  export interface ArticleContent {
    article: Article;
    user: User;
    content: string;
  }
  export interface Category {
    id: number;
    name: string;
    user_email: string;
  }
}
declare module 'Api' {
  export type ApiFunc<P, T> = (param: P) => Prmoise<{ code: number, data?: T }>;
}
