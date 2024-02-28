const users = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const Token = require("../Models/token");
const sendMail = require("../utils/sendEmail");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongoose").Types;

// User Register
exports.registerController = async (req, res) => {
  const { name, email, mobno, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(406).json("Account already exist... Please Login");
    } else {
      const newUser = new users({
        name,
        email,
        mobno,
        password,
      });
      await newUser.save();
      const token = new Token({
        userId: newUser._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await token.save();

      const url = `${process.env.BASE_URL}/users/${newUser._id}/verify/${token.token}`;
      await sendEmail(newUser.email, "Verify Email", url);

      res.status(200).json("An email sent to your account, Please verify");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

// User Login
exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    const hash = bcrypt.compareSync(password, existingUser?.password);
    if (existingUser && hash) {
      if (existingUser.verified) {
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_CODE);
        res.status(200).json({ existingUser, token });
      } else {
        let token = await Token.findOne({ userId: existingUser._id });
        if (token) {
          res.status(404).json("An email sent to your account, Please verify");
        } else {
          const token = await new Token({
            userId: existingUser._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();

          const url = `${process.env.BASE_URL}/users/${existingUser._id}/verify/${token.token}`;
          await sendEmail(existingUser.email, "Verify Email", url);
          res.status(404).json("An email sent to your account, Please verify");
        }
      }
    } else {
      res.status(404).json("Invalid username or password");
    }
  } catch (err) {
    res.status(401).json("Invalid Email or password");
  }
};

// verify token
exports.verifyTokenController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await users.findOne({ _id: id });
    // console.log(user);
    if (!user) {
      res.status(404).json("Invalid link, User not found");
    } else if (user.verified) {
      res.status(200).json("already verified");
    } else {
      const token = await Token.findOne({ userId: user._id, token: req.params.token });
      if (!token) {
        res.status(404).json("Invalid link, token not found");
      } else {
        await users.findByIdAndUpdate({ _id: user._id }, { verified: true });
        await Token.deleteOne({ _id: token._id });
        res.status(200).json("Email Verified Succesfully");
      }
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

// get user details
exports.updateUserController = async (req, res) => {
  const userDetails = req.body;
  try {
    const result = await users.findByIdAndUpdate({ _id: userDetails._id }, userDetails, { new: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.forgotPassEmailVerifyController = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await users.findOne({ email });
    if (result) {
      const token = new Token({
        userId: result._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await token.save();
      const url = `${process.env.BASE_URL}/password/${result._id}/verify/${token.token}`;
      await sendEmail(result.email, "Forgot Password", url);
      return res.status(200).json("A link send to your email,Please Reset Password");
    }
    return res.status(404).json("Account not found")
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.tokenVerifyForForgotPassController = async (req, res) => {
  const { id, tokenNo } = req.params;
  try {
    const result = await Token.findOne({ userId: id, token: tokenNo });
    return res.status(200).json(result);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.updatePasswordController = async (req,res) => {
  const {token,newPassword} = req.body

  try {
    // const userDetails = users.findOne({_id:userId})
    const result = await Token.findOneAndDelete(token)
    if(result){
      const userDetails = await users.findOne(result.userId)
      userDetails.password = newPassword
      await userDetails.save()
      sendEmail(userDetails.email,"Password Changed",`Dear ${userDetails.name}, Your password was changed succesfully , Happy Motoring`)
      return res.status(200).json(userDetails)
    }
    return res.status(404).json("Link expired, Please try again")
  } catch (error) {
    res.status(401).json(error);
  }
  
}
