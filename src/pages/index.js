import React  from "react"

import Card from "../components/Card"
import { StyleContainer } from './style'

const DATAS = [{
    title: '酒柜',
    content: '最贵的酒的生日',
    password: '0713',
    result: 'gif'
}, {
    title: '书柜',
    content: 'X?的第X部, X的X次方页, 第X行的第X个字',
    password: '危在',
    result: 'tisi'
}, {
    title: '六斗柜',
    content: '?/6',
    password: '5',
    result: 'nni'
}, {
    title: '次卧',
    content: '我在谁的身后',
    password: '蜘蛛侠',
    result: 'ubag'
}]

const Page = () => {
    return (
        <StyleContainer>
            <div className="cards">
                {DATAS.map(item => (
                    <Card
                        key={item.title}
                        {...item}
                    />
                ))}
            </div>
        </StyleContainer>
    )
}

export default Page