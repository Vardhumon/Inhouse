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

export { createCourseObjective };