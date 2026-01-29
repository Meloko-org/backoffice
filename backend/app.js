const express = require("express");
const cors = require("cors");

const app = express();

const { productsRoutes } = require("./src/routes");
const { adminProductsRoutes } = require("./src/routes");



/**
 * Middlewares globaux
 */
app.use(cors({
  origin: "http://localhost:5173", // ou *
  credentials: true,
}));
app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/admin/products", adminProductsRoutes)

/**
 * Route de test
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "meloko-web-backend",
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;
