const mysql = require('mysql');    //引入mysql模块
let pool = mysql.createPool({      //创建连接池
	host : '127.0.0.1',
	port : '3306',
	user : 'root',
	password : '',
	database : 'huazan',
    connectionLimit : 15
});
module.exports = pool;   //导出连接池对象