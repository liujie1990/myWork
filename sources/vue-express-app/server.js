const express = require('express');
const bodyParser = require('body-parser'); // 解析客户端请求body参数
const passport = require('passport'); // 用户登录验证
const app = express(); // 实例化一个app
const db = require('./db');
const port = process.env.PORT || 5000;
// 引入users.js
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// passport初始化
app.use(passport.initialize());
require('./config/passport')(passport);

app.get('/', (req, res) => {
    res.send('Hello Express');
});

// 注册路由
app.use('/api/users', users);
app.use('/api/profiles', profiles);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});