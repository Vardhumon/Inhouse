import mongoose from "mongoose";
const { Schema } = mongoose;

const FinalCoPoPsoSchema = new Schema({
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: "Subject"
    },
    subject_data_id: {
      type: Schema.Types.ObjectId,
      ref:"Subject_Data"
    },
    DirectPo80perc:[{
        po:{
          type:Array
        },
        pso:{
          type:Array
        }
      }],
    IndirectPo20perc:[{
        po:{
          type:Array
        },
        pso:{
          type:Array
        }
      }],
    COPOPSOAttainment:[{
        po:{
          type:Array
        },
        pso:{
          type:Array
        }
      }]
})

const FinalCoPoPso = mongoose.model("FinalCoPoPso",FinalCoPoPsoSchema)

export {FinalCoPoPso};