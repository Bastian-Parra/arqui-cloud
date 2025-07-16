// microservices/profesional-service/src/services/disponibilidadService.js
const { getConnection } = require("../database/database");
async function getAllDisponibilidad() {
  const connection = getConnection();
  const [rows] = await connection.execute(
    "SELECT * FROM disponibilidad_profesional"
  );
  return rows;
}

async function getDisponibilidadByProfesionalId(profesionalId) {
  const connection = getConnection();
  const [rows] = await connection.execute(
    "SELECT * FROM disponibilidad_profesional WHERE id_profesional = ?",
    [profesionalId]
  );
  return rows;
}

module.exports = {
  getAllDisponibilidad,
  getDisponibilidadByProfesionalId,
};
