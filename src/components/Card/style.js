import styled from 'styled-components'

import { COLORS } from '../../style'

export const CardContainer = styled.div`
    width: 200px;
    height: 300px;
    transition: all 0.5s ease-in;
    perspective: 1000px;

    .card {
        perspective: 1000px;
        width: 100%;
        height: 100%;
        border: 1px solid ${COLORS[7]};
        border-radius: 6px;
        box-shadow: 2px 2px 13px ${COLORS[6]};
        transform-style: preserve-3d;
        transition: all 0.3s ease-in;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .img {
            position: absolute;
            width: 50px;
            height: 50px;
            right: 10px;
            top: 10px;
            cursor: pointer;
            background: ${COLORS[6]};
            border-radius: 50%;
            z-index: 99;
            img {
                width: 100%;
                height: 100%;
            }
        }

        &.front {
            transform: rotateY(180deg);
            .img {
                left: 10px;
            }
        }
    }

    .title {
        font-size: 28px;
        transform: rotateY(180deg);
        color: ${COLORS[2]};
    }

    .res {
        margin-top: 32px;
        opacity: 0;
        transition: all .5s;
        color: ${COLORS[0]};

        &.show {
            opacity: 1;
        }
    }

    &:hover {
        transform: translateY(-5px);
    }
`