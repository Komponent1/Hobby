declare module 'Data' {
  export interface Token {
    email: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
  }
  export interface Tag {
    id: number;
    name: string;
    color: 'grey'; // TODO
  }
  export interface Article {
    id: number;
    publish_date: string;
    update_date: string;
    src: string;
    path: string;
    title: string;
    user_id: string;
    next_id?: number;
    prev_id?: number;
    tag: Tag[];
  }
  export interface User {
    src: string;
  }
  export interface Comment {
    id: string;
    user_id: string;
    user_src: string;
    content: string;
    date: string;
  }
  export interface ArticleContent {
    id: number;
    title: string;
    category_id: number;
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
