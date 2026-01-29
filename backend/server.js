require("dotenv").config();

const app = require("./app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 4000;

// Connexion DB
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Backend Meloko Web lancé sur le port ${PORT}`);
});
