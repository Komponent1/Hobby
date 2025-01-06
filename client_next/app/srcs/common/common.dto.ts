export type PageConfig = {
  [key: string]: {
    title: string;
    path: string;
    children?: {path: string};
    description: string;
  }
};
