import mongoose from 'mongoose';
const { Schema } = mongoose;

const coAttainIECWSchema = new Schema({
    CO1: {
        UT1: { type: Number },
        CW: { type: Number },
        Total: { type: Number }
    },
    CO2: {
        UT1: { type: Number },
        CW: { type: Number },
        Total: { type: Number }
    },
    CO3: {
        UT2: { type: Number },
        CW: { type: Number },
        Total: { type: Number }
    },
    CO4: {
        UT2: { type: Number },
        CW: { type: Number },
        Total: { type: Number }
    },
    CO5: {
        CW: { type: Number },
        Total: { type: Number }
    },
    CO6: {
        CW: { type: Number },
        Total: { type: Number }
    }
});

const coAttainUESchema = new Schema({
    ESE: { type: Number, },
    MidSem: { type: Number, },
    PR_OR: { type: Number, },
    TermWork: { type: Number, },
    Total: { type: Number, }
});

const studentDetailsSchema = new Schema({
    roll_no: { type: String ,unique:true},
    prn: { type: String },
    name: { type: String },
    co_attain_UE: { type: coAttainUESchema },
    co_attain_IE_CW: { type: coAttainIECWSchema}
});

const StudentDetail = mongoose.model('StudentDetail', studentDetailsSchema);

export { StudentDetail };