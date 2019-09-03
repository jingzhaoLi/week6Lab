const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let express=require('express');
let app=express();
let bodyParser=require("body-parser");
app.use(bodyParser.urlencoded()
const url = 'mongodb://localhost:27017/'; //for protection : protocol
let viewsPath=__dirname+/views/;
let col=null;
MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) { //server url
    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        db = client.db('fi2095tabe');
        col=db.collection('customers')
        col.insertOne({name:'John',address:'Mel'});
    }
});
// db.collection('week5table').insertOne({name: 'Tim'});

app.get('/',function(req,res){
    col.insertOne({name:'tommy'})
    res.sendfile(viewsPath+"index.html");   
});

app.post("/newCustomer",function(req,res){
    col.insertOne(req.body);
    res.sendfile(viewsPath+"index.html");  
})
//1<=age<40
query={$and:[{age:{$gt:1},{age:{$lt:40}}]}
app.get("/getall",function(req,res){
    col.find({}).toArray(function(error,data){
        res.send(data);
    });
})
app.get("/getallT",function(req,res){
    let query={fullName:/^T/};
    col.find(query).toArray(function(error,data){
        res.send(data);
    });
})
