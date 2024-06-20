import { CourseObjective } from '../models/course_objective.js';

const createCourseObjective = async (subject_id) => {
    try {
        const courseObjective = new CourseObjective({ subject_id });
        await courseObjective.save();
        return courseObjective;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateCourseObjective = async (req,res) => {
    try {

        //enter subject_data_id of the Objective you want to update
        const subject_data_id = "6674386cabe5a4b207fa6613";


        // const {subject_data_id} = req.params;
        const {objectives} = req.body;
        const CO = await CourseObjective.updateOne({subject_data_id: subject_data_id},{objectives: objectives })
        
        return res.status(200).json(["Course Objective Updated Succesfully!",CO])
    } catch (error) {
        return res.status(400).json(["Course Objective Update UnSuccesfull!", error.message])
        
    }
}

const getCourseObjectives= async(req,res) => {
    try {
        const subject_data_id = "6674386cabe5a4b207fa6613";
        const courseObjective = await CourseObjective.find({subject_data_id:subject_data_id});
        const {objectives} = courseObjective[0];
        return res.status(200).json({objectives}) 
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

export { createCourseObjective , updateCourseObjective, getCourseObjectives};