import express from "express";
import cors from 'cors'
import authRoutes from './src/routes/auth.routes.js'

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth-MS running on port ${PORT}`);
});