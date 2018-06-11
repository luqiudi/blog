// 分离路由器示例

var express = require('express');
var router = express.Router();
var fs = require('fs');
var Comment = require('./modules/comment');
var url = require('url');
var dateFormat = require('date-format')
var app = require('./app')
var User = require('./modules/user')
var util = require('util')
var bodyParser = require('body-parser')
var ObjectID = require('mongoose').ObjectId
// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', dateFormat.asString('yyyy-MM-dd hh:mm:ss', new Date()));
  console.log(`type:${req.method} url:${req.url}`);
  // console.log();

  next();
});

// 定义网站主页的路由
router.get('/', function (req, res) {
  res.send('Birds home page');
});

// 定义 about 页面的路由
router.get('/about', function (req, res) {
  res.send('About birds');
});

//测试fs模块
router.get('/fs', function (req, res) {
  fs.readdir(__dirname + '/node_modules/', function (err, data) {
    if (err) {
      console.log(`文件读取错误：${err}`);
    }
    console.log(data);
    res.send(`${data}`)
  })
});

// 登录相关
router.post('/login', function (req, res) {
  var user = new User(req.body);

  // user.findUserByEmailAndPassword(req.body,function(err,ret){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log('查询成功！',ret);
  //     if(ret)
  //     {
  //       res.redirect('index');
  //     }else{
  //       res.redirect('login');
  //     }
  //   };
  // });
  // res.send('1');

  user.findUserByEmailAndPassword(req.body).then(function (data) {

    if (!data) {

      res.redirect('login');

    } else {

      console.log('查询成功！', data);

      res.redirect('index');
    }
  })
});

router.get('/login', function (req, res) {
  res.render('login.html');
  console.log("渲染登录");

});

router.get('/logout', function (req, res) {
  res.send('登出')
});


router.post('/logout', function (req, res) {
  res.send('渲染登出')
});

router.get('/submit', function (req, res) {
  res.send('渲染评论')
});

router.post('/submit', function (req, res) {
  res.send('提交评论')
});


router.get('/register', function (req, res) {
  console.log('渲染注册');
  res.render('register.html');
});

router.post('/register', function (req, res) {
  // res.send('注册')
  // console.log(req.body);
  user = new User(req.body);
  user.save(function (err, ret) {
    console.clear();
    if (err) {
      console.log(err);
    } else {
      console.log(ret);

      console.log(`保存成功`);
    }
  })
  // Student.save() req.body
  res.statusCode = 200;
  res.redirect('about');
  // res.send(req.body);


});

// 评论列表
router.get('/index', function (req, res) {
  // var comment = new Comment();
  Comment.find({}, function (err, ret) {
    if (err) {
      console.log(err);
    } else {
      res.render('index.html', {
        comments: ret
      });
    }

  });

  // res.render('index.html', {
  //   comments: comments.comments
  // });
  // console.log(comments.comments);

});

// 测试
router.get('/test', function (req, res) {

  res.render('index.html', {
    comments: comments.comments
  });
  console.log(comments.comments);

});

//渲染评论
router.get('/comments', function (req, res) {
  res.render('comment.html')
  console.log('开始渲染');
});

//发表评论
router.post('/comments', function (req, res) {
  var comment = new Comment(req.body);
  comment.save(req.body, function (err, ret) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('index');
    }
  });
});

//所有用户
router.get('/alluser', function (req, res) {
  // console.log(req);
  var u = User.find({}, function (err, ret) {
    if (err) {
      console.log(`发生错误`);
    } else {
      console.log("处理前："+ret);
      ret._id = "\" "+ret._id+"\"";
      console.log("处理后："+ret);
      res.render('alluser.html', {
        userlist: JSON.stringify(ret)
      });
    }
  });
  // console.log(u);
});

router.post('/alluser', function (req, res) {

});


router.get('/deleteuser', function (req, res) {
  res.send('deleteuser');
});
router.post('/deleteuser', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
  });
  //util.inspect(url.parse(req.url, true))
  // res.write(" 1");
  // var str = util.inspect(url.parse(req.url, true));
  console.log("find前：");
  console.log(req.body._id);
  console.log("USER.find前：");
  User.find({_id:req.body._id},function(err,ret){
    if(err){
      console.log(`查询错误`);  
    }else{
      // res.write(JSON.stringify(ret));
      // console.log("find:"+ret);
      // // var u = new User();
      
      // User.remove({id:ret._id},function(err){
      //   if (err) {
      //     console.log('错误');
          
      //   }else{
      //     console.log('删除成功！');
      //   }
      // });
      console.log("查询到："+ret);
      
    }
    res.end();

  });
  // User.remove();
  // res.write(str);
  // res.end();
});
module.exports = router;