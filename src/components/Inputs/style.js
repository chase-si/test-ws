import styled from 'styled-components'
import { COLORS } from '../../style'

export const InputsContainer = styled.div`
    position: relative;
    width: ${props => props.length * 19 - 3 }px;
    .control {
        position: absolute;
        opacity: 0;
        width: 100%;
        input {
            width: 100%;
            background: transparent;
        }
        z-index: 0;
    }   
    .apperance {
        display: flex;
        z-index: 1;
    }
`

export const InputContainer = styled.div`
    width: 16px;
    margin-right: 3px;
    border-bottom: 2px solid ${COLORS[0]};
    border-color: ${props => props.focus ? COLORS[5] : COLORS[0]};

    input {
        border: none;
        outline: none;
        background: transparent;
        color: ${COLORS[0]};
        width: 100%;
        text-align: center;
        padding: 0;

        &:focus {
            border: none;
        }
    }
`