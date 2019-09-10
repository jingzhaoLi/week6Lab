const express = require("express");
const mongodb = require("mongodb");
const bodyparser = require('body-parser');
const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// app.use(express.static('img'));
app.use(express.static('img'));
app.use(express.static('css'));
app.use(bodyparser.urlencoded({ extended: false }));
app.listen(8080);

const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/";

let viewsPath=__dirname+/views/;
let db=null;

MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) { //server url
    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        db = client.db('fit2095db');
        col=db.collection('fit2095dbweek6')
        // col.insertOne({name:'John',address:'Mel'});
    }
});
app.get('/',function(req,res){
    res.sendFile(viewsPath+"index.html");
});
app.get('/insert',function(req,res){
    res.sendFile(viewsPath+"insert.html");   
});
app.get('/getAll',function(req,res){
    col.find({}).toArray(function (err, data) {
        res.render('getAll', { usersDb: data });
    });     
});
app.get('/deleteuser',function(req,res){
    res.sendFile(viewsPath+"deleteUser.html");   
});
app.get('/deleteOne',function(req,res){
    res.sendFile(viewsPath+"deleteOne.html");   
});
app.get('/deleteAll',function(req,res){
    res.sendFile(viewsPath+"deleteAll.html");   
});
app.get('/update',function(req,res){
    res.sendFile(viewsPath+"update.html");   
});
app.get('/findTask',function(req,res){
    res.sendFile(viewsPath+"findTask.html");   
});
app.post('/findTaskAB',function(req,res){
    let userDetails = req.body;
    col.find({$and:[{Taskid:{$gte:parseInt(userDetails.taskID1)}},{Taskid:{$lte:parseInt(userDetails.taskID2)}}]}).toArray(function(err,result){
        console.log("abc");
        res.render('findTaskOperation', { usersDb: result });
    });
});
app.post('/addNewTask', function (req, res) {
    let userDetails = req.body;
    let randomId = (Math.round(Math.random() * 100));
    if (userDetails.taskStatus==="Complete" || userDetails.taskStatus==="InProgress"){
        col.insertOne({ Taskid:randomId,Task: userDetails.taskName, assignPerson: userDetails.personName, dueDate: userDetails.dueDate, taskStatus: userDetails.taskStatus , taskDescription:userDetails.description });
    }
    res.redirect('/getAll'); // redirect the client to list users page
    
});
app.post('/updateuserdata', function (req, res) {
    let userDetails = req.body;
    if (userDetails.taskStatus==="Complete" || userDetails.taskStatus==="InProgress"){
    let filter = { Taskid: parseInt(userDetails.taskID) };
    // let filter = { taskName: userDetails.taskName }
    let theUpdate = { $set: { taskStatus: userDetails.taskStatus }};
    db.collection('fit2095dbweek6').updateOne(filter, theUpdate);}
    res.redirect('/getAll');// redirect the client to list users page
})
app.post('/deleteAll', function (req, res) {
    // let theUpdate = { $gte: 0};
    db.collection('fit2095dbweek6').deleteMany({taskStatus: {$eq: "Complete"}});
    res.redirect('/getAll');// redirect the client to list users page
})
app.post('/deleteOne', function (req, res) {
    let userDetails = req.body;
    let filter = { Taskid: parseInt(userDetails.taskID) };
    db.collection('fit2095dbweek6').deleteOne(filter);
    res.redirect('/getAll');// redirect the client to list users page
})