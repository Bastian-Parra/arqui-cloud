import express from "express";
import { logger } from "./src/utils/logger.js";
import cors from 'cors'
import authRoutes from './src/routes/auth.routes.js'

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Auth-MS running on port ${PORT}`);
});