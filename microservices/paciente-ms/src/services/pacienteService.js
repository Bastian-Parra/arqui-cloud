// microservices/paciente-ms/src/services/pacienteService.js
const { getConnection } = require("../database/database");

async function getAllPacientes() {
  const connection = getConnection();
  const [rows] = await connection.execute("SELECT * FROM pacientes");
  return rows;
}

async function getPacienteById(id) {
  const connection = getConnection();
  const [rows] = await connection.execute(
    "SELECT * FROM pacientes WHERE id_paciente = ?",
    [id]
  );
  return rows[0];
}

async function createPaciente(paciente) {
  const connection = getConnection();
  const {
    rut,
    nombre,
    apellido,
    fecha_nacimiento,
    direccion,
    comuna,
    region,
    email,
    telefono,
    prevision_salud,
  } = paciente;

  if (!rut || !nombre || !apellido) {
    const error = new Error("RUT, nombre y apellido son obligatorios.");
    error.statusCode = 400;
    throw error;
  }

  try {
    const [result] = await connection.execute(
      "INSERT INTO pacientes (rut, nombre, apellido, fecha_nacimiento, direccion, comuna, region, email, telefono, prevision_salud) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        rut,
        nombre,
        apellido,
        fecha_nacimiento,
        direccion,
        comuna,
        region,
        email,
        telefono,
        prevision_salud,
      ]
    );
    return {
      id_paciente: result.insertId,
      message: "Paciente creado exitosamente.",
    };
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      const error = new Error("El RUT proporcionado ya existe.");
      error.statusCode = 409;
      throw error;
    }
    throw err;
  }
}

module.exports = {
  getAllPacientes,
  getPacienteById,
  createPaciente,
};
