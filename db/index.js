const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const userRoutes = require('./routes/userRoutes');
const ultrasoundRoutes = require('./routes/ultrasoundRoutes');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//conectar a la database
connectDB();

app.use(express.json());

//rutas
app.use('/api/users', userRoutes);
app.use('/api/ultrasounds', ultrasoundRoutes);

//manejo de errores
app.use(errorHandler);
app.use(notFound);

//Inicializacion del servidor
app.listen(PORT, () => console.log (`Servidor corriendo en el puerto ${PORT}`))