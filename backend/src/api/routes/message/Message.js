const express = require("express")
const route = express.Router()
const controller = require("../../controllers/MessagesController")

route.post('/', controller.createMessage)

route.get('/:id', controller.getMessages)

route.delete('/', controller.deleteMessage)

module.exports = route
