const express = require("express");
const app = express();

//设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})
app.use(express.static("./"))
var bodyParser = require('body-parser')


//  解析 application/x-www-form-urlencoded响应头
app.use(bodyParser.urlencoded({ extended: false }))

//链接数据库
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '47.94.102.163',
  user     : 'yingying',
  password : 'yingsendmessage',
  database : 'sendmessage'
});
connection.connect();

//提交信息接口
app.post("/sendmessage",(req,res)=>{
    console.log(req.body);

    //插入数据
    var addSqlParams =  [req.body.name, req.body.email,req.body.message];
    var addSql = 'INSERT INTO message(name,email,message) VALUES(?,?,?)';
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});


    res.send("提交成功")
})

//监听端口
app.listen("3000",()=>{
    console.log("成功");
})


 



 



