// microservices/paciente-ms/src/routes/historialRoutes.js
const express = require("express");
const router = express.Router();
const historialController = require("../controllers/historialController");

router.get("/", historialController.getAllHistorial); // Corresponde a GET /historial
router.get("/:id", historialController.getHistorialByPacienteId); // Corresponde a GET /historial/:id

module.exports = router;
// asdasdasd
