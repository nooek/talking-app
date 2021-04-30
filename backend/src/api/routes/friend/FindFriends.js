const express = require("express")
const route = express.Router()
const controller = require("../../controllers/FriendsController")

route.get("/:name", controller.findFriends)

module.exports = route