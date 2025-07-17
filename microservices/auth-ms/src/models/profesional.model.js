import { logger } from "../utils/logger.js";
import { sequelizeProfesionales } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Profesional = sequelizeProfesionales.define('Profesional', {
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
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  especialidad: {
    type: DataTypes.STRING(100),
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
  activo: {
    type: DataTypes.TINYINT,
    allowNull: true
  },
  clave_unica: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'profesionales',
  timestamps: false
});

Profesional.sync({ alter: true })
  .then(() => logger.info('Modelo Profesional sincronizado'))
  .catch(err => {
    logger.error('Error sincronizando modelo:');
    logger.error(err.message);
    logger.error(err.stack);
  });
