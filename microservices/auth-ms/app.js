import express from "express";
<<<<<<< HEAD
import cors from 'cors';
import authRoutes from './src/routes/auth.routes.js';
=======
import { logger } from "./src/utils/logger.js";
import cors from 'cors'
import authRoutes from './src/routes/auth.routes.js'
>>>>>>> f2ef2b885b3076837deb9c04d54fa684fe06fa2c

const app = express();

// Configuración robusta de CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para log de requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas principales
app.use('/auth', authRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
<<<<<<< HEAD
const server = app.listen(PORT, () => {
  console.log(`Auth-MS running on port ${PORT}`);
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
  console.log('Recibido SIGTERM. Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Recibido SIGINT. Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

// Manejadores globales de errores
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // No salir inmediatamente para permitir que Docker reinicie
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
=======
app.listen(PORT, () => {
  logger.info(`Auth-MS running on port ${PORT}`);
});
>>>>>>> f2ef2b885b3076837deb9c04d54fa684fe06fa2c
