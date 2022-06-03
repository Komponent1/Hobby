import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header } from './components';
import { Main, Signup, Login, Loading, Post, Article, Modal, Mypage } from './pages';
import { rootState } from './store';

type tDep = 'signup'|'auth'|'article'|'articles'|'category'|'postarticle'|'refresh'
function App() {
  const location = useLocation();
  let state = location.state as { backgroundLocation: Location, dep: tDep, url: string};

  return (
    <div>
      <Header />
      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<Main />} />
        <Route path='article' element={<Main />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='post' element={<Post />} />
        {/* <Route path='article' element={<Article />} /> */}
        <Route path='mypage' element={<Mypage />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path='loading' element={<Loading dep={state.dep} url={state.url}/>} />
          <Route path='modal/*' element={
            <Modal
              background={
                state.backgroundLocation.pathname + state.backgroundLocation.search
              }
            />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
