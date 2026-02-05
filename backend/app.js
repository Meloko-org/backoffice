const express = require("express");
const cors = require("cors");

const app = express();

const ApiError = require("./src/utils/ApiError");

const { productsRoutes } = require("./src/routes");
const { adminProductsRoutes } = require("./src/routes");
const { adminMarketsRoutes } = require("./src/routes");
const { adminCategoriesRoutes } = require("./src/routes");
const { adminFamiliesRoutes } = require("./src/routes");
const { adminTypesRoutes } = require("./src/routes");


/**
 * Middlewares globaux
 */
app.use(cors({
  origin: "http://localhost:5173", // ou *
  credentials: true,
}));
app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/admin/products", adminProductsRoutes);
app.use("/admin/markets", adminMarketsRoutes);
app.use("/admin/categories", adminCategoriesRoutes);
app.use("/admin/families", adminFamiliesRoutes);
app.use("/admin/types", adminTypesRoutes);

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

/* Gestion des erreurs */
app.use((err, req, res, next) => {
  console.error(err); // utile en dev

  // Erreur métier connue
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      errors: err.errors ?? undefined,
    });
  }

  // Mode DEV ou routes admin
  const isDev = process.env.NODE_ENV !== "production";
  const isAdminRoute = req.originalUrl.startsWith("/admin");

  if (isDev || isAdminRoute) {
    return res.status(500).json({
      success: false,
      message: `Erreur backend >>  ${err.message}`,      // 👈 message réel
      stack: err.stack,          // 👈 optionnel
    });
  }

  // Prod public : Erreur inconnue / bug / crash
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});


module.exports = app;
