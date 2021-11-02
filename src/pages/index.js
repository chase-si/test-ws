import React  from "react";

import Inputs from "../components/Inputs";
import { StyleContainer, Card } from './style';

const DATAS = [{
    title: '酒柜',
    content: '找到',
    password: '1990',
    result: '2222'
}]

const Page = () => {
    return (
        <StyleContainer>
            <div className="cards">
                {DATAS.map(item => (
                    <Card key={item.title}>
                        {item.content}
                    </Card>
                ))}
            </div>
            <Inputs />
        </StyleContainer>
    )
}

export default Page