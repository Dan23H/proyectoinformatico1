import express from 'express';
import videoController from '../controllers/videoController';
import loginController from '../controllers/loginController';
import { getUltrasoundHistory } from '../controllers/historialPaciente';

const router = express.Router();

// POST route to handle file upload and conversion
router.post('/convert',
     videoController.uploadMiddleware,
     videoController.convertVideo
);

router.post('/login', 
     loginController     
);

router.get('/historial-paciente',
     getUltrasoundHistory
);

router.get('/obtener-pacientes',

);

router.post('/crear-paciente', 

);

router.get('/obtener-paciente',

);

router.get('/crear-medico',

);

export default router;