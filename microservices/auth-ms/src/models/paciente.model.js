import { DataTypes } from "sequelize";
import { sequelizePacientes } from "../config/database.js";

export const Paciente = sequelizePacientes.define(
  "Paciente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rut: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    clave_unica: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    prevision: {
      type: DataTypes.ENUM("FONASA", "ISAPRE", "NINGUNA"),
      defaultValue: "FONASA",
    },
  },
  {
    tableName: "pacientes",
    timestamps: false,
  }
);

Paciente.sync({ alter: true })
  .then(() => console.log("Modelo Paciente sincronizado"))
  .catch((err) => console.error("Error sincronizando modelo:", err));
