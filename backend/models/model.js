// models/psoModel.js

import mongoose from 'mongoose';

// Define the schema
const psoSchema = new mongoose.Schema({
  co: String,
  po: [Number],
  pso: [Number],
});

// Create the model
const PsoModel = mongoose.model('Pso', psoSchema);

export default PsoModel;
