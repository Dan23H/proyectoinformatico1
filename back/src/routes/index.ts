import express from 'express';
import loginController from '../controllers/loginController';
import { getUltrasoundHistory, getPatients, createPatientWithUltrasound, createConsulta, createDoc } from '../controllers/userController';
import { uploadMiddleware } from '../utils/videoConverter';

const router = express.Router();


router.post('/login', 
     loginController     
);

router.get('/historial-paciente',
     getUltrasoundHistory
);

router.get('/obtener-pacientes',
     getPatients
);

router.post('/crear-paciente', 
     uploadMiddleware,
     createPatientWithUltrasound
);

router.post('/crear-consulta',
     uploadMiddleware,
     createConsulta
)

router.get('/crear-medico',
     createDoc
);

export default router;