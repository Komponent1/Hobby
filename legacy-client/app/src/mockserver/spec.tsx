import login from './login';
import { getCategory, postCategory, patchCategory, deleteCategory } from './category';
import { getArticle, getArticles, postArticle, patchArticle, deleteArticle } from './article';
import { getUsers, postUser, refresh } from './user';

export function handlers() {
  return [
    getUsers,
    getCategory, postCategory, patchCategory, deleteCategory,
    getArticles,
    postUser,
    login,
    refresh,
    postArticle,
    getArticle,
    getArticles,
    patchArticle,
    deleteArticle
  ];
}
