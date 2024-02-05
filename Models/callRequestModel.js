const mongoose = require('mongoose')

const callRequestSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const callRequests = mongoose.model("callRequests",callRequestSchema)
module.exports = callRequests