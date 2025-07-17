import { logger } from "../utils/logger.js";
import { DataTypes } from "sequelize";
import { sequelizePacientes } from "../config/database.js";

export const Paciente = sequelizePacientes.define("Paciente", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  rut: {
    type: DataTypes.STRING(12),
    allowNull: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  apellido: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: true
  },
  direccion: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  comuna: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  region: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  prevision_salud: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  clave_unica: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  prevision: {
    type: DataTypes.ENUM("FONASA", "ISAPRE", "NINGUNA"),
    defaultValue: "FONASA",
    allowNull: true
  }
}, {
  tableName: "pacientes",
  timestamps: false
});

Paciente.sync({ alter: true })
  .then(() => logger.info("Modelo Paciente sincronizado"))
  .catch((err) => {
    logger.error("Error sincronizando modelo:");
    logger.error(err.message);
    logger.error(err.stack);
  });
