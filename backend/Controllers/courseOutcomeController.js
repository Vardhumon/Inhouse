import { CourseOutcome } from "../models/course_outcome.js"

const createCourseOutcome = async (subject_id) => {
    try {
        const courseOutcome = new CourseOutcome({ subject_id });
        await courseOutcome.save();
        return courseOutcome;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateCourseOutcome = async (req,res) => {
    try {
        //enter subject_data_id of the Outcome you want to update
        const {subject_data_id} = req.params;
        // const {subject_data_id} = req.params;
        const {co,outcome} = req.body;
        const CO = await CourseOutcome.updateOne({subject_data_id: subject_data_id},{co: co, outcome: outcome})
        
        return res.status(200).json(["Course Outcome Updated Succesfully!",CO])
    } catch (error) {
        return res.status(400).json(["Course Outcome Update UnSuccesfull!", error.message])
        
    }
}

const getCourseOutcome = async(req,res) => {
    try {
        const {subject_data_id} = req.params;
        // console.log(subject_data_id);
        const courseOutcome = await CourseOutcome.find({subject_data_id:subject_data_id});
        // console.log(courseOutcome[0]);
        const {co,outcome} = courseOutcome[0];
        return res.status(200).json({co,outcome}) 
    } catch (error) {
        return res.status(400).json(error.message)
    }
}
export { createCourseOutcome, updateCourseOutcome, getCourseOutcome };