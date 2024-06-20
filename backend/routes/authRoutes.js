// routes/authRoutes.js

import express from 'express';
import cors from 'cors';
import { test, loginUser, addTeacher, findTeacherSubs } from "../Controllers/authControllers.js";
import { FindSubjectData, createBatch, createBatchStudents, findMatchingSubjectsForTeacher, getBatchStudentData } from '../Controllers/batchController.js';
import { CreateStudentDetail, getstudentdetailsubejectwise } from "../Controllers/studentDetailController.js"
import { addSubjects } from '../Controllers/semSubjectController.js';
import { getCoPO, updateCoPo } from '../Controllers/copoController.js';
import { getCourseObjectives, updateCourseObjective } from '../Controllers/courseObjectiveController.js';
import { getCourseOutcome, updateCourseOutcome } from '../Controllers/courseOutcomeController.js';
import { getMarkingModel, updateMarkingModel } from '../Controllers/markingController.js';

const router = express.Router();

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

router.get('/', test);
router.post('/login', loginUser);
router.post('/batch', createBatch)
router.post('/addSubjects', addSubjects)
router.post('/addTeacher', addTeacher)
router.post('/addstudent', CreateStudentDetail)
router.get('/getbatchsubjects', findMatchingSubjectsForTeacher)
router.post('/batchstudentdata',createBatchStudents)
router.get('/getbatchstudentdata',getBatchStudentData)
router.get('/findsubjectdata', FindSubjectData)
router.get('/get', getstudentdetailsubejectwise)
router.post('/copo/:subject_data_id', updateCoPo)
router.get('/copo/:subject_data_id', getCoPO);
router.post('/courseobj', updateCourseObjective)
router.post('/courseout',updateCourseOutcome)
router.post('/marking/:subject_data_id',updateMarkingModel)
router.get('/getmarking', getMarkingModel)
router.get('/courseobjective', getCourseObjectives)
router.get('/courseoutcomes',getCourseOutcome)
router.get('/findsubs',findTeacherSubs)
export default router;
