import { Request, Response } from 'express';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import { convertVideo } from '../utils/videoConverter';
import { sendEmail } from '../utils/emailSender';

// Controller to get ultrasound history
export const getUltrasoundHistory = async (req: Request, res: Response): Promise<any> => {
  const { patientId } = req.body; // Assuming the patientId is sent in the body of the request

  if (!patientId) {
    return res.status(400).json({ error: "Patient ID is required" });
  }

  try {
    // Send request to the ultrasound history API
    const response = await axios.get(`http://localhost:3000/api/ultrasound-history/${patientId}`);

    // Return the data from the API
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching ultrasound history:', error);
    return res.status(500).json({ error: 'Failed to fetch ultrasound history' });
  }
};

export const getPatients = async (req: Request, res: Response): Promise<any> => {
  try {

    const response = await axios.get('http://localhost:3000/api/patients');

    return res.status(200).json(response.data);

  } catch (error) {
    console.error('Error fetching patiets:', error);
    return res.status(500).json({ error: 'Failed to fetch patients' });
  }

};

export const createConsulta = async (req: Request, res: Response): Promise<any> =>{
  const { email,patientId, doctorId, description } = req.body;
  const videoFile = req.file; // Access the uploaded AVI video file from the request
  const subject = "Video Ecografía4D";

  if (!videoFile) {
      return res.status(400).json({ error: 'No video file provided' });
  }

  try {

      // Step 1: Convert AVI video to MP4
      const mp4FilePath = await convertVideo(videoFile.path); // Convert and get the MP4 file path

      // Step 2: Upload MP4 video as ultrasound
      const formData = new FormData();
      formData.append('file', fs.createReadStream(mp4FilePath));
      formData.append('patient', patientId);
      formData.append('doctor', doctorId);
      formData.append('description', description);

      const createUltrasoundResponse = await axios.post('http://localhost:3000/api/create-ultrasound', formData, {
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
      console.error('Error creating patient or ultrasound:', error);
      return res.status(500).json({ error: 'An error occurred while creating patient or ultrasound.' });
  }
};

export const createPatientWithUltrasound = async (req: Request, res: Response): Promise<any> => {
  const { name, email, cedula, doctorId, description } = req.body;
  const videoFile = req.file; // Access the uploaded AVI video file from the request
  const subject = "Video Ecografía4D";

  if (!videoFile) {
      return res.status(400).json({ error: 'No video file provided' });
  }

  try {
      // Step 1: Create patient

      const createPatientResponse = await axios.post('http://localhost:3000/api/create-patient', {
          name:name,
          email:email,
          password: cedula
      });
      const patientId = createPatientResponse.data.data._id;
      if (!patientId) {
          return res.status(500).json({ error: 'Failed to create patient.' });
      }

      // Step 2: Convert AVI video to MP4
      const mp4FilePath = await convertVideo(videoFile.path); // Convert and get the MP4 file path

      // Step 3: Upload MP4 video as ultrasound
      const formData = new FormData();
      formData.append('file', fs.createReadStream(mp4FilePath));
      formData.append('patient', patientId);
      formData.append('doctor', doctorId);
      formData.append('description', description);

      const createUltrasoundResponse = await axios.post('http://localhost:3000/api/create-ultrasound', formData, {
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
      console.error('Error creating patient or ultrasound:', error);
      return res.status(500).json({ error: 'An error occurred while creating patient or ultrasound.' });
  }
};
