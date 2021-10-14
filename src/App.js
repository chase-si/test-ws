import React, { useState, useEffect } from 'react'

import ChartA from './pages/ChartA'
import ChartB from './pages/ChartB'
import ChartC from './pages/ChartC'
import { handleXData } from './utils'

import './App.css';

const WS = new WebSocket('ws://localhost:8080', 'echo-protocol')

const Router = [{
    path: '/a',
    text: '原始11W个点',
    component: (props) => (<ChartA {...props} />)
}, {
    path: '/b',
    text: '10000个点',
    component: (props) => (<ChartB {...props} />)
}, {
    path: '/c',
    text: '1000个点',
    component: (props) => (<ChartC {...props} />)
}]

const App = () => {
    const [path, setPath] = useState(null)
    const [data, setData] = useState(null)
    
    useEffect(() => {
        WS.addEventListener('message', handleWSData)
        return () => {
            WS.removeEventListener('message', handleWSData)
        }
    }, [])

    const handleWSData = (msg) => {
        const data = msg.data.split(",")
        setData(data)
    }

    return (
        <div className="App">
            <ul>
                {Router.map(item => (
                    <li key={item.path} onClick={() => setPath(item.path)}>
                        {item.text}
                    </li>
                ))}
            </ul>
            <button onClick={() => {
                WS.send('begin')
            }}>
                begin
            </button>
            <button onClick={() => WS.send('stop')}>
                stop
            </button>
            <div>
                {Router.find(item => item.path === path)?.component({
                    data
                })}
            </div>        
        </div>
    );
}

export default App;
