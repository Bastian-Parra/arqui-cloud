// microservices/profesional-service/src/services/profesionalService.js
// LÍNEA CORRECTA
const { getConnection } = require("../database/database");
async function getAllProfesionales() {
  const connection = getConnection();
  const [rows] = await connection.execute("SELECT * FROM profesionales");
  return rows;
}

async function getProfesionalById(id) {
  const connection = getConnection();
  const [rows] = await connection.execute(
    "SELECT * FROM profesionales WHERE id_profesional = ?",
    [id]
  );
  return rows[0];
}

async function createProfesional(profesional) {
  const connection = getConnection();
  const { rut, nombre, apellido, especialidad, email, telefono } = profesional;

  if (!rut || !nombre || !apellido) {
    const error = new Error("RUT, nombre y apellido son obligatorios.");
    error.statusCode = 400;
    throw error;
  }

  try {
    const [result] = await connection.execute(
      "INSERT INTO profesionales (rut, nombre, apellido, especialidad, email, telefono) VALUES (?, ?, ?, ?, ?, ?)",
      [rut, nombre, apellido, especialidad, email, telefono]
    );
    return {
      id_profesional: result.insertId,
      message: "Profesional creado exitosamente.",
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
  getAllProfesionales,
  getProfesionalById,
  createProfesional,
};
