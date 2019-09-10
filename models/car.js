let mongoose = require('mongoose');

var carSchema = mongoose.Schema({
    maker:String,
    year:Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usercol'
    }
});
let carModel=mongoose.model('CarsCollection',carSchema);
module.exports=carModel;