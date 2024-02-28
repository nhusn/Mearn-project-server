const {Schema,model} = require('mongoose')

const slotSchema = new Schema({
    date:String,
    time:String,
    modOfService:String
})

const slot = model('slot',slotSchema)
module.exports = slot