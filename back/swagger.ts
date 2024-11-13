import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: '4D Ecografías API',
    description: 'Documentación de la API para la aplicación de ecografías 4D',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/index.ts']; // Cambia esto según tu archivo de rutas

swaggerAutogen()(outputFile, endpointsFiles, doc);