const express = require('express');     //引入express框架
const pool = require('../pool.js');     //引入连接池
let router = express.Router();          //创建路由器对象


// 分类商品列表
router.get('/list', (req,res) => {
  let id = req.query.id;
  let kw = req.query.kw;
  let page = req.query.page;
  //设置每页显示商品12个
  let pageSize = 12;
  var pageCount = 0;
  var count = 0;
  //偏移量为，页码减一乘以每页显示商品数量
  let offset = (parseInt(page) - 1) * pageSize;
  //如果关键字不为空，则查询关键字相关商品
  if(kw != undefined){
    let countSql = 'SELECT COUNT(id) AS count FROM hz_flower WHERE title LIKE ?'
    pool.query(countSql, ['%' + kw + '%'], (err, result) => {
      if(err) throw err;
      console.log(result)
      count = result[0].count;
      pageCount = Math.ceil(count / pageSize);
      console.log(pageCount);
      console.log(count);

    })
    let sql = 'SELECT id,family_id,title,img,price,save FROM hz_flower WHERE title LIKE ? LIMIT ?,?';
    pool.query(sql, ['%' + kw + '%', offset, pageSize], (err, result) => {
      if(err) throw err;
      setTimeout(() => {
        res.send({products : result, pageCount : pageCount, count : count});
      },20)
    })  
    //如果商品id不为空，则查询商品id相关商品
  } else if(id != undefined){
    let countSql = 'SELECT COUNT(id) AS count FROM hz_flower WHERE family_id=?'
    pool.query(countSql, [id], (err, result) => {
      if(err) throw err;
      count = result[0].count;
      pageCount = Math.ceil(count / pageSize)
    })
    let sql = 'SELECT id,family_id,title,img,price,save FROM hz_flower WHERE family_id=? LIMIT ?,?';
    pool.query(sql, [id, offset, pageSize], (err, result) => {
      if(err) throw err;
      setTimeout(() => {
        res.send({products : result, pageCount : pageCount, count : count});
      },20)
    })
    //如果两个都为空，则查询所有商品信息
  } else {
    let sql = 'SELECT id,family_id,title,img,price,save FROM hz_flower LIMIT ?,?';
    let countSql = 'SELECT COUNT(id) AS count FROM hz_flower'
    pool.query(countSql, (err, result) => {
      if(err) throw err;
      count = result[0].count;
      pageCount = Math.ceil(count / pageSize)
    })
    pool.query(sql, [offset, pageSize], (err, result) => {
      if(err) throw err;
      setTimeout(() => {
        res.send({products : result, pageCount : pageCount, count : count});
      },20)
    })
  }
})

// 商品详情
router.get('/detail', (req, res) => {
  let id = req.query.id;
  let sql = 'SELECT id,family_id,product_id,title,img,price,materials,pack,presenter,distribu,explains,details,save FROM hz_flower WHERE id=?'
  pool.query(sql, [id], (err, result) => {
    if(err) throw err;
    res.send(result[0])
  })
})

router.get('/index', (req, res) => {
  let sql = 'SELECT id,family_id,title,img,price,save FROM hz_flower ORDER BY product_id'
  pool.query(sql, (err, result) => {
    if(err) throw err;
    res.send(result);
  })
})
router.get('/new', (req, res) => {
  let sql = 'SELECT id,family_id,title,img,price,save FROM hz_flower WHERE family_id=1 ORDER BY id DESC LIMIT 0,5';
  pool.query(sql, (err,result) => {
    if(err) throw err;
    res.send(result);
  })
})
module.exports = router; 