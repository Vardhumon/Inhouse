// routes/authRoutes.js

import express from 'express';
import cors from 'cors';
import { test, registerUser, loginUser, addTeacher } from "../Controllers/authControllers.js";
import { createBatch, findMatchingSubjectsForTeacher } from '../Controllers/batchController.js';
import { CreateStudentDetail } from "../Controllers/studentDetailController.js"
import { addSubjects } from '../Controllers/semSubjectController.js';

const router = express.Router();

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/batch', createBatch)
router.post('/addSubjects', addSubjects)
router.post('/addTeacher', addTeacher)
router.post('/addstudent', CreateStudentDetail)
router.get('/getbatchsubjects', findMatchingSubjectsForTeacher)

export default router;
