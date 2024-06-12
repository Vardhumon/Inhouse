import { StudentDetail } from "../models/student_detail.js";
import {Subject} from "../models/subject.js"
import { Subject_Data } from "../models/subject_data.js";



const CreateStudentDetail = async (req, res) => {
    try {
        const students = req.body;

        // Assuming SubjectDataId is provided in the request or is a fixed value.
        const SubjectDataId = "666153f3928cc1f6066508ef";
        const temparr = [];

        const createdOrUpdatedStudents = await Promise.all(students.map(async student => {
            const { roll_no, ese, midsem, pr_or, termwork, total, co1, co2, co3, co4, co5, co6 } = student;

            // Define the update query and data
            const filter = { roll_no: student.roll };
            const updateData = {
                $set: {
                    roll_no: student.roll,
                    name: student.name,
                    prn: student.prn,
                    co_attain_UE: { ESE: ese, MidSem: midsem, PR_OR: pr_or, TermWork: termwork, Total: total },
                    co_attain_IE_CW: {
                        CO1: { UT1: co1.UT1, CW: co1.CW, Total: co1.Total },
                        CO2: { UT1: co2.UT1, CW: co2.CW, Total: co2.Total },
                        CO3: { UT2: co3.UT2, CW: co3.CW, Total: co3.Total },
                        CO4: { UT2: co4.UT2, CW: co4.CW, Total: co4.Total },
                        CO5: { CW: co5.CW, Total: co5.Total },
                        CO6: { CW: co6.CW, Total: co6.Total }
                    }
                }
            };

            const options = { upsert: true };

            // Update or insert the student
            const result = await StudentDetail.updateOne(filter, updateData, options);

            let studentId;
            if (result.upserted && result.upserted.length > 0) {
                studentId = result.upserted[0]._id;
            } else {
                const updatedStudent = await StudentDetail.findOne(filter);
                studentId = updatedStudent._id;
            }

            temparr.push(studentId.toString());
            return studentId;
        }));

        // Update Subject_Data with the list of student details
        await Subject_Data.updateOne({ _id: SubjectDataId }, { $set: { student_details: temparr } });

        return res.status(200).json({ message: "Students created/updated successfully", students: createdOrUpdatedStudents });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating/updating Students" });
    }
};



const getstudentdetailsubejectwise = async (req, res) => {
    const SubjectDataId = "666153f3928cc1f6066508ef";
    const temp = [];
    try {
        const subject_data = await Subject_Data.findById(SubjectDataId.toString());
        // console.log(subject_data);
        const { student_details } = subject_data;
        // console.log(student_details);

        const studentDetailsPromises = student_details.map(async (studentId) => {
            const studentdetail = await StudentDetail.findById(studentId.toString());
            // console.log(studentdetail);
            const { co_attain_UE, co_attain_IE_CW ,roll_no} = studentdetail;
            const roll_number = roll_no
            return { co_attain_UE, co_attain_IE_CW ,roll_number};
        });

        const studentDetails = await Promise.all(studentDetailsPromises);
        temp.push(...studentDetails);
        
        // console.log(temp);
        return res.status(200).json(temp);
    } catch (error) {
        return res.status(400).json({ error: "Error fetching students from backend" });
    }
}





export { CreateStudentDetail , getstudentdetailsubejectwise};

