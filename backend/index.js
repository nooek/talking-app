const server = require("./server")

server.listen(process.env.PORT, () => {
    console.log("Listening to port 3001")
})