// routes.js

import express from 'express';
import PsoModel from '../models/model.js';
import PercentageModel from '../models/percentage.js';

const router = express.Router();

// Fetch all PSOs
// router.get('/', async (req, res) => {
//   try {
//     const data = await PsoModel.find({});
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data from MongoDB:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Save or update a PSO
// router.post('/save', async (req, res) => {
//   try {
//     const { co, po, pso } = req.body;

//     if (!co || !po || !pso) {
//       return res.status(400).json({ error: 'Invalid request data' });
//     }

//     let existingPso = await PsoModel.findOne({ co });

//     if (existingPso) {
//       existingPso.po = po;
//       existingPso.pso = pso;
//     } else {
//       existingPso = new PsoModel({ co, po, pso });
//     }

//     await existingPso.save();

//     res.status(201).json({ message: 'PSO saved successfully' });
//   } catch (error) {
//     console.error('Error saving data to MongoDB:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

export default router;
