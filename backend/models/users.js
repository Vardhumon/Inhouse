// models/userModel.js

import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    psoId: {
        type: Schema.Types.ObjectId,
        ref: 'Pso' // Reference to PSO model
    },
    percentageId: {
        type: Schema.Types.ObjectId,
        ref: 'PercentageModel' // Reference to Percentage model
    }
});

const User = mongoose.model('User', userSchema);

export { User };
