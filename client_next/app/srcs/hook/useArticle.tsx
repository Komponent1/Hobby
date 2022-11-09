import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useAlert } from '@seolim/react-ui/alert';
import ArticleService from '../api/article';

export type GetArticle = (id: number) => Promise<void>;
export type GetArticles = () => Promise<void>;
export type PostArticle = (data: { [key: string]: any }) => Promise<void>;
export type PatchArticle = (articleId: number, data: { [key: string]: any }) => Promise<void>;
export type DeleteArticle = (articleId: number) => Promise<void>;

const useArticle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { alert } = useAlert('lb');
  const router = useRouter();
  const cookie = useMemo(() => new Cookies(), []);
  const service = useMemo(() => new ArticleService(
    undefined,
    undefined,
    process.env.NODE_ENV === 'development',
  ), []);

  const post: PostArticle = useCallback(async (data) => {
    setLoading(true);
    try {
      const id = await service.post(data, cookie.getAll({ doNotParse: true }));
      router.push(`/article/${id}`);
    } catch (error) {
      setLoading(false);
      alert('업로드 에러가 발생했습니다. 나중에 다시 시도해주세요', { scale: 'large' });
    }
  }, [service, router, alert, cookie]);

  const patch: PatchArticle = useCallback(async (articleId, data) => {
    setLoading(true);
    try {
      const id = await service.patch(articleId, data, cookie.getAll({ doNotParse: true }));
      router.push(`/article/${id}`);
    } catch (error) {
      setLoading(false);
      alert('업로드 에러가 발생했습니다. 나중에 다시 시도해주세요', { scale: 'large' });
    }
  }, [service, router, alert, cookie]);

  const del: DeleteArticle = useCallback(async (articleId) => {
    setLoading(true);
    try {
      await service.delete(articleId, cookie.getAll({ doNotParse: true }));
      router.push('/');
    } catch (error) {
      setLoading(false);
      alert('삭제에 실패했습니다. 나중에 다시 시도해주세요', { scale: 'large' });
    }
  }, [service, router, alert, cookie]);

  return {
    loading,
    post,
    patch,
    del,
  };
};

export default useArticle;
