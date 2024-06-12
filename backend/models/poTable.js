// models/psoModel.js

import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the schema
const psoSchema = new mongoose.Schema({
  subject_id: {
    type: Schema.Types.ObjectId,
    ref: "Subject"
},
subject_data_id: {
  type: Schema.Types.ObjectId,
  ref:"Subject_Data"
},
  data : [{
    co:{
      type:String
    },
    po:{
      type:Array
    },
    pso:{
      type:Array
    }
  }]
});

// Create the model
const PsoModel = mongoose.model('PsoModel', psoSchema);

export  {PsoModel};
