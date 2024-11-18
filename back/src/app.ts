import express from 'express';
import cors from 'cors';
import routes from './routes/index'; // Aquí están tus rutas

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middlewares generales
app.use(express.json());

// Rutas
app.use('/api', routes);

export default app;
