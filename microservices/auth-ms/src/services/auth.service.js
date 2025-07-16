import bcrypt from "bcrypt";
import { Paciente } from "../models/paciente.model.js";
import { Profesional } from "../models/profesional.model.js";
import { normalizePassword } from "../utils/normalizePassword.js";

// Mock de contraseñas en memoria
const passwordMap = new Map();
const SALT_ROUNDS = 10;

const initPasswordMock = async () => {
  // Cargar todos los RUTs y generar contraseñas mock
  const profesionales = await Profesional.findAll({
    attributes: ["id", "rut", "nombre"],
  });

  for (const prof of profesionales) {
    const password = `${normalizePassword(prof.nombre)}${normalizePassword(
      prof.apellido
    )}123`;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    passwordMap.set(`profesional_${prof.rut}`, {
      hash,
      plain: password,
    });
  }

  const pacientes = await Paciente.findAll({
    attributes: ["id", "rut", "nombre"],
  });

  for (const pac of pacientes) {
    const password = `${normalizePassword(pac.nombre)}${normalizePassword(
      pac.apellido
    )}123`;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    passwordMap.set(`paciente_${pac.rut}`, {
      hash,
      plain: password,
    });
  }
};

const authenticate = async (rut, password) => {
  try {
    // buscar como profesional
    const hashProfesional = passwordMap.get(`profesional_${rut}`);

    if (hashProfesional) {
      const match = await bcrypt.compare(password, hashProfesional.hash);
      if (match) {
        const profesional = await Profesional.findOne({
          where: { rut },
          attributes: ["id", "rut", "nombre", "apellido", "especialidad"],
        });
        return { ...profesional.get(), tipo: "profesional" };
      }
    }

    // buscar como paciente
    const hashPaciente = passwordMap.get(`paciente_${rut}`);

    if (hashPaciente) {
      const match = await bcrypt.compare(password, hashPaciente.hash);
      if (match) {
        const paciente = await Paciente.findOne({
          where: { rut },
          attributes: ["id", "rut", "nombre", "apellido", "prevision"],
        });
        return { ...paciente.get(), tipo: "paciente" };
      }
    }

    return null;
  } catch (error) {
    console.log("Error en autenticacion:", error);
    throw error;
  }
};

(async () => {
  try {
    await initPasswordMock();
    console.log("Servicio de autenticación listo");
    const testRut = "10.987.654-3"; // Lonee Diggle
    if (passwordMap.has(`profesional_${testRut}`)) {
      console.log("\nPrueba automática:");
      console.log(`RUT: ${testRut}`);
      console.log(
        `Contraseña: ${
          passwordMap.get(`profesional_${testRut}`).plain
        }`
      );
    }
  } catch (error) {
    console.error(error);
    process.exit(1); // Salir si no puede inicializar
  }
})();


export { authenticate, initPasswordMock };
