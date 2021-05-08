const express = require("express")
const route = express.Router()
const controller = require("../../controllers/FriendsController")

route.post("/sendrequest", controller.sendFriendRequest)

route.get("/getfriendsbyuser/:userId", controller.getFriendsByUser)

route.put('/updatestatus', controller.updateFriendStatus)

module.exports = route