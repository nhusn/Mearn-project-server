const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobno:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    subscription:{
        personal:{
            type:Boolean,
            default:false
        },
        professional:{
            type:Boolean,
            default:false
        }
    },
    verified:{
        type:Boolean,
        default:false,
        required:true
    }
})

const users = mongoose.model("users",userSchema)
module.exports = users