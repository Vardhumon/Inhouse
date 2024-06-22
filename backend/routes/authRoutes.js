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
import { authenticateToken, authenticateTokenSub } from '../Controllers/authmiddleware.js';
import { createOrUpdateAttainmentTable, getAttainmentTable } from '../Controllers/attainmentTableController.js';
import { createIndirectPo, getFinalData } from '../Controllers/indirectPoController.js';

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
router.post('/addstudent/:subject_data_id', CreateStudentDetail)
router.get('/getbatchsubjects', findMatchingSubjectsForTeacher)
router.post('/batchstudentdata',createBatchStudents)
router.get('/getbatchstudentdata',getBatchStudentData)
router.get('/findsubjectdata', FindSubjectData)
router.get('/get/:subject_data_id', getstudentdetailsubejectwise)
router.post('/copo/:subject_data_id', updateCoPo)
router.get('/copo/:subject_data_id', getCoPO);
router.post('/courseobj/:subject_data_id', updateCourseObjective)
router.post('/course-outcome/:subject_data_id',updateCourseOutcome)
router.post('/marking/:subject_data_id',updateMarkingModel)
router.get('/getmarking', getMarkingModel)
router.get('/course-objective/:subject_data_id', getCourseObjectives)
router.get('/course-outcome/:subject_data_id',getCourseOutcome)
router.get('/findsubs',authenticateTokenSub,findTeacherSubs)
router.get('/CoPoPsoTable/:subject_data_id',getCoPO)
router.post('/CoPoPsoTable/:subject_data_id',updateCoPo)
router.post('/attainment-table/:subject_data_id',createOrUpdateAttainmentTable);
router.get('/attainment-tables/:subject_data_id',getAttainmentTable)
router.post('/direct-indirect/:subject_data_id',createIndirectPo)
router.get('/direct-indirect/:subject_data_id',getFinalData)




router.post('/verifyToken', authenticateToken, (req, res) => {
    const { id, email, isAdmin } = req.user;
    res.status(200).json({ id, email, isAdmin });
});
export default router;
