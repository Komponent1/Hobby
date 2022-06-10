export const users = [
  {
    ID: 1,
    email: 'seo2im6492@gmail.com',
    password: '1234',
    salt: 'salt1'
  },
  {
    ID: 2,
    email: 'yeonghwa17@naver.com',
    password: '12345',
    salt: 'salt2'
  }
];

export const category = [
  {
    id: 1,
    name: 'test_category_1',
    user_email: 'seo2im6492@gmail.com',
  },
  {
    id: 2,
    name: 'test_category_2',
    user_email: 'seo2im6492@gmail.com',
  },
  {
    id: 3,
    name: 'test_category_3',
    user_email: 'seo2im6492@gmail.com',
  },
  {
    id: 4,
    name: 'test_category_4',
    user_email: 'seo2im6492@gmail.com',
  },
  {
    id: 5,
    name: 'test_category_5',
    user_email: 'seo2im6492@gmail.com',
  },
]
const nums = Array.from({ length: 50 }).map((_, i) => i);
export const articles = nums.map(e => ({
  id: e,
  title: `test_article_${e}`,
  publish_date: (new Date()).toString(),
  category_id: Math.floor(e / 10),
  path: `test_path_${e}`
}));

export const article = {
  id: 0,
  title: 'test_article',
  content: `
  # Title 
  ## Header 
  ### Sub Title 
  **bold** 
  *italic* 
  `
}
export const newCatetgory = {
  id: 6,
  name: 'new_category_6',
  user_email: 'seo2im6492@gmail.com'
}
export const token = {
  email: 'seo2im6492@gmail.com',
  access_token: '124',
  token_type: 'Bearer',
  expires_in: 1800,
  scope: 'create'
}