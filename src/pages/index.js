import React  from "react"

import Card from "../components/Card"
import { StyleContainer } from './style'

const DATAS = [{
    title: '酒柜',
    content: '最贵的酒的生日',
    password: '0313',
    result: 'gif'
}, {
    title: '书柜',
    content: 'X?的第X部, X的X次方页, 第X行的第X个字',
    password: '我',
    result: 'tisi'
}, {
    title: '六斗柜',
    content: '?/6',
    password: '4',
    result: 'nni'
}, {
    title: '次卧',
    content: '雪茄的牌子',
    password: 'luomio',
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
            <div className="pwd">
                121sdss
            </div>
        </StyleContainer>
    )
}

export default Page