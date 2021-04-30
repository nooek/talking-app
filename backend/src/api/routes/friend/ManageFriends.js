const express = require("express")
const route = express.Router()
const controller = require("../../controllers/FriendsController")

route.post("/add", controller.addFriend)

route.get("/getfriendsbyuser/:userId", controller.getFriendsByUser)

module.exports = route