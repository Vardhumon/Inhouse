import mongoose from 'mongoose';
const { Schema } = mongoose;

const percentageSchema = new Schema({
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

const PercentageModel = mongoose.model('PercentageModel', percentageSchema);

export {PercentageModel};