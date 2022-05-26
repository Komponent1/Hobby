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
    ID: 1,
    name: 'test_category_1',
    user_email: 'seo2im6492@gmail.com',
  },
  {
    ID: 2,
    name: 'test_category_2',
    user_email: 'seo2im6492@gmail.com',
  },
  {
    ID: 3,
    name: 'test_category_3',
    user_email: 'seo2im6492@gmail.com',
  },
  {
    ID: 4,
    name: 'test_category_4',
    user_email: 'seo2im6492@gmail.com',
  },
  {
    ID: 5,
    name: 'test_category_5',
    user_email: 'seo2im6492@gmail.com',
  },
]
const nums = Array.from({ length: 50 }).map((_, i) => i);
export const articles = nums.map(e => ({
  ID: e,
  title: `test_article_${e}`,
  publish_date: `2022-01-${Math.floor(e / 30)}`,
  category_id: Math.floor(e / 10),
  path: `test_path_${e}`
}));

export const article = {
  ID: 0,
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
  ID: 6,
  name: 'new_category_6',
  user_email: 'seo2im6492@gmail.com'
}