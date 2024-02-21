const ongoings = require("../Models/ongoingModel");
const sendEmail = require("../utils/sendEmail");

exports.addOngoingController = async (req, res) => {
  const { ModOfService, address, date, regNo, number, email, name } = req.body;

  try {
    const newJob = new ongoings({
      name,
      number,
      regNo,
      jobDate: date,
      modOfService: ModOfService,
      address,
      email,
    });
    await newJob.save();

    const emailMockup = `
    Dear ${name},
    We hope this email finds you well. We are pleased to inform you that your recent request for a vehicle service booking has been successfully confirmed. We appreciate your trust in our services and look forward to ensuring your vehicle receives the attention it deserves.

    Best regards,
    lenmotors@gmail.com`;
    sendEmail(email, "Booking Confirmed", emailMockup);

    res.status(200).json("Booking Confirmed");
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.getallOngoingServiceController = async (req, res) => {
  try {
    const result = await ongoings.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.updateOngoingController = async (req, res) => {
  const { id, value } = req.body;
  try {
    const updateObj = { [value]: true };
    const result = await ongoings.findByIdAndUpdate({ _id: id }, updateObj, { new: true });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.addComplaintDescriptionController = async (req, res) => {
    const {description,id} = req.body
    try {
        const result = await ongoings.findByIdAndUpdate({_id:id},{complaintDescription:description},{new:true})
        return res.status(200).json(result)
    } catch (error) {
        return res.status(401).json(error);
    }
};
