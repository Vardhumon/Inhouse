// controllers/subjectController.js
import { CourseArticulationModel } from '../models/courseArticulation.js';
import { CourseObjective } from '../models/course_objective.js';
import { CourseOutcome } from '../models/course_outcome.js';
import { PercentageModel } from '../models/percentage.js';
import { PsoModel } from '../models/poTable.js';
import { Subject } from '../models/subject.js';
import { Subject_Data } from '../models/subject_data.js';
import { createCoPo } from './copoController.js';
import { createCourseObjective } from './courseObjectiveController.js';
import { createCourseOutcome } from './courseOutcomeController.js';
import { createMarkingModel } from './markingController.js';
import { MarkingModel } from '../models/markingScheme.js';

const createSubject = async (subject_code, subject_name) => {
    try {

        const subject = new Subject({ subject_code, subject_name, batch_id: null });
        const subject_names = [];
        subject_names.push(subject_name);
        const courseObjective = await createCourseObjective(subject._id);
        const courseOutcome = await createCourseOutcome(subject._id);
        const {CoPo, CoPoPerc, CoPoArt} = await createCoPo(subject._id);
        const markingModel = await createMarkingModel(subject._id);
        // console.log(CoPoPerc._id);
        const subjectData = new Subject_Data({
            subject_id: subject._id,
            course_objective: courseObjective._id,
            course_outcome: courseOutcome._id,
            co_po_pso_map: CoPo._id,
            perc_co_po_pso_map: CoPoPerc._id,
            co_po_pso_art: CoPoArt._id,
            markingScehme:markingModel._id,
            student_details: [],
            direct_po_attain: [],
            indirect_po_attain: [],
            co_po_pso_attain: []
        });
        await subjectData.save();
        const subject_data_id = subjectData._id;
        await CourseOutcome.updateOne({ subject_id: subject._id }, { subject_name: subject.subject_name , subject_data_id: subjectData._id})
        await CourseObjective.updateOne({ subject_id: subject._id }, { subject_name: subject.subject_name , subject_data_id: subjectData._id})
        await PsoModel.updateOne({ subject_id: subject._id }, { subject_data_id: subjectData._id})
        await PercentageModel.updateOne({subject_id: subject._id}, {subject_data_id: subjectData._id})
        await CourseArticulationModel.updateOne({subject_id: subject._id}, {subject_data_id: subjectData._id})
        await MarkingModel.updateOne({subject_id: subject._id}, {subject_data_id : subjectData._id})

        subject.subject_data = subjectData._id

        await subject.save()
        const SubCodeAndDataId = {subject_code,subject_name,subject_data_id};

        return { subject, subjectData, subject_names,SubCodeAndDataId }; // Return both subject and subjectData
    } catch (error) {
        throw new Error(error.message); // Throw error to handle it outside this function
    }
};

export { createSubject };
