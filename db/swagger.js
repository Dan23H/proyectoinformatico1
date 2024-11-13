const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: '4D Ecografías API',
    description: 'Documentación de la API para la aplicación de ecografías 4D',
  },
  host: 'localhost:9000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js']; // Cambia esto según tu archivo de rutas

swaggerAutogen(outputFile, endpointsFiles, doc);