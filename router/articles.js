const express = require('express');     //引入express框架
const pool = require('../pool.js');     //引入连接池
let router = express.Router();          //创建路由器对象

// 文章首页四个分类分别三条信息
router.get('/index', (req, res) => {
  var birthday,apologize,love,knowledge;
  let category_id1 = 'SELECT id,subject,img,timer,description FROM hz_huayu_articles WHERE category_id=1 LIMIT 0,3';
  pool.query(category_id1, (err, result) => {
    if(err) throw err;
    birthday = result;
  });
  let category_id2 = 'SELECT id,subject,img,timer,description FROM hz_huayu_articles WHERE category_id=2 LIMIT 0,3';
  pool.query(category_id2, (err, result) => {
    if(err) throw err;
    apologize = result;
  });
  let category_id3 = 'SELECT id,subject,img,timer,description FROM hz_huayu_articles WHERE category_id=3 LIMIT 0,3';
  pool.query(category_id3, (err, result) => {
    if(err) throw err;
    love = result;
  })
  let category_id4 = 'SELECT id,subject,img,timer,description FROM hz_huayu_articles WHERE category_id=4 LIMIT 0,3';
  pool.query(category_id4, (err, result) => {
    if(err) throw err;
    knowledge = result;
    setTimeout(() => {
      res.send({birthday,apologize,love,knowledge})
    },0)
  })
})
// 文章列表
router.get('/list', (req, res) => {
  let id = req.query.id;
  let name = 'SELECT category_name FROM hz_huayu_category WHERE id=?';
  let category_name = '';
  pool.query(name, [id], (err, result) => {
    if(err) throw err;
    category_name = result[0].category_name;
  })
  let sql = 'SELECT id,subject,description,img,timer FROM hz_huayu_articles WHERE category_id=?';
  pool.query(sql, [id], (err, result) => {
    if(err) throw err;
    setTimeout(() => {
      res.send({result : result, category_name : category_name})
    }, 0);
  })
})


router.get('/', (req, res) => {
  let id = req.query.id
  let sql = 'SELECT id,subject,timer,description,category_id FROM hz_huayu_articles WHERE id=?';
  let name = 'SELECT category_name FROM hz_huayu_category WHERE id=(SELECT category_id FROM hz_huayu_articles WHERE id=?)'
  var category_name = ''
  pool.query(name, [id], (err, result) => {
    if(err) throw err;
    category_name = result[0];
  });
  setTimeout(() => {
    pool.query(sql, [id], (err, result) => {
      if(err) throw err;
      setTimeout(() => {
        result[0].category_name = category_name.category_name;
        res.send(result[0]);
      },0)
    })
  },0)
})
//最新文章,按照时间排序，只取前八个, 花语首页最新文章轮播图也用这个路由
router.get('/new', (req, res) => {
  let sql = 'SELECT id,subject,img,timer FROM hz_huayu_articles ORDER BY timer DESC LIMIT 0,8' 
  pool.query(sql, (err, result) => {
    if(err) throw err;
    res.send(result);
  })
})

module.exports = router; 