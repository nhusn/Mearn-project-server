const history = require("../Models/billingModel");
const ongoing = require("../Models/ongoingModel");

exports.addToHistoryController = async (req, res) => {
  const { allHistory, customerDetails, _id } = req.body;
  try {
    const newHistory = new history({
      customerDetails,
      partsDetails: allHistory,
    });
    await newHistory.save();
    const result = await ongoing.findByIdAndUpdate({ _id }, { createBill: true }, { new: true });
    return res.status(200).json({ newHistory, result });
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.getAllHistoryController = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await history.find({ "customerDetails.email": email });
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.getHistoryController = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await history.findOne({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json(error);
  }
};
