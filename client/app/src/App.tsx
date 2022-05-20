import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Main, Signup, Login, Loading, Post } from './pages';

function App() {
  const location = useLocation();
  let state = location.state as { backgroundLocation?: Location, dep?: any };

  return (
    <div>
      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<Main />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='post' element={<Post />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path='loading' element={<Loading dep={state.dep}/>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
