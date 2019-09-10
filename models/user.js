let mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true

    },
    age:{
        type:Number,
        validate:{
            validator:function(value){
                if (value % 2 ==0){
                    return true;
                }
                else{
                    return false;
                }
            },
            message:'Should be an even age!!!'
        },
        required:true
    },
    address:{
        type:String , //set -> setter, get -> getter
        set:function (newAddress){

            return "you lived in "+newAddress;
    }},
    created:{
        type:Date,
        default:Date.now()
    }
});

userSchema.pre('save',function(){
    this.address=this.address+"CITY";
    this.age=this.age+2;
})
userModel=mongoose.model("UserCol",userSchema);
module.exports=userModel;