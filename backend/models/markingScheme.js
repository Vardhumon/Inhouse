import mongoose from 'mongoose';
const { Schema } = mongoose;

const MarkingSchema = new Schema({
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: "Subject"
    },
    subject_data_id:{
        type: Schema.Types.ObjectId,
        ref:"Subject_Data"
    },
    data:{
        ese:{type:Number},
        midsem:{type:Number},
        pr_or:{type:Number},
        termwork:{type:Number},
        Total:{type:Number},
        COMarksdata:[{
            co:{type:String},
            utmarks:{type:Number},
            classwork:{type:Number},
            total:{type:Number}
        }]
    }
})

const MarkingModel = mongoose.model("MarkingModel",MarkingSchema)

export {MarkingModel};