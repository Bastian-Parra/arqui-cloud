import { DataTypes } from "sequelize";
import { sequelizePacientes } from "../config/database.js";

export const Paciente = sequelizePacientes.define(
  "Paciente",
  {
    id_paciente: {
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
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    comuna: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    region: {
      type: DataTypes.STRING(),
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    prevision_salud: {
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
