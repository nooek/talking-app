const express = require("express")
const route = express.Router()
const controller = require("../../controllers/MessagesController")

route.post('/', controller.createMessage);

route.get('/:id', controller.getMessages);

route.delete('/', controller.deleteMessage);

route.post('/clearchat', controller.clearChat);

route.get('/find/:id/:searchKey/:friendId', controller.findMessage);

route.get('/contactmessage/:friendId/:id/:page', controller.getContactMessage);

module.exports = route
