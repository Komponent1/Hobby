export type Page = {
  title: string;
  path: string;
  description: string;
  children?: {
    path: string;
  };
};
export type PageConfig = {
  main: Page;
  default: {
    [key: string]: Page;
  }
  etc: {
    [key: string]: Page;
  }
};
