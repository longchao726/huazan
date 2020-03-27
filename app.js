const express = require('express');
const bodyParser = require('body-parser');        //引入中间件
let app = express();                              //创建web服务器
app.listen(8999);                                 //创建端口

const userRouter = require('./router/user.js');   //引入路由
const productRouter = require('./router/product.js')
const articleRouter = require('./router/articles.js')


app.use( express.static('public') );              //托管静态资源到public

app.use( bodyParser.urlencoded({                  //使用bodyParser中间件
		extended : false
   }) );

app.use('/user',userRouter);                       //使用路由
app.use('/product',productRouter);       
app.use('/article',articleRouter);    