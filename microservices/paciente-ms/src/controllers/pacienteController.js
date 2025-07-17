// microservices/paciente-ms/src/controllers/pacienteController.js
const { logger } = require("../utils/logger");
const pacienteService = require("../services/pacienteService");

async function getAllPacientes(req, res) {
  try {
    const pacientes = await pacienteService.getAllPacientes();
    res.json(pacientes);
  } catch (err) {
    logger.error("[Paciente-MS] Error al obtener pacientes:", err.message);
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener pacientes." });
  }
}

async function getPacienteById(req, res) {
  try {
    const paciente = await pacienteService.getPacienteById(req.params.id);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado." });
    }
    res.json(paciente);
  } catch (err) {
    logger.error(
      "[Paciente-MS] Error al obtener paciente por ID:",
      err.message
    );
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener paciente." });
  }
}

async function createPaciente(req, res) {
  try {
    const result = await pacienteService.createPaciente(req.body);
    res.status(201).json(result);
  } catch (err) {
    logger.error("[Paciente-MS] Error al crear paciente:", err.message);
    res
      .status(err.statusCode || 500)
      .json({
        message: err.message || "Error interno del servidor al crear paciente.",
      });
  }
}

module.exports = {
  getAllPacientes,
  getPacienteById,
  createPaciente,
};
