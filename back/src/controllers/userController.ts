import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import { convertVideo } from '../utils/videoConverter';
import { sendEmail } from '../utils/emailSender';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 9000;

// Controller to get ultrasound history
export const getUltrasoundHistory = async (req: Request, res: Response): Promise<any> => {
  const { patientId } = req.query; // Assuming the patientId is sent in the query of the request

  if (!patientId) {
    return res.status(400).json({ error: "Patient ID is required" });
  }

  try {
    // Send request to the ultrasound history API
    const response = await axios.get(`http://localhost:${PORT}/api/ultrasound-history/${patientId}`);

    // Return the data from the API
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching ultrasound history:`, error);
    return res.status(500).json({ error: `Failed to fetch ultrasound history` });
  }
};

export const getPatients = async (req: Request, res: Response): Promise<any> => {
  try {

    const response = await axios.get(`http://localhost:${PORT}/api/patients`);

    return res.status(200).json(response.data);

  } catch (error) {
    console.error(`Error fetching patiets:`, error);
    return res.status(500).json({ error: `Failed to fetch patients` });
  }

};

export const getDoctors = async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:${PORT}/api/doctors`);

    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ message: 'No se encontraron doctores.' });
    }

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error al obtener los doctores:`, error);
    return res.status(500).json({ error: `Fallo al obtener los doctores` });
  }
};

export const createDoc = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, identification } = req.body;

    // Validar que todos los campos están presentes
    if (!name || !email || !password || !identification) {
      res.status(400).json({ error: 'Todos los campos son obligatorios.' });
      return;
    }

    // Enviar los datos completos con Axios
    const response = await axios.post('http://localhost:9000/api/create-doctor', {
      name,
      email,
      password,
      identification,
    });

    res.status(201).json({ success: true, data: response.data });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error en Axios:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ error: error.response?.data || 'Error al crear el doctor' });
    } else {
      console.error('Error desconocido:', error);
      res.status(500).json({ error: 'Error desconocido al crear el doctor.' });
    }
  }
};

export const createConsulta = async (req: Request, res: Response): Promise<any> =>{
  const { email, patientId, doctorId, description } = req.body;
  const videoFile = req.file; // Access the uploaded AVI video file from the request
  const subject = "Video Ecografía4D";

  if (!videoFile) {
      return res.status(400).json({ error: `No video file provided` });
  }

  try {

      // Step 1: Convert AVI video to MP4
      const mp4FilePath = await convertVideo(videoFile.path); // Convert and get the MP4 file path

      // Step 2: Upload MP4 video as ultrasound
      const formData = new FormData();
      formData.append(`file`, fs.createReadStream(mp4FilePath));
      formData.append(`patient`, patientId);
      formData.append(`doctor`, doctorId);
      formData.append(`description`, description);

      const createUltrasoundResponse = await axios.post(`http://localhost:${PORT}/api/create-ultrasound`, formData, {
          headers: formData.getHeaders(),
      });

      const videoURL = createUltrasoundResponse.data.videoUrl;
      
      const emailBody =  `Gracias por tomar nuestro servicio.
        Enlace al video: ${videoURL}
        
        Descripción:  ${description}`

      // Clean up the converted MP4 file
      fs.unlinkSync(mp4FilePath);

      // Step 3: Return success with the video URL, and send email to user with URL.

      sendEmail(email,subject,emailBody);

      return res.status(200).json({
          success: true,
          videoURL:videoURL
      });

  } catch (error) {
      console.error(`Error creating patient or ultrasound:`, error);
      return res.status(500).json({ error: `An error occurred while creating patient or ultrasound.` });
  }
};

export const createPatientWithUltrasound = async (req: Request, res: Response): Promise<any> => {
  const { name, email, cedula, doctorId, description } = req.body;
  const videoFile = req.file; // Access the uploaded AVI video file from the request
  const subject = "Video Ecografía4D";

  if (!videoFile) {
      return res.status(400).json({ error: `No video file provided` });
  }

  try {
      // Step 1: Create patient

      const createPatientResponse = await axios.post(`http://localhost:${PORT}/api/create-patient`, {
          name:name,
          email:email,
          password: cedula,
          identification:cedula
      });
      const patientId = createPatientResponse.data.data._id;
      if (!patientId) {
          return res.status(500).json({ error: `Failed to create patient.` });
      }

      // Step 2: Convert AVI video to MP4
      const mp4FilePath = await convertVideo(videoFile.path); // Convert and get the MP4 file path

      // Step 3: Upload MP4 video as ultrasound
      const formData = new FormData();
      formData.append(`file`, fs.createReadStream(mp4FilePath));
      formData.append(`patient`, patientId);
      formData.append(`doctor`, doctorId);
      formData.append(`description`, description);

      const createUltrasoundResponse = await axios.post(`http://localhost:${PORT}/api/create-ultrasound`, formData, {
          headers: formData.getHeaders(),
      });

      const videoURL = createUltrasoundResponse.data.videoUrl;
      const emailBody =  `Gracias por tomar nuestro servicio.
        Enlace al video: ${videoURL}
        
        Descripción:  ${description}`
      // Clean up the converted MP4 file
      fs.unlinkSync(mp4FilePath);

      sendEmail(email,subject,emailBody);

      // Step 4: Return success with the video URL
      return res.status(200).json({
          success: true,
          videoURL:videoURL
      });

  } catch (error) {
      console.error(`Error creating patient or ultrasound:`, error);
      return res.status(500).json({ error: `An error occurred while creating patient or ultrasound.` });
  }
};
