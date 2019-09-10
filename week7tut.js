var express = require('express');
var mongooese= require("mongooese");

var app = new express();
mongooese.connect("mongodb://localhost:27017",function (err) {
    if (err){
        throw err;
    }else{
        console.log("Connected successfully");
    }
});

var warehouse= require('./models/warehouse');
var item=require('./models/item');

//add a new warehouse
app.get('/addstore/:name/:capacity/:address',function (res,req) {
    warehouse.create({
        name : req.params.name,
        capacity: parseInt(rea.params.capacity),
        address: req.params.address
    },function (err) {
        if (err){
            throw err;
        }else{
            res.redirect("/getstores");
        }
    })
})
app.get("/getstores",function (req,res) {
    warehouse.find().exec(function (err,data) {
        if (err){
            throw err;
        }
        else{
            res.send(data);
        }
    });
});
//connection to db
//add anew item
app.get("/additem/:name/:price/:created/:warehouse",function (req,res) {
  item.create({

    name:req.params.name,
    price: parseInt(req.params.price),
    created: new Date(req.params.created),
    warehouse: new mongooese.Types.ObjectId(req.params.warehouse)
  },function(err){
      if (err){
          throw err;
      }else{
          res.redirect('/getItems');
      }

  })  
})
app.get('/getItems',function (req,res) {
    item.find().populate('warehouse').exec(function (err,data) {
        if (err){
            throw err;
        }
        else{
            res.send(data);
        }
    })
})
app.listen(8080);