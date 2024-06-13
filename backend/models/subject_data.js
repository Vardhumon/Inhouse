// models/subjectDataModel.js

import mongoose from 'mongoose';
const { Schema } = mongoose;

const subjectDataSchema = new Schema({
    subject_id: { type: Schema.Types.ObjectId, ref: 'Subject', index: true },
    course_objective: { type: Schema.Types.ObjectId, ref: 'CourseObjective' },
    course_outcome: { type: Schema.Types.ObjectId, ref: 'CourseOutcome' },
    co_po_pso_map: { type: Schema.Types.ObjectId, ref: "PsoModel" },
    perc_co_po_pso_map: {type : Schema.Types.ObjectId, ref: "PercentageModel"},
    co_po_pso_art:{type : Schema.Types.ObjectId, ref: "CourseArticulationModel"},
    markingScehme:{type: Schema.Types.ObjectId, ref:"MarkingModel"},
    student_details: [{ type: String}],
    direct_po_attain: [Number],
    indirect_po_attain: [Number],
    co_po_pso_attain: [Number]
});

const Subject_Data = mongoose.model('Subject_Data', subjectDataSchema);

export { Subject_Data };
