import React from 'react'

import BoardWithInput from './pages/board'
import './App.css';
import Gift from './pages/gift'

const router = () => {
  const { pathname } = window.location
  if (pathname === '/gift') {
    return <Gift />
  }
  if (pathname === '/keyboard') {
    return <BoardWithInput />
  }
  return <div>homepage</div>
}

function App() {
  return (
    <div className="App">
      {router()}
    </div>
  );
}

export default App;
