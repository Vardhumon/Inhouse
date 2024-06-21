import mongoose from "mongoose";
const { Schema } = mongoose;

const attainTableSchema = new Schema({
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: "Subject"
    },
    subject_data_id: {
      type: Schema.Types.ObjectId,
      ref:"Subject_Data"
    },
    TableName: String,
    data:[
        {po:{
            type:Array
        },
        pso:{
            type:Array
        }}
    ],
    average:{
        type:Array
    }
})

const AttainmentTable = mongoose.model("AttainmentTable", attainTableSchema)

export {AttainmentTable};