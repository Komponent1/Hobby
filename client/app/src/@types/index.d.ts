declare module 'Data' {
  export interface Token {
    email: string
    access_token: string
    token_type: string
    expires_in: number
    scope: string
  }
  export interface Article {
    id: number
    title: string
    publish_date : string
    update_date: string
    category_id: number
    user_email: string
    path: string
  }
  export interface Articles {
    count: number
    articles: Article[] 
  }
  export interface ArticleContent {
    id: number
    title: string
    category_id: number
    content: string
  }
  export interface Category {
    id: number
    name: string
    user_email: string
  }
}
declare module 'Api' {
  export type ApiFunc<P, T> = (param: P) => Prmoise<{code: number, data?: T}>
}