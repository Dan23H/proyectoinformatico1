import { Request, Response } from 'express';
import axios from 'axios'
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT_DB || 9000;


const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password are provided
    if (!email || !password) {
      res.status(400).json({ error: `Email and password are required` });
      return;
    }

    // 2. Send email to external API to get the user`s hashed password and role
    const apiResponse = await axios.post(`http://localhost:${PORT}/api/login`, { email });
    // 3. Check if response data contains role and passwordHash
    const { id, role, password :dbpass } = apiResponse.data;

    if (!role || !dbpass) {
      res.status(500).json({ error: `Invalid response from the login service` });
      return;
    }

    // 4. Compare the hashed passwords
    if (password == dbpass) {
      // 5. Return success response with user`s role
      res.status(200).json({ status: `OK`, role, id });
    } else {
      // Passwords do not match
      res.status(401).json({ error: `Invalid password` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `An error occurred while processing the login request` });
  }
};

export default loginController;