let mongoose = require('mongoose');

var taskSchema= mongoose.Schema({
    taskName:{
        type:String,
        require:true
    },
    developer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'developercol'
    },
    dueDate:Date,
    taskStatus:{
        type:String,
        validate:{
            validator:function (value) {
                if (value =='InProgress' || value =='Complete'){
                    return true;
                }
                else{
                    return false;
                }
            }
        },
        message:'wrong input!!!'
    },
    taskDescription:String
})
let taskModel=mongoose.model('TasksCollection',taskSchema);
module.exports=taskModel;