import { isObjectIdOrHexString } from "mongoose";
import { Batch } from "../models/batch.js"
import { Subject } from "../models/subject.js"
import { Teacher } from "../models/teacher.js";
import { createSubject } from "./subjectController.js";
import { Types } from 'mongoose';
import { BatchStudents } from "../models/batch_Student.js";
import { Subject_Data } from "../models/subject_data.js";

const { ObjectId } = Types;

const createBatch = async (req, res) => {
    try {
        const { batchyear, subjects } = req.body;
        let subjectIds = [];
        const subjects_names = [];
        for (let subjectData of subjects) {
            const { subject_code, subject_name } = subjectData;

            // await the result of createSubject function
            const { subject } = await createSubject(subject_code, subject_name); // Extract subject from the result
            subjectIds.push(subject._id);
        }
        for (let i = 0; i < subjects.length; i++) {
            subjects_names.push(subjects[i].subject_name)
        }
        // Create the batch with the subject IDs
        const batch = new Batch({ batchyear, subjects: subjectIds, subject_names: subjects_names });
        await batch.save();

        // Update the batch_id field in each subject
        await Subject.updateMany({ _id: { $in: subjectIds } }, { $set: { batch_id: batch._id } });

        res.status(201).json(batch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// const findBatchSubjects = async (req, res) => {
//     try {
//         const batchId = req.body._id;
//         const teacherId = "6623a26002630af71ac039c1"; // Example teacher ID
//         const aggregationResult = await findMatchingSubjectsForTeacher(teacherId);
//         console.log(aggregationResult);
//         // Extract subjects from the aggregation result
//         // const teacherSubjects = result.length > 0 ? result[0].subjects : [];
//         // const teacherSubjectNames = teacherSubjects.map(subject => subject.subject_name);

//         return res.status(200).json(aggregationResult);
//     } catch (error) {
//         return res.status(404).json({ message: error.message });
//     }
// };


 const FindSubjectData = async (req,res) => {
    try {
        const {batchyear} = req.body;

        const batchdata = await Batch.find({batchyear:batchyear});
        
        const subjectdataarray = batchdata[0]["subjects"]
        const temparray = []
        const temp2 =[]
        for (const subjectId of subjectdataarray) {
            const subject = await Subject.findById(subjectId.toString());
            if (subject) {
                temparray.push({
                    subject_code: subject.subject_code,
                    subject_name: subject.subject_name,
                    batch_id: subject.batch_id,
                    subject_data: subject.subject_data
                });
            }
            if (subject){
                const subjectdata = await Subject_Data.findById(subject["subject_data"].toString())
                const {course_objective, course_outcome, co_po_pso_map, student_details } = subjectdata;
                const temp = [course_outcome,course_objective, co_po_pso_map,student_details];
                console.log(temp);
            }
        
        

        }
        // console.table(temparray);
        return res.status(200).json(batchdata);
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
 }

const findMatchingSubjectsForTeacher = async (req, res) => {
    try {
        const { name } = req.body;
        const aggregationResult = await Teacher.aggregate([
            { $match: { name: name } },
            {
                $unwind: "$subject",
            },
            {
                $lookup: {
                    from: "subjects",
                    localField: "subject.code",
                    foreignField: "subject_code",
                    as: "result",
                },
            },
        ]);

        const final = aggregationResult.map(teacher => ({
            ...teacher,
            result: teacher.result.filter(subject => subject.batch_id == "66249fbbb13731329b2c3c51")
        }));
        return res.status(200).json(final);
    } catch (error) {
        throw error;
    }
}


const createBatchStudents = async (req, res) => {
    const { batchYear, studentdata } = req.body;

    if (!batchYear || !studentdata) {
        return res.status(400).json({ message: "Batch year and student data are required" });
    }

    try {
        const batchStudents = await BatchStudents.create({ batchYear, studentdata });
        console.log('Batch created:', batchStudents);
        return res.status(200).json(batchStudents);
    } catch (error) {
        console.error('Error creating batch:', error);
        return res.status(400).json({ message: error.message });
    }
};

const getBatchStudentData = async (req, res) => {
    const batchYear = "2021-25";
    console.log(batchYear);
    if (!batchYear) {
        return res.status(400).json({ message: "Batch year is required" });
    }

    try {
        const batchStudents = await BatchStudents.findOne({ batchYear });

        if (!batchStudents) {
            return res.status(404).json({ message: "Batch not found" });
        }


        return res.status(200).json(batchStudents);
    } catch (error) {
        console.error('Error retrieving batch data:', error);
        return res.status(500).json({ message: error.message });
    }
};



export { createBatch, findMatchingSubjectsForTeacher, createBatchStudents ,getBatchStudentData, FindSubjectData};
