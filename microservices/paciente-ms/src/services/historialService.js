// microservices/paciente-ms/src/services/historialService.js
const { getConnection } = require("../database/database");

async function getAllHistorial() {
  const connection = getConnection();
  const [rows] = await connection.execute("SELECT * FROM historialmedico");
  return rows;
}

async function getHistorialByPacienteId(pacienteId) {
  const connection = getConnection();
  const [rows] = await connection.execute(
    "SELECT * FROM historialmedico WHERE id_paciente = ?",
    [pacienteId]
  );
  return rows;
}

module.exports = {
  getAllHistorial,
  getHistorialByPacienteId,
};
