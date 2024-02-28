const availableSlot = require("../Models/availableSlot");

exports.addToSlotController = async (req, res) => {
  const { date, time, modOfService } = req.body;
  try {
    const existingSolt = await availableSlot.findOne({ date, time, modOfService });
    if (existingSolt) {
      return res.status(404).json("Slot already booked");
    }
    const newSlot = new availableSlot({
      date,
      time,
      modOfService,
    });
    await newSlot.save();
    res.status(200).json(newSlot)
  } catch (error) {
    res.status(401).json(error);
  }
};
