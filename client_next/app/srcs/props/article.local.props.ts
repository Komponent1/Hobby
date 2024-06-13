import {date2string} from '../../lib';

export function getArticlePropsFromLocal() {
  const article = {
    id: 0,
    title: '',
    tag: [],
    src: '',
    user_id: '',
    update_date: '',
  };
  const content = '';
  const user = {
    id: 0,
    name: '',
    image: '',
  };
  const login = '';
  const date = date2string(article.update_date as string);

  return ({
    props: {
      article, content, user, login, date,
    },
  });
}
