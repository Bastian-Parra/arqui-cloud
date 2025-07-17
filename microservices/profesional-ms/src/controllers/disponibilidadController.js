// microservices/profesional-service/src/controllers/disponibilidadController.js
const { logger } = require("../utils/logger");
const disponibilidadService = require("../services/disponibilidadService");

async function getAllDisponibilidad(req, res) { // Obtiene toda la disponibilidad
  try {
    const disponibilidad = await disponibilidadService.getAllDisponibilidad();
    res.json(disponibilidad);
  } catch (err) {
    logger.error(
      "[Profesional-MS] Error al obtener la disponibilidad:",
      err.message
    );
    res.status(500).json({
      message: "Error interno del servidor al obtener la disponibilidad.",
    });
  }
}

async function getDisponibilidadByProfesionalId(req, res) {
  try {
    const disponibilidad =
      await disponibilidadService.getDisponibilidadByProfesionalId(
        req.params.id
      );
    res.json(disponibilidad);
  } catch (err) {
    logger.error(
      "[Profesional-MS] Error al obtener la disponibilidad por profesional:",
      err.message
    );
    res.status(500).json({
      message:
        "Error interno del servidor al obtener la disponibilidad del profesional.",
    });
  }
}

module.exports = {
  getAllDisponibilidad,
  getDisponibilidadByProfesionalId,
};
