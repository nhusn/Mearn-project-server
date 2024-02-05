const callRequests = require('../Models/callRequestModel')

exports.addCallRequestController = async (req,res)=>{
    const {name,number,date,time,message} = req.body
    try {
       const newRequest = new callRequests({
        name,number,date,time,message
       })
       await newRequest.save()

       res.status(200).json("Our representative will call you")
    } catch (error) {
        res.status(401).json(error) 
    }
}

exports.getCallRequestController = async (req,res)=>{
    try {
        const result = await callRequests.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json(error) 
    }
}

exports.removeCallRequestController = async (req,res) => {
    const {id} = req.params
    console.log(id);
    try {
        const result = await callRequests.findByIdAndDelete({_id:id})
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json(error) 
    }
}