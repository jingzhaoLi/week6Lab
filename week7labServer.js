const express = require("express");
const bodyparser = require('body-parser');
var mongooese= require("mongoose");
const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// app.use(express.static('img'));
app.use(express.static('img'));
app.use(express.static('css'));
app.use(bodyparser.urlencoded({ extended: false }));
app.listen(8080);

const url = "mongodb://"+process.argv[2]+":27017/week7db"
console.log(url);

// let url="mongodb://localhost:27017/week7db";
let Task=require('./models/task');
let Developer=require('./models/developer');

let viewsPath=__dirname+/views/;
let db=null;

mongooese.connect(url,{ useNewUrlParser: true ,useUnifiedTopology:true},function (err) {
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected successfully");
    }
})
app.get('/updateFirstName/:oldfirstname/:newfirstname',function (req,res) {
    let developerDetails=req.params;
    Developer.updateMany({'name.firstName':developerDetails.oldfirstname},{$set:{'name.firstName':developerDetails.newfirstname}},function (err,doc) {
        console.log(doc);
    })
    res.redirect('/getAllDeveloper')
})
app.get('/',function(req,res){
    res.sendFile(viewsPath+"index.html");
});
app.get('/insertDeveloper',function(req,res){
    res.sendFile(viewsPath+"insertDeveloper.html");   
});
app.get('/insert',function(req,res){
    res.sendFile(viewsPath+"insert.html");   
});
app.get('/getAllDeveloper',function (req,res) {
    Developer.find({}).exec(function (err,data) {
        res.render('getAllDeveloper',{usersDb:data});
        // res.send(data);
    })
});
app.get('/getAll',function(req,res){
    Task.find({}).exec(function (err,data) {
        res.render('getAll',{usersDb:data});
        // res.send(data);
    })   
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
app.post('/addNewDeveloper', function (req, res) {
    let userDetails = req.body;

    let developer=new Developer({
        name:{
            firstName:userDetails.firstName,
            lastName:userDetails.lastName
        },
        level:userDetails.level.toUpperCase(),
        address:{
            state:userDetails.state,
            suburb:userDetails.suburb,
            Street:userDetails.street,
            Unit:userDetails.unit
        }
    });
    developer.save(function (err) {
        if (err){
            throw err;
        }else{
            console.log('success');
        }
    });
    res.redirect('/getAllDeveloper'); // redirect the client to list users page
    
});
app.post('/addNewTask', function (req, res) {
    let userDetails = req.body;
    let task=new Task({
        taskName:userDetails.taskName,
        developer:userDetails.personID,
        dueDate:userDetails.dueDate,
        taskStatus:userDetails.taskStatus,
        taskDescription:userDetails.description
    });
    task.save(function (err) {
        if (err){
            throw err;
        }else{
            console.log('success');
        }
    });
    res.redirect('/getAll'); // redirect the client to list users page
    
});
app.post('/updateuserdata', function (req, res) {
    let userDetails = req.body;
    if (userDetails.taskStatus==="Complete" || userDetails.taskStatus==="InProgress"){
        let filter = { _id: userDetails.taskID };
        // let filter = { taskName: userDetails.taskName }
        let theUpdate = { $set: { taskStatus: userDetails.taskStatus }};
        Task.updateOne(filter,theUpdate,function (err,doc) {
            console.log(doc);
        })
    }
    // db.collection('fit2095dbweek6').updateOne(filter, theUpdate);}
    res.redirect('/getAll');// redirect the client to list users page
})

app.post('/deleteAll', function (req, res) {
    // let theUpdate = { $gte: 0};
    Task.deleteMany({taskStatus:{$eq: "Complete"}},function (err,doc) {
        console.log(doc);
    })
    // db.collection('fit2095dbweek6').deleteMany({taskStatus: {$eq: "Complete"}});
    res.redirect('/getAll');// redirect the client to list users page
})
app.post('/deleteOne', function (req, res) {
    let userDetails = req.body;
    let filter = { _id: userDetails.taskID };
    Task.deleteOne(filter,function (err,doc) {
        console.log(doc);
    })
    // db.collection('fit2095dbweek6').deleteOne(filter);
    res.redirect('/getAll');// redirect the client to list users page
})