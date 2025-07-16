// microservices/paciente-ms/src/routes/pacienteRoutes.js
const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteController");

router.get("/", pacienteController.getAllPacientes);
router.get("/:id", pacienteController.getPacienteById);
router.post("/", pacienteController.createPaciente);

module.exports = router;
