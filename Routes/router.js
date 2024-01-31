const express = require('express')
const userController = require("../Controller/userController")
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const pendingServiceController = require("../Controller/pendingServiceController")


const router = new express.Router()

// register
router.post("/user/register",userController.registerController)

// login
router.post("/user/login",userController.loginController)

// verify email
router.get("/:id/verify/:token",userController.verifyTokenController)

// add pendingService
router.post("/services/pending/add",jwtMiddleware,pendingServiceController.addPendingSeervice)


module.exports = router