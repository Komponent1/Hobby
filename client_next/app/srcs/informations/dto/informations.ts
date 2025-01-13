export type Information = {
  id: number;
  title: string;
  path: string;
  tags: string[];
};
export type InformationList = {
  information: Information;
  content: string;
};
