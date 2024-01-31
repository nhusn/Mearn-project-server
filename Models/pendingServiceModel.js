const mongoose = require('mongoose')

const pendingServiceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    regNo:{
        type:String,
        required:true
    },
    ModOfService:{
        type:String,
        required:true
    },
    vehiclePickup:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    message:{
        type:String
    }
})

const pendingServices = mongoose.model("pendingServices",pendingServiceSchema)
module.exports = pendingServices