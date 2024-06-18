import mongoose from "mongoose";
const { Schema } = mongoose;

const IndirectPoSchema = new Schema({
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: "Subject"
    },
    subject_data_id: {
      type: Schema.Types.ObjectId,
      ref:"Subject_Data"
    },
    values:{
        type:Array
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
      }],
    averages:{
        type:Array
    }
})

const IndirectPo = mongoose.model("IndirectPo", IndirectPoSchema)

export {IndirectPo}