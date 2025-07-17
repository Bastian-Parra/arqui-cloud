// microservices/paciente-ms/src/controllers/historialController.js
const { logger } = require("../utils/logger");
const historialService = require("../services/historialService");

async function getAllHistorial(req, res) {
  try {
    const historial = await historialService.getAllHistorial();
    res.json(historial);
  } catch (err) {
    logger.error(
      "[Paciente-MS] Error al obtener historial médico:",
      err.message
    );
    res.status(500).json({
      message: "Error interno del servidor al obtener historial médico.",
    });
  }
}

async function getHistorialByPacienteId(req, res) {
  try {
    const historial = await historialService.getHistorialByPacienteId(
      req.params.id
    );
    res.json(historial);
  } catch (err) {
    logger.error(
      "[Paciente-MS] Error al obtener historial médico por paciente:",
      err.message
    );
    res.status(500).json({
      message:
        "Error interno del servidor al obtener historial médico del paciente.",
    });
  }
}

module.exports = {
  getAllHistorial,
  getHistorialByPacienteId,
};
