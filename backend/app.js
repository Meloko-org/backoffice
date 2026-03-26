const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");

require("dotenv").config();

const app = express();



const { ApiError } = require("./src/utils/ApiError");

const { productsRoutes } = require("./src/routes");
const { adminProductsRoutes } = require("./src/routes");
const { adminMarketsRoutes } = require("./src/routes");
const { adminCategoriesRoutes } = require("./src/routes");
const { adminFamiliesRoutes } = require("./src/routes");
const { adminTypesRoutes } = require("./src/routes");
const { adminTagCategoriesRoutes } = require("./src/routes");
const { adminOrdersRoutes } = require("./src/routes");
const { adminUsersRoutes } = require("./src/routes");
const { adminRolesRoutes } = require("./src/routes");
const { adminProducersRoutes } = require("./src/routes");
const { adminDashboardRoutes } = require("./src/routes");




require("./src/models/index");



/**
 * Middlewares globaux
 */
app.use(cors({
  origin: "http://localhost:5173", // ou *
  credentials: true,
}));
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/products", productsRoutes);
app.use("/admin/products", adminProductsRoutes);
app.use("/admin/markets", adminMarketsRoutes);
app.use("/admin/categories", adminCategoriesRoutes);
app.use("/admin/families", adminFamiliesRoutes);
app.use("/admin/types", adminTypesRoutes);
app.use("/admin/tagCategories", adminTagCategoriesRoutes);
app.use("/admin/orders", adminOrdersRoutes);
app.use("/admin/users", adminUsersRoutes);
app.use("/admin/roles", adminRolesRoutes);
app.use("/admin/producers", adminProducersRoutes);

app.use("/admin/dashboard", adminDashboardRoutes);



/**
 * Route de test
 */
app.get("/auth-test", (req, res) => {

  console.log("Authorization:", req.headers.authorization);
  console.log("Auth:", req.auth);

  res.json({
    auth: req.auth || null
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
      fieldErrors: err.fieldErrors ?? undefined,
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
