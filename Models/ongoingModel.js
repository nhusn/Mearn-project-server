const mongoose = require('mongoose')

const ongoingSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    regNo:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    jobDate:{
        type:String,
        required:true,
    },
    modOfService:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    bookService:{
        type:Boolean,
        required:true,
        default:false
    },
    vehiclePickup:{
        type:Boolean,
        required:true,
        default:false
    },
    inspection:{
        type:Boolean,
        required:true,
        default:false
    },
    complaint:{
        type:Boolean,
        required:true,
        default:false
    },
    serviceDone:{
        type:Boolean,
        required:true,
        default:false
    },
    Delivered:{
        type:Boolean,
        required:true,
        default:false
    },
    complaintDescription:{
        type:String,
        default:""
    },
    createBill:{
        type:Boolean,
        required:true,
        default:false
    }
    

})

const ongoings = mongoose.model("ongoings",ongoingSchema)
module.exports = ongoings