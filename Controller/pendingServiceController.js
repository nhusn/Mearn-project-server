const pendingServices = require('../Models/pendingServiceModel')
const sendEmail = require('../utils/sendEmail')


exports.addPendingSeervice = async (req, res) => {
    const { name, number, email, date, company, model, regNo, ModOfService, vehiclePickup, address, message } = req.body
    try {
        const newService = new pendingServices({
            name, number, email, date, company, model, regNo, ModOfService, vehiclePickup, address, message
        })
        await newService.save()
        let emailTemplate = `Dear ${name},
            I hope this email finds you well. We appreciate your recent booking with LenMotors and would like to inform you that the status of your booking is currently pending.

            Our team is working diligently to process your reservation and ensure that everything is in order. We understand the importance of your booking and would like to assure you that we are doing our best to expedite the process.

            Thank you for choosing LenMotors. We appreciate your patience and look forward to providing you with excellent service.

            Best regards,
            anangel098@gmail.com
            `;

        // await sendEmail(email, "Booking Service",emailTemplate)
        res.status(200).json("Our representative will call you")
    } catch (error) {
        res.status(401).json(error)
    }
}