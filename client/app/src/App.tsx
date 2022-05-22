import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components';
import { Main, Signup, Login, Loading, Post, Article, Modal } from './pages';

function App() {
  const location = useLocation();
  let state = location.state as { backgroundLocation?: Location, dep?: any };

  return (
    <div>
      <Header />
      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<Main />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='post' element={<Post />} />
        <Route path='article' element={<Article />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path='loading' element={<Loading dep={state.dep}/>} />
          <Route path='modal/*' element={<Modal />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
