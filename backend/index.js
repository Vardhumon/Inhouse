// app.js

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 8000;

const app = express();


const router = express.Router();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true // Allow sending cookies
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())

// Routes
app.use('/', router);
app.use('/', authRoutes);

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/temp')
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.error('Error connecting to the database:', err));

export default app;
