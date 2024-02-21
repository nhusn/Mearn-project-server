const history = require("../Models/billingModel");
const ongoing = require("../Models/ongoingModel");

exports.addToHistoryController = async (req, res) => {
  const { allHistory, customerDetails, _id } = req.body;
  console.log(allHistory);
  try {
    const newHistory = new history({
      customerDetails,
      partsDetails: allHistory,
    });
    await newHistory.save();
    const result = await ongoing.findByIdAndUpdate({ _id },{createBill:true},{new:true});
    return res.status(200).json({newHistory,result});
  } catch (error) {
    return res.status(401).json(error);
  }
};
