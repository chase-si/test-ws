import React, { useState } from 'react'

import Inputs from '../Inputs'
import { CardContainer } from './style'
import swap from '../../imgs/swap.png'

const Card = props => {
    const { title, content, password, result } = props
    const [isFront, setIsFront] = useState(true)
    const [pwdInput, setPwdInput] = useState('')

    const handleClick = () => {
        setIsFront(!isFront)
    }

    const handleInput = (e) => {
        setPwdInput(e)
    }

    return (
        <CardContainer>            
            {!isFront ? ( 
                <div className="card front">
                    <div className="img" onClick={handleClick}>
                        <img src={swap} alt="swap icon" />
                    </div>
                    <div className="title">
                        {title}
                    </div>
                </div>
            ) : (
                <div className="card back">
                    <div className="img" onClick={handleClick}>
                        <img src={swap} alt="swap icon" />
                    </div>
                    <div className="input">
                        <Inputs
                            length={password.length} 
                            val={pwdInput}
                            onChange={handleInput}
                        />
                    </div>
                    <div className={`res ${pwdInput === password && 'show'}`}>
                        {`秘钥: ${result}`}
                    </div>
                </div>
            )}
        </CardContainer>
    )
}

export default Card