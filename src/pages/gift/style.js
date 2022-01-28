import styled from 'styled-components'

import { COLORS } from '../../style'

export const StyleContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: ${COLORS[9]};
    color: ${COLORS[0]};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    .cards {
        display: flex;
        justify-content: space-around;
    }

    .pwd {
        
    }
`