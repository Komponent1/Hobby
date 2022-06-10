import { expectSaga } from 'redux-saga-test-plan';
import confingureStore from 'redux-mock-store';
import { setupServer } from 'msw/node';
import { handlers } from '../mockserver/spec';

import authReducer, { login, authSaga, refresh, logout, initialState } from '../store/auth';
import categoryReducer,
{
  categorySaga, getCategory, postCategory, patchCategory, deleteCategory
} from '../store/category';
import articlesReducer, { getArticles, getArticlesSaga } from '../store/articles';
import articeReducer,
{
  articleSaga, getArticle, postArticle, patchArticle, deleteArticle
} from '../store/article';
import * as data from '../mockserver/data';

const server = setupServer(...handlers());

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const sagaTest = (saga: any, reducer: any, action: any, finalState: any) => (
  expectSaga(saga)
    .withReducer(reducer)
    .dispatch(action)
    .hasFinalState(finalState)
    .silentRun()
);

describe('store TEST', () => {
  describe('auth reducer', () => {
    describe('login action', () => {
      let email = 'email';
      let password = 'password'

      test('login Success return OAuth data', () => {
        return sagaTest(authSaga, authReducer, login(email, password), {
          loading: false,
          data: data.token,
          error: null
        });
      });
      test('login db no user return 412', () => {
        email = 'nouser';
  
        return sagaTest(authSaga, authReducer, login(email, password), {
          loading: false,
          data: null,
          error: 412
        });
      });
      test('no match password return 401', () => {
        email = 'nopassword';
  
        return sagaTest(authSaga, authReducer, login(email, password), {
          loading: false,
          data: null,
          error: 401
        });
      });
    });

    describe('refresh', () => {
      test('refresh Success return OAuth data', () => {
        return sagaTest(authSaga, authReducer, refresh(), {
          loading: false,
          data: data.token,
          error: null
        });
      });
    });

    
    test('logout', () => {
      const mockStore = confingureStore()({});
      mockStore.dispatch(logout());

      const state = authReducer(initialState, mockStore.getActions()[0]);
      expect(state).toHaveProperty('loading', false);
      expect(state).toHaveProperty('error', null);
      expect(state).toHaveProperty('data', {});
    });
  });

  describe('category reducer', () => {
    let email = 'category'

    describe('get action', () => {
      test('success return category data list', () => {
        return sagaTest(
          categorySaga,
          categoryReducer,
          getCategory(email),
          {
            loading: false,
            data: { categories: data.category },
            error: null
          }
        );
      });
      test('fail no token return 500', () => {
        email = 'error';
        
        return sagaTest(
          categorySaga,
          categoryReducer,
          getCategory(email),
          {
            loading: false,
            data: null,
            error: 500
          }
        );
      });
    });
    describe('post action', () => {
      test('success return category data', () => {
        return sagaTest(
          categorySaga,
          categoryReducer,
          postCategory('token', email, '1'),
          {
            loading: false,
            data: {
              categories: [data.newCatetgory]
            },
            error: null
          }
        )
      });
      test('fail return category name 412', () => {
        email = 'already category_name'

        return sagaTest(
          categorySaga,
          categoryReducer,
          postCategory('token', email, '1'),
          {
            loading: false,
            data: null,
            error: 412
          }
        )
      })
    });
    describe('patch action', () => {
      test('success return category data', () => {
        email = 'email';

        return expectSaga(categorySaga)
          .withReducer(categoryReducer)
          .dispatch(getCategory(email))
          .dispatch(patchCategory('token', email, '1', 'name'))
          .hasFinalState({
            loading: false,
            data: { categories: data.category.map(e => e.id === 1 ? ({
              ...e, name: 'name'
            }) : e) },
            error: null
          })
          .silentRun();
      });

      test('fail return category_name 412', () => {
        email = 'already category_name'

        return sagaTest(
          categorySaga,
          categoryReducer,
          patchCategory('token', email, '1', 'name'),
          {
            loading: false,
            data: null,
            error: 412
          }
        )
      })
    });

    /*
      현재 정상 동작하지 않음, 기존에 데이터가 있을 경우에만 삭제 가능
      즉, dispatch(getCategory())가 성공한 후 동작해야 하는데
      현재 로그 상 그 순서가 엎지락 뒤차락. 중간에 wait를 주는법을 알아야한다.
    */
    // describe('delete action', () => {
    //   test('success change data delete', () => {
    //     let email = 'email'

    //     return expectSaga(categorySaga)
    //       .withReducer(categoryReducer)
    //       .dispatch(getCategory(email))
    //       .hasFinalState({
    //         loading: false,
    //         data: { categories: data.category },
    //         error: null
    //       })
    //       .dispatch(deleteCategory('token', email, '1'))
    //       .hasFinalState({
    //         loading: false,
    //         data: { categories: data.category.filter(e => e.id !== 1) },
    //         error: null
    //       })
    //       .run();
    //   });
    //   test('fail category have article 412', () => {
    //     let email = 'cat have article'

    //     return sagaTest(
    //       categorySaga,
    //       categoryReducer,
    //       deleteCategory('token', email, '1'),
    //       {
    //         loading: false,
    //         data: null,
    //         error: 412
    //       }
    //     )
    //   });
    // });
  })

  describe('articles reducer', () => {
    let email = 'articles'

    describe('get action', () => {
      test('success return articles list', () => {
        return sagaTest(
          getArticlesSaga,
          articlesReducer,
          getArticles(email, 0, 6),
          {
            loading: false,
            data: { articles: data.articles.slice(0, 6), count: data.articles.length },
            error: null
          }
        );
      });
      test('fail some error return 500', () => {
        email = 'error';
        
        return sagaTest(
          getArticlesSaga,
          articlesReducer,
          getArticles(email, 0, 6),
          {
            loading: false,
            data: null,
            error: 500
          }
        );
      });
    });
  });

  describe('article reducer', () => {
    let email = 'email';
    
    describe('get action', () => {
      test('success return article information', () => {
        return sagaTest(
          articleSaga,
          articeReducer,
          getArticle('0'),
          {
            loading: false,
            data: { article: data.article },
            error: null
          }
        )
      });
      test('fail return 500 in server error', () => {
        return sagaTest(
          articleSaga,
          articeReducer,
          getArticle('error'),
          {
            loading: false,
            data: null,
            error: 500
          }
        )
      });
    });
    describe('post action', () => {
      

      test('success return article information', () => {
        return sagaTest(
          articleSaga,
          articeReducer,
          postArticle('token', email, 0, new FormData()),
          {
            loading: false,
            data: { article: data.article },
            error: null
          }
        )
      });

      test('fail return 401 no token', () => {
        email = 'no token'

        return sagaTest(
          articleSaga,
          articeReducer,
          postArticle('token', email, 0, new FormData()),
          {
            loading: false,
            data: null,
            error: 401
          }
        )
      });
    });
    describe('patch action', () => {
      test('success return article information', () => {
        email = 'user'

        return sagaTest(
          articleSaga,
          articeReducer,
          patchArticle('1', 0, 'token', email, new FormData()),
          {
            loading: false,
            data: { article: data.article },
            error: null
          }
        )
      });

      test('fail return 401 no token', () => {
        email = 'no token'

        return sagaTest(
          articleSaga,
          articeReducer,
          patchArticle('1', 0, 'token', email, new FormData()),
          {
            loading: false,
            data: null,
            error: 401
          }
        )
      });
    });
    describe('delete action', () => {
      test('success return article any', () => {
        email = 'user'

        return sagaTest(
          articleSaga,
          articeReducer,
          deleteArticle('1', 'token', email),
          {
            loading: false,
            data: null,
            error: null
          }
        )
      });

      test('fail return 401 no token', () => {
        email = 'no token'

        return sagaTest(
          articleSaga,
          articeReducer,
          deleteArticle('1', 'token', email),
          {
            loading: false,
            data: null,
            error: 401
          }
        )
      });
    })
  });
});
