import { logger } from "../utils/logger.js";
import jwt from 'jsonwebtoken'

const SECRET_KEY = '3a43d17a82e01deb8e3f4e1efabfeea4';
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      rut: user.rut,
      role: user.tipo || user.role
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    logger.error("Token inválido:", err);
    return null;
  }
}
