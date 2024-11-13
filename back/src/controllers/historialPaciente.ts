import { Request, Response } from 'express';
import axios from 'axios';

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