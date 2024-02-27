const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobno: {
    type: Number,
    required: true,
    unique: true,
    minlength: 10,
  },
  password: {
    type: String,
    required: true,
  },
  subscription: {
    personal: {
      type: Boolean,
      default: false,
    },
    professional: {
      type: Boolean,
      default: false,
    },
  },
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(this.password, salt);
    this.password=hashPassword
    next()
  } catch (error) {
    resizeBy.status(401).json(error)
  }
});

const users = mongoose.model("users", userSchema);
module.exports = users;
