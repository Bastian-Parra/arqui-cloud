// microservices/profesional-service/src/controllers/profesionalController.js
const profesionalService = require("../services/profesionalService");

async function getAllProfesionales(req, res) {
  try {
    const profesionales = await profesionalService.getAllProfesionales();
    res.json(profesionales);
  } catch (err) {
    console.error(
      "[Profesional-MS] Error al obtener profesionales:",
      err.message
    );
    res
      .status(500)
      .json({
        message: "Error interno del servidor al obtener profesionales.",
      });
  }
}

async function getProfesionalById(req, res) {
  try {
    const profesional = await profesionalService.getProfesionalById(
      req.params.id
    );
    if (!profesional) {
      return res.status(404).json({ message: "Profesional no encontrado." });
    }
    res.json(profesional);
  } catch (err) {
    console.error(
      "[Profesional-MS] Error al obtener profesional por ID:",
      err.message
    );
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener profesional." });
  }
}

async function createProfesional(req, res) {
  try {
    const result = await profesionalService.createProfesional(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("[Profesional-MS] Error al crear profesional:", err.message);
    res.status(err.statusCode || 500).json({
      message:
        err.message || "Error interno del servidor al crear profesional.",
    });
  }
}

module.exports = {
  getAllProfesionales,
  getProfesionalById,
  createProfesional,
};
