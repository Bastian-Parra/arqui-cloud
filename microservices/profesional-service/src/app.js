// microservices/profesional-service/src/app.js
const express = require("express");
const cors = require("cors");
const profesionalRoutes = require("./routes/profesionalRoutes");
const disponibilidadRoutes = require("./routes/disponibilidadRoutes");

const app = express();

// Middleware
app.use(express.json());
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Routes
app.use("/profesionales", profesionalRoutes);
app.use("/disponibilidad", disponibilidadRoutes);

// Nested route for professional availability
app.use("/profesionales/:id/disponibilidad", (req, res, next) => {
  req.params.profesionalId = req.params.id;
  disponibilidadRoutes(req, res, next);
});

module.exports = app;
