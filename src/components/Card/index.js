import React, { useState } from 'react'

import { CardContainer } from './style'

const Card = props => {
    const [isFront, setIsFront] = useState(true)
    const [resShow, setRes] = useState(false)

    const handleClick = () => {
        setIsFront(!isFront)
    }

    return (
        <CardContainer
            // onClick={handleClick}
        >
            {!isFront ? ( 
                <div className="front text">
                    正面
                </div>
            ) : (
                <div className="back" onClick={() => setRes(true)}>
                    反面

                    <div className={`res ${resShow && 'show'}`}>
                        密码
                    </div>
                </div>
            )}
        </CardContainer>
    )
}

export default Card