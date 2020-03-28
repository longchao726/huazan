const express = require('express');     //引入express框架
const pool = require('../pool.js');     //引入连接池
let router = express.Router();          //创建路由器对象

//用户注册
router.get('/register/:uname', (req, res) => {   //检测用户名是否存在
  let $uname = req.params.uname;
  let sql = 'SELECT uname FROM hz_user WHERE uname = ?';
  pool.query(sql, [$uname], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.send('1');
    } else {
      res.send('0');
    }
  });
});
router.post('/register', (req, res) => {    //提交注册，注册成功返回1，注册失败返回0
  let obj = req.body;
  let sql = 'INSERT INTO hz_user SET ?';
  pool.query(sql, [obj], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send('1');
    } else {
      res.send('0');
    }
  });
});

//用户登陆
//帐号密码登录
router.get('/login/:uname&:upwd', (req, res) => {
  let $uname = req.params.uname;
  let $upwd = req.params.upwd;
  let sql = 'SELECT uname,upwd FROM hz_user WHERE uname = ? AND upwd = ?';
  pool.query(sql, [$uname, $upwd], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ message: '登录成功', code: 1, uname: $uname });
    } else {
      res.send('0');
    }
  });
});

//手机验证码登陆
router.get('/phoneLogin/:uname', (req, res) => {
  let $uname = req.params.uname;
  let sql = 'SELECT uname FROM hz_user WHERE uname = ?';
  pool.query(sql, [$uname], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send('1');
    } else {
      res.send('0');
    }
  });
});
module.exports = router;                //导出路由器对象