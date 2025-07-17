import { logger } from "../utils/logger.js";
import { authenticate } from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const { rut, password } = req.body;

    if (!rut || !password) {
      return res.status(400).json({ error: "RUT y contraseña son requeridos" });
    }

    const usuario = await authenticate(rut, password);

    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas"});
    }

    const token = generateToken(usuario);

    res.json({
      success: true,
      token,
      user: usuario,
    });
  } catch (error) {
    logger.error("Error en el login", error);
    logger.error(error.message);
    logger.error(error.stack);
  
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
