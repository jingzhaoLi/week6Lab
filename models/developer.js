let mongoose = require('mongoose');

var developerSchema= mongoose.Schema({
    name:{
        firstName:{       
            type:String,
            require:true
        },
        lastName:String
    },
    level:{
        type:String,
        validate:{
            validator:function (value) {
                if (value=='BEGINEER' || value=='EXPERT'){
                    return true;
                }
                else{
                    return false;
                }
            },
            message:"wrong input"
        },  
        require:true
    },
    address:{
        state:String,
        suburb:String,
        Street:String,
        Unit:Number
    }
})
let developerModel=mongoose.model('DevelopersCollection',developerSchema);
module.exports=developerModel;