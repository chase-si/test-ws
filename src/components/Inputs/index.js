import React, { useState }  from "react";
import { InputsContainer, InputContainer } from './style';


const Input = ({
    focus = false,
    value
}) => {
    return (
        <InputContainer focus={focus}>
            <input maxLength={1} value={value} autoFocus={focus} readOnly/>
        </InputContainer>
    )
}

const Inputs = ({
    length = 1,
    val = '',
    onChange = () => {}
}) => {
    const [focus, setFocus] = useState(false)

    const getSplitValue = value => {
        return new Array(length).fill('').map((item, index) => (
            value[index] ? value[index] : item
        ))
    }

    const judgeFocus = (idx) => {
        if (!focus) {
            return false
        }

        if (val.length === length) {
            // 输入完整了
            return (idx === val.length - 1) 
        }

        return idx === val.length
    }

    return (
        <InputsContainer length={length}>
            <div className="control">
                <input 
                    value={val}
                    maxLength={length}
                    onChange={e => onChange(e.target.value)}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
            </div>

            <div className="apperance">
                {getSplitValue(val).map((item, index) => (
                    <Input
                        key={index}
                        value={item}
                        focus={judgeFocus(index)}
                    />
                ))}
            </div>


        </InputsContainer>
    )
}

export default Inputs