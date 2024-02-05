const ongoings = require("../Models/ongoingModel")
const sendEmail = require("../utils/sendEmail")


exports.addOngoingController = async (req, res) => {
    const { ModOfService, address, date, regNo, number, email, name } = req.body

    try {
        const newJob = new ongoings({
           name,number, regNo, jobDate: date, modOfService:ModOfService, address, email
        })
        await newJob.save()


        const emailMockup = `
    Dear ${name},
    We hope this email finds you well. We are pleased to inform you that your recent request for a vehicle service booking has been successfully confirmed. We appreciate your trust in our services and look forward to ensuring your vehicle receives the attention it deserves.

    Best regards,
    lenmotors@gmail.com
    `
        sendEmail(email, "Booking Confirmed",emailMockup)

        res.status(200).json("Booking Confirmed")

    } catch (error) {
        res.status(401).json(error)
    }
}
