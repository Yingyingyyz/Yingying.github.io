const express = require("express");
const app = express();

//Set up cross-domain access
app.all("*",function(req,res,next){
    
    //Allow cross-domain for any domain
    res.header("Access-Control-Allow-Origin","*");
    
    //Allowable header types
    res.header("Access-Control-Allow-Headers","content-type");
    
    //Cross-domain allowed request methods 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //Let options try to request a quick end
    else
        next();
})
app.use(express.static("./"))
var bodyParser = require('body-parser')


// Parsing application/x-www-form-urlencoded response headers
app.use(bodyParser.urlencoded({ extended: false }))

//Linking Database
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '47.94.102.163',
  user     : 'yingying',
  password : 'yingsendmessage',
  database : 'sendmessage'
});
connection.connect();

//Submit information interface
app.post("/sendmessage",(req,res)=>{
    console.log(req.body);

    //inser data
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


    res.send("Submitted successfully")
})

//Listening port
app.listen("3000",()=>{
    console.log("Succeeded");
})


 



 



