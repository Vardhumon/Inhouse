import mongoose from "mongoose";
const { Schema } = mongoose;

const DirectPoSchema = new Schema({
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: "Subject"
    },
    subject_data_id: {
      type: Schema.Types.ObjectId,
      ref:"Subject_Data"
    },
    InternalExam: [{
        po:{
            type:Array
        },
        pso:{
            type:Array
        }
    }],
    UniversityExam:[{
        po:{
            type:Array
        },
        pso:{
            type:Array
        }
    }],
    percInternalExam:[{
        po:{
            type:Array
        },
        pso:{
            type:Array
        }
    }],
    percUniversityExam:[{
        po:{
            type:Array
        },
        pso:{
            type:Array
        }
    }],
    DirectPO:[{
        po:{
            type:Array
        },
        pso:{
            type:Array
        }
    }]
});

const DirectPOAttainment = mongoose.model("DirectPoAttainment",DirectPoSchema);

export{DirectPOAttainment}