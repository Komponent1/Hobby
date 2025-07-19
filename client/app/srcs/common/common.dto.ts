export type Page = {
  title: string;
  path: string;
  description: string;
  children?: {
    path: string;
  };
};
export type PageConfig = {
  order: string[];
  page: {
    [key: string]: Page;
  };
};
