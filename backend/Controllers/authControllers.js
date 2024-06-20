// Controllers/teacherControllers.js

import { Batch } from "../models/batch.js";
import { Subject } from "../models/subject.js";
import { Teacher } from "../models/teacher.js";
import { User } from "../models/users.js";
import { apiResponse } from "../utils/apiResponse.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const test = (req, res) => {
    res.json("test is working");
};

const setUser = (teacher) => {
    const payload = {
        id: teacher._id,
        email: teacher.email,
        isAdmin: teacher.isAdmin,
    };
    return jwt.sign(payload,"secretkey123", { expiresIn: '1h' });
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const teacher = await Teacher.findOne({ email });

        if (!teacher) {
            return res.status(404).json({
                message: "No User Found",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, teacher.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                error: "Incorrect Password! Retry",
            });
        }

        const token = setUser(teacher);

        res.cookie("token", token, { httpOnly: false, secure: false });
        res.cookie("email", teacher.email, { httpOnly: false, secure: false });

        const responsePayload = {
            message: "User Logged In Successfully!",
            isAdmin: teacher.isAdmin || false,
            email: teacher.email,
        };

        return res.status(200).json(new apiResponse(200, responsePayload, "User Logged In Successfully!"));
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};


const addTeacher = async (req, res) => {
    try {
        const { name, email, password, subjects, isAdmin } = req.body;

        if (!name) {
            return res.status(400).json({
                error: "Name is required"
            });
        }
        if (!email) {
            return res.status(400).json({
                error: "Email is required"
            });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({
                error: "Password is required and should be at least 6 characters long"
            });
        }

        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({
                error: "Email is already taken"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const teacher = new Teacher({
            name,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false,
            subjects: subjects || []
        });

        await teacher.save();

        const customResponse = {
            message: "Teacher created successfully",
            data: {
                id: teacher._id,
                name: teacher.name,
                email: teacher.email,
                isAdmin: teacher.isAdmin,
                subjects: teacher.subjects
            }
        };

        return res.status(201).json(customResponse);
    } catch (error) {
        console.log("Error creating teacher", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

const findTeacherSubs = async (req, res) => {
    try {
        const { batchyear, email } = req.query;
        console.log(batchyear);
        const BatchData = await Batch.find({ batchyear: batchyear });

        if (BatchData.length === 0) {
            return res.status(404).json({ message: "Batch not found" });
        }
        
        const { subCodeAndDataIds } = BatchData[0];
        const teacher = await Teacher.findOne({ email: email });

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        if (teacher.isAdmin) {
            return res.status(200).json(subCodeAndDataIds);
        }

        const { subjects } = teacher;
        const updatedSubCodeAndDataIds = [];

        subjects.forEach((val) => {
            const { code } = val;
            for (let index = 0; index < subCodeAndDataIds.length; index++) {
                if (code === subCodeAndDataIds[index][0]["subject_code"]) {
                    updatedSubCodeAndDataIds.push(subCodeAndDataIds[index]);
                }
            }
        });

        console.log(updatedSubCodeAndDataIds);
        return res.status(200).json(updatedSubCodeAndDataIds);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};



export { test, loginUser, addTeacher, findTeacherSubs };
