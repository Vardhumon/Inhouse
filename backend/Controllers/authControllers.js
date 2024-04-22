// Controllers/teacherControllers.js

import { Teacher } from "../models/teacher.js";
import { User } from "../models/users.js";
import { setUser } from "../services/auth.js";
import { apiResponse } from "../utils/apiResponse.js"


const test = (req, res) => {
    res.json("test is working");
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({
                error: "name is required"
            });
        }
        if (!password || password.length < 6) {
            return res.json({
                error: "password is required and should be at least 6 characters long"
            });
        }
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: "Email is taken already "
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });
        return res.json(user);
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.json({
                message: "No User Found"
            });
        }
        if (password !== teacher?.password) {
            return res.json({
                error: "InCorrect PassWord! Retry "
            });
        }

        const token = setUser(teacher);

        res.cookie("token", token, { httpOnly: false, secure: false });
        res.cookie("subjects", teacher.subject[0], { httpOnly: false, secure: false });
        return res.status(200).json(new apiResponse(200, null, "User LoggedIn Succesfully!"))

    } catch (error) {
        console.log(error);
    }
};

const addTeacher = async (req, res) => {
    try {
        const { name, email, password, subjects } = req.body;

        if (!name) {
            return res.json({
                error: "name is required"
            });
        }
        if (!email) {
            return res.json({
                error: "email is required"
            });
        }
        if (!password || password.length < 6) {
            return res.json({
                error: "password is required and should be at least 6 characters long"
            });
        }
        const exist = await Teacher.findOne({ email });
        if (exist) {
            return res.json({
                error: "Email is taken already "
            });
        }
        const teacher = await Teacher.create({
            name,
            email,
            password,
            subject: subjects
        });
        const customResponse = {
            message: "Teacher created Succesfully",
            data: teacher
        };

        return res.status(200).json(customResponse);
    } catch (error) {
        console.log("error creating teacher", error);
    }
};

export { test, registerUser, loginUser, addTeacher };
