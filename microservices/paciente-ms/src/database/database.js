// microservices/paciente-ms/src/database/database.js
const logger = require("../utils/logger");
const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

let connection;

async function connectToDatabase() {
  try {
    connection = await mysql.createConnection(dbConfig);
    logger.info(
      `[Paciente-MS] Conectado a la base de datos MySQL: ${process.env.DB_NAME}`
    );
  } catch (err) {
    logger.error(
      "[Paciente-MS] Error al conectar a la base de datos:",
      err.message,
      err.stack
    );
    logger.error(
      "Asegúrate de que el servidor MySQL esté ejecutándose y los datos de conexión en .env sean correctos."
    );
    process.exit(1);
  }
}

function getConnection() {
  if (!connection) {
    throw new Error("Database connection not established.");
  }
  return connection;
}

process.on("SIGINT", async () => {
  if (connection) {
    await connection.end();
    logger.info("[Paciente-MS] Conexión a la base de datos cerrada.");
  }
  process.exit(0);
});

module.exports = { connectToDatabase, getConnection };
