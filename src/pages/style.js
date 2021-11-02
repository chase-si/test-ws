import styled from 'styled-components'

import { COLORS } from '../style'

export const StyleContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: ${COLORS[9]};
    color: ${COLORS[0]};
`

export const Card = styled.div`
    color: red;
    width: 200px;
    height: 300px;
    border: 1px solid ${COLORS[7]};
    border-radius: 6px;
    box-shadow: 2px 2px 13px ${COLORS[6]};

    &:hover {
        transform: translateY(-5px);
    }
`