// models/teacherModel.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    subject: {
        type: Array,
        required: true
    }
});

// Create the model
const Teacher = mongoose.model('Teacher', teacherSchema);

export { Teacher };
