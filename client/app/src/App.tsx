import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const fetcher = () => {
    fetch('/api').then(res => {
      console.log(res)
    })
  };

  return (
    <div className="App">
      <button onClick={() => fetcher()}>Test</button>
    </div>
  );
}

export default App;
