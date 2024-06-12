import mongoose, { Mongoose } from "mongoose";
const {Schema} = mongoose;

const CourseArticulationSchema = new Schema({
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
})

const CourseArticulationModel = mongoose.model("CourseArticulationModel", CourseArticulationSchema)

export {CourseArticulationModel};