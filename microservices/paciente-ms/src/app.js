// microservices/paciente-ms/src/app.js
const express = require("express");
const cors = require("cors");
const pacienteRoutes = require("./routes/pacienteRoutes");
const historialRoutes = require("./routes/historialRoutes");

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
app.use("/pacientes", pacienteRoutes);
app.use("/historial", historialRoutes);

// Nested route for patient history
app.use("/pacientes/:id/historial", (req, res, next) => {
  req.params.pacienteId = req.params.id;
  historialRoutes(req, res, next);
});

module.exports = app;
