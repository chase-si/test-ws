// 处理获得X轴数据
const handleXData = (YdataArr, filterLen) => {
    let newYdata = [...YdataArr]
    const originLen = YdataArr.length
    const START = 10e6
    const END = 108e6
    let step = 25e3

    if (filterLen && (filterLen < originLen)) {
        const splitNum = Math.ceil(originLen / filterLen * 2)
        const newArr = []

        for (let i = 0; i < filterLen; i += 1) {
            const end = (i + 1) * splitNum
            const start = i * splitNum
            const splitArr = newYdata.slice(start, end)
            if (splitArr.length === 0) {
                break
            }
            newArr.push(Math.max(...splitArr))
            newArr.push(Math.min(...splitArr))
        }

        newYdata = newArr
        step = step * originLen / filterLen
    }

    return [
        newYdata.map((_, index) => START + (step * index)),
        newYdata
    ]
}

export {
    handleXData
}