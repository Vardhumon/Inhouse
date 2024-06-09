import mongoose from 'mongoose';
const { Schema } = mongoose;

const StudentSchema = new Schema({
    prn_number: { type: String, required: true },
    roll_number: { type: String, required: true, index: true },
    name: { type: String, required: true }
});

const BatchStudentSchema = new Schema({
    batchYear: { type: String, required: true },
    studentdata: { type: [[StudentSchema]], required: true } // Nested array of student objects
});

const BatchStudents = mongoose.model('BatchStudents', BatchStudentSchema);

export { BatchStudents };
