import { sequelizeProfesionales } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Profesional = sequelizeProfesionales.define('Profesional', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rut: {
    type: DataTypes.STRING(12),
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  clave_unica: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'profesionales',
  timestamps: false
});

Profesional.sync({ alter: true })
  .then(() => console.log('Modelo Profesional sincronizado'))
  .catch(err => console.error('Error sincronizando modelo:', err));