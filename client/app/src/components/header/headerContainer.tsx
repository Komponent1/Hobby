import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { rootState } from '../../store';
import { Cookies } from 'react-cookie';
import { refresh } from '../../store/auth';
import HeaderPresenter from './headerPresenter';
import { EMAIL } from '../../env';

const HeaderContainer: React.FC = () => {
  const { data } = useSelector((state: rootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {    
    const refresh_token = new Cookies().get('blog_refresh_token');
    if (!data && refresh_token) dispatch(refresh());
  }, [ dispatch, data ]);

  const label = data?.access_token ? 'logout' : 'login';
  const click = (url: string) => () => navigate(url);

  return (
    <HeaderPresenter
      logoClick={click('/')}
      postClick={click('/post')}
      mypageClick={click('/mypage')}
      label={label}
      owner={data && data.email === EMAIL} />
  )
};

export default HeaderContainer;
