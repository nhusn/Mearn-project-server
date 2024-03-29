const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  customerDetails: {
    email: {
        type: String,
        required: true,
    },
    invoiceDate: {
      type: String,
      required: true,
    },
    billedAddress: {
      type: String,
      required: true,
    },
    mobNo: {
      type: Number,
      required: true,
    },
    techName: {
      type: String,
      required: true,
    },
    jobDate: {
      type: String,
      required: true,
    },
    invoiceType: {
      type: String,
      required: true,
    },
    repairType: {
      type: String,
      required: true,
    },
    km: {
      type: Number,
      required: true,
    },
    registerNo: {
      type: String,
      required: true,
    },
    chasisNo: {
      type: String,
      required: true,
    },
    engineNo: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
    totalAmount:{
        type:Number,
        required:true
    }
  },
  partsDetails: [
    {
      labourPartsCode: {
        type: String,
        required: true,
      },
      descLabourParts: {
        type: String,
        required: true,
      },
      billingType: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      uom: {
        type: String,
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
    },
  ],
});
const history = mongoose.model("history", historySchema);
module.exports = history;
