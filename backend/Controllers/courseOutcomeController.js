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

export { createCourseOutcome };