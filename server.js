var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
var path = require('path');
const {readFile, writeFile} = require("fs");
//配置post请求体
app.use(express.json());

app.get('/contacts', (req, res) => {
    getData().then(data => {
        res.json(data)
    })
})
app.get('/contacts/:id', (req, res) => {
    let id = req.params.id || 0;
    getData().then(data => {
        res.json(data[id])
    })
})
app.post('/contacts', (req, res) => {
    let {name, email} = req.body;
    getData().then(data => {
        let id = getRandomId()
        data[id] = {name, email}
        setData(data).then(() => {
            res.json({code: 200, msg: '添加成功', id})
        })
    })
})
app.delete('/contacts/:id', (req, res) => {
    let id = req.params.id;
    getData().then(data => {
        delete data[id];
        setData(data).then(() => {
            res.json(null)
        })
    })
})
app.patch('/contacts/:id', (req, res) => {
    let id = req.params.id;
    let {name, email} = req.body;
    getData().then(data => {
        data[id] = {name, email}
        setData(data).then(() => {
            res.json({code: 200, msg: '修改成功', name, email})
        })
    })
})

//读取contacts.json文件
function getData() {
    return new Promise((resolve, reject) => {
        readFile(path.join(__dirname, 'contacts.json'), 'utf8', (err, data) => {
            if (err) {
                return reject(err)
            }
            resolve(JSON.parse(data))
        })
    })
}

//添加联系人
function setData(data) {
    return new Promise((resolve, reject) => {
        writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(data, null, 2), (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}

//随机生成id
function getRandomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

app.listen(3001, () => {
    console.log('server is running at port 3000')
})



const a = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8','a9','a10']
const b = Array.from({length: 10000}, (item, index) => 'b' + index)

let multiple = Math.ceil(b.length / a.length)
let alen = a.length
let result2 = {}
 console.time('test')
for (let i = 0; i < multiple; i++) {
    let index = i
    result2['S' + (index + 1)] = b.slice(index * alen, (index + 1) * alen)

}
console.log('%c 测试', 'color:#fff; background:red')
console.log(result2)

