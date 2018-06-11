// 引入第三方包
// express框架
var express = require('express');
// 创建服务器
var app = express();
var bodyparser = require('body-parser');

// 引入路由
var router = require('./router');

// 引入fs模块
var fs = require('fs');

// //引入mongoose框架
// var mongoose = require('mongoose');
// // 连接mongodb数据库
// mongoose.connect('mongodb://localhost/test');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//设置模板引擎
//该模板引擎默认从该目录下的views文件夹渲染文件
app.engine('html', require('express-art-template'))

// 挂载路由器

//挂载静态资源
app.use('/node_modules', express.static('node_modules'));

//挂载静态资源
app.use('/public', express.static('public'));

//挂载视图资源
app.use('/page', express.static('views'));

app.use('/router', router)

// var comments = [{
//         "name": "dizi",
//         "message": "nihao123",
//         "age": "18",
//         "date": "2018年5月11日14:23:47"
//     },
//     {
//         "name": "dizi",
//         "message": "nihao123",
//         "age": "18",
//         "date": "2018年5月11日14:23:47"
//     },
//     {
//         "name": "dizi",
//         "message": "nihao123",
//         "age": "18",
//         "date": "2018年5月11日14:23:47"
//     },
//     {
//         "name": "dizi",
//         "message": "nihao123",
//         "age": "18",
//         "date": "2018年5月11日14:23:47"
//     },
//     {
//         "name": "dizi",
//         "message": "nihao123",
//         "age": "18",
//         "date": "2018年5月11日14:23:47"
//     }
// ];

var server = app.listen(
    3000,
    function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("服务器启动 地址:" + host + " 端口:" + port);

    });
// exports.comments = comments;
module.exports = app;