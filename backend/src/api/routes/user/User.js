const express = require("express")
const route = express.Router()
const authenticateUser = require("../../helpers/tokenAuth")
const controller = require("../../controllers/UserController")

route.get("/getuser", authenticateUser, controller.getUser)

route.get("/:id", controller.getUserById)

route.delete("/", controller.deleteUser)

route.put("/", authenticateUser, controller.updateUser)

route.get("/logout/asd", controller.logOut)

module.exports = route