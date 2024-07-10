declare module 'Data' {
  export interface Tag {
    id: number;
    name: string;
    color: string;
  }
  export interface Article {
    id: number;
    title: string;
    path: string;
  }
  export interface Information {
    id: number;
    title: string;
    path: string;
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
