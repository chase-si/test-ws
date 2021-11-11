import styled from 'styled-components'

import { COLORS } from '../../style'

export const CardContainer = styled.div`
    width: 200px;
    height: 300px;
    transition: all 0.5s ease-in;

    .front {
        width: 100%;
        height: 100%;
        border: 1px solid ${COLORS[7]};
        border-radius: 6px;
        box-shadow: 2px 2px 13px ${COLORS[6]};
        transform-style: preserve-3d;
        transition: all 0.3s ease-in;
        transform: rotateY(180deg);
    }

    .back {
        width: 100%;
        height: 100%;
        border: 1px solid ${COLORS[7]};
        border-radius: 6px;
        box-shadow: 2px 2px 13px ${COLORS[6]};
        transform-style: preserve-3d;
        transition: all 0.3s ease-in;
    }

    .res {
        opacity: 0;
        transition: all .5s;

        &.show {
            opacity: 1;
        }
    }

    &:hover {
        transform: translateY(-5px);
    }
`