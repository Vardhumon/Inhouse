// models/batchModel.js

import mongoose from 'mongoose';
const { Schema } = mongoose;

const batchSchema = new Schema({
    batchyear: { type: String, required: true },
    subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
    subCodeAndDataIds: [{ type:Array}],
    subject_names: { type: Array }
});

const Batch = mongoose.model('Batch', batchSchema);

export { Batch };
