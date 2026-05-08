let io = null

function initSocket(server) {
  io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  })

  io.on("connection", (socket) => {
    console.log("🔌 Client connecté:", socket.id)
  })

  return io
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io non initialisé")
  }
  return io
}

module.exports = {
  initSocket,
  getIO,
}