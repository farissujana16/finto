require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
const isVercel = !!process.env.VERCEL;

const PORT = process.env.PORT || (isProduction ? undefined : 5000);
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/openapi.json", (req, res) => res.json(swaggerSpec));

const appName = process.env.APP_NAME || "Scalar";
app.get("/scalar", (req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>${appName} API Docs</title>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <style>
          body {
            margin: 0;
          }
        </style>
      </head>

      <body>
        <script
          id="api-reference"
          data-url="/openapi.json"
          src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"
        ></script>
      </body>
    </html>
  `);
});

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const categoriesRoutes = require("./routes/categoriesRoutes");
const accountRoutes = require("./routes/accountRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const goalRoutes = require("./routes/goalRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
// Tambahkan route otomatis di sini
app.use("/dashboard", dashboardRoutes);
app.use("/transaction", transactionRoutes);
app.use("/goal", goalRoutes);
app.use("/budget", budgetRoutes);
app.use("/account", accountRoutes);
app.use("/categories", categoriesRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: isProduction ? "Internal Server Error" : err.message,
  });
});

if (!isVercel) {
  app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
    if (!isProduction) {
      console.log(`Swagger berjalan pada url http://localhost:${PORT}/docs`);
      console.log(`Scalar berjalan pada url http://localhost:${PORT}/scalar`);
    }
  });
}

module.exports = app;
