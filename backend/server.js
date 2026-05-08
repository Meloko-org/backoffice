require("dotenv").config()

const http = require("http")
const app = require("./app")
const connectDB = require("./src/config/db")
const { initSocket } = require("./src/lib/socket")

const PORT = process.env.PORT || 4000

connectDB()

const server = http.createServer(app)

initSocket(server)

server.listen(PORT, () => {
  console.log(`🚀 Backend Meloko Web lancé sur le port ${PORT}`)
})
