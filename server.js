// 引入必要的模块
const express = require('express');
const cors = require('cors');
const path = require('path');
const { readFile, writeFile } = require('fs');

const app = express();
const port = process.env.PORT || 3001;

// 配置跨域和 POST 请求体解析
app.use(cors());
app.use(express.json());

// API 路由
app.get('/contacts', (req, res) => {
    getData().then(data => {
        res.json(data);
    });
});

app.get('/contacts/:id', (req, res) => {
    let id = req.params.id || 0;
    getData().then(data => {
        res.json(data[id]);
    });
});

app.post('/contacts', (req, res) => {
    let { name, email } = req.body;
    getData().then(data => {
        let id = getRandomId();
        data[id] = { name, email };
        setData(data).then(() => {
            res.json({ code: 200, msg: '添加成功', id });
        });
    });
});

app.delete('/contacts/:id', (req, res) => {
    let id = req.params.id;
    getData().then(data => {
        delete data[id];
        setData(data).then(() => {
            res.json(null);
        });
    });
});

app.patch('/contacts/:id', (req, res) => {
    let id = req.params.id;
    let { name, email } = req.body;
    getData().then(data => {
        data[id] = { name, email };
        setData(data).then(() => {
            res.json({ code: 200, msg: '修改成功', name, email });
        });
    });
});

// 读取 contacts.json 文件
function getData() {
    return new Promise((resolve, reject) => {
        readFile(path.join(__dirname, 'contacts.json'), 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(data));
        });
    });
}

// 写入 contacts.json 文件
function setData(data) {
    return new Promise((resolve, reject) => {
        writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(data, null, 2), (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

// 生成随机 ID
function getRandomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// 静态文件处理
app.use(express.static(path.join(__dirname, 'build')));

// 捕获所有路由并返回 index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
