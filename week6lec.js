let mongoose = require('mongoose');

let url="mongodb://localhost:27017/week7db";
let User=require('./models/user') //reference to the userModel,using shcema under collection 
let Car=require('./models/car')
const express = require("express");
const app = express();
mongoose.connect(url,{ useNewUrlParser: true },function(err){
    if(err){
        console.log(err);
    }
    else{

        let user = new User({
            name:"Tim",
            age:22,
            address:'Mel'
        });
        user.save(function(err){
            if (err){
                console.log(err);
            }
            else{
                console.log("Save");
                let car=new Car({
                    maker:'BMW',
                    year: 2015,
                    user: user._id
                });
                car.save(function(err){
                    if (err) {
                        console.log(err);
                    }
                    else{
                        console.log("saved");
                        
                    }
                })
            }
        })
    }
})


app.get('/getusers',function(Req,res){
    User.find().limit(3).sort({age:-1}).exec(function(err,data){
        res.send(data)
    })
})
app.get('/getcars',function(Req,res){
    Car.find().populate('user').exec(function(err,data){
        res.send(data)
    })
})
app.get('/deleteAll',function(Req,res){
    User.deleteMany({},function(err,obj){
        Car.deleteMany({},function(err,obj){
        })
    })
})
app.listen(8080);