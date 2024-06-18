import mongoose, { Mongoose } from "mongoose";
const {Schema} = Mongoose;

const DirectPoSchema = new Schema({
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: "Subject"
    },
    subject_data_id: {
      type: Schema.Types.ObjectId,
      ref:"Subject_Data"
    },
    InternalExam: {
        type:Array
    },
    UniversityExam:{
        type:Array
    },
    percInternalExam: {
        type:Array
    },
    percUniversityExam:{
        type:Array
    },
    DirectPO:{
        type:Array
    }
});

const DirectPOAttainment = mongoose.model("DirectPoAttainment",DirectPoSchema);

export{DirectPOAttainment}