const fs = require('fs');
const fileList = fs.readdirSync('./datas')
const datas = fileList.map(item => 
    fs.readFileSync(`./datas/${item}`, 'utf-8').split("  ").splice(1000,2000)
)


exports.getData = () => {
    try {
        const randomIndex = Math.floor(fileList.length * Math.random())
        return datas[randomIndex]
        // return parseInt(Math.random() * 100)
    } catch (err) {
        console.log(err)
    }
}
