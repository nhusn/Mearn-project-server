const express = require('express')
const userController = require("../Controller/userController")
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const pendingServiceController = require("../Controller/pendingServiceController")
const callRequestController = require('../Controller/callRequestController')
const ongoingController = require('../Controller/ongoingController')


const router = new express.Router()

// register
router.post("/user/register",userController.registerController)

// login
router.post("/user/login",userController.loginController)

// verify email
router.get("/:id/verify/:token",userController.verifyTokenController)

// add pendingService
router.post("/services/pending/add",jwtMiddleware,pendingServiceController.addPendingServiceController)

// get all pending services
router.get("/services/pending/all",pendingServiceController.allPendingServiceController)

// remove pending service
router.delete('/services/pending/remove',pendingServiceController.removePendingController)

// add call request
router.post("/services/call-request",callRequestController.addCallRequestController)

// get all call request
router.get("/services/all-call-request",callRequestController.getCallRequestController)

// remove call request
router.delete("/services/call/remove/:id",callRequestController.removeCallRequestController)

// add ongoing service
router.post('/service/ongoing/add',ongoingController.addOngoingController)


module.exports = router