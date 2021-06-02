import React, { useState, useCallback } from 'react'
import './App.css';


const App = () => {
  let test = useCallback(() => 1, {})
  const [state, setState] = useState(0)

  const handleClickBegin = () => {
    console.log('test', test)
    console.log('state', state)
    test = test + 1
  }

  console.log('render')

  return (
    <div className="App">
      <button onClick={handleClickBegin}>begin</button>
    </div>
  );
}

export default App;
