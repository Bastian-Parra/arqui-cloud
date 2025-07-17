import { Sequelize } from "sequelize";
import { logger } from "../utils/logger.js";
import dotenv from "dotenv";

dotenv.config();
// conexion para pacientes
export const sequelizePacientes = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_AUTH_USER || "root",
  password: process.env.DB_AUTH_PASSWORD || "auth_password",
  database: "db_pacientes",
  logging: false, // logs de produccion
  pool: {
    max: 3,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

// conexion para profesionales
export const sequelizeProfesionales = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_AUTH_USER || "root",
  password: process.env.DB_AUTH_PASSWORD || "auth_password",
  database: "db_profesionales",
  logging: false,
  pool: {
    max: 3,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

export const testConnections = async () => {
  try {
    await sequelizePacientes.authenticate();
    await sequelizeProfesionales.authenticate();
    logger.info("Conexiones a BD verificadas");
  } catch (error) {
    logger.error(" Error conexion a BD", error);
    throw error;
  }
}
