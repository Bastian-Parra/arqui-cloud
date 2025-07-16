// microservices/profesional-service/src/routes/disponibilidadRoutes.js
const express = require("express");
const router = express.Router();
const disponibilidadController = require("../controllers/disponibilidadController");

router.get("/", disponibilidadController.getAllDisponibilidad); // Corresponde a GET /disponibilidad
router.get("/:id", disponibilidadController.getDisponibilidadByProfesionalId); // Corresponde a GET /disponibilidad/:id

module.exports = router;
