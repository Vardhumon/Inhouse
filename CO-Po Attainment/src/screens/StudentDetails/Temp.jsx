import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import MiscTable from '../../miscTables/MiscTable';

const fetchStudentDetails = async (subjectdataid) => {
    const response = await fetch(`http://localhost:8000/get/${subjectdataid}`); // Replace with your API endpoint
    const backendData = await response.json();
    return backendData[0];
};

const fetchBackendData = async () => {
    const response = await fetch('http://localhost:8000/getbatchstudentdata'); // Replace with your API endpoint
    const studentDetails = await response.json();
    const stuarr = studentDetails.studentdata.flat();
    // console.log("imp", stuarr);
    return stuarr;
};





function StudentDetailTemp() {
    const [marking, setmarking] = useState({
            "ese": 70,
            "midsem": 30,
            "pr_or": 25,
            "termwork": 25,
            "Total": 150,
            "COMarksdata": [
                {
                    "co": "CO1",
                    "utmarks": 20,
                    "classwork": 25,
                    "total": 45
                },
                {
                    "co": "CO2",
                    "utmarks": 22,
                    "classwork": 28,
                    "total": 50
                },
                {
                    "co": "CO3",
                    "utmarks": 22,
                    "classwork": 28,
                    "total": 50
                },{
                    "co": "CO4",
                    "utmarks": 22,
                    "classwork": 28,
                    "total": 50
                },{
                    "co": "CO5",
                    "classwork": 20,
                    "total": 20
                },
                {
                    "co": "CO6",
                    "classwork": 20,
                    "total": 20
                }
]});
    const [students, setStudents] = useState([]);
    const [backendStudents, setBackendStudents] = useState([]);
    const [studentDetails, setStudentDetails] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [totals, setTotals] = useState([]);
    const [columnTotal, setcolumnTotal] = useState([]);
    const [finalTotalData, setfinalTotalData] = useState({});
    const [DataForAttainment,setDataForAttainment] = useState();
    const {subjectdataid,subname} = useParams();
    const [miscData,setMiscData] = useState();
    const [showmisc,setShowMisc] = useState(false);
    const navigate = useNavigate();


    const fetchMarking = async (subjectdataid) => {
        try {
            const response = await fetch('http://localhost:8000/getmarking');
            const Markingdata = await response.json();
            console.log(Markingdata);
            const data = Markingdata[1][0]["data"];
            console.log(data);
            setmarking(data);
        } catch (error) {
            console.error('Error fetching marking data:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const backendData = await fetchStudentDetails(subjectdataid);
                const studentdata = await fetchBackendData();
                setBackendStudents(backendData);
                // console.log(backendData,"backend");
                setStudentDetails(studentdata);
                // console.log(studentdata,"student");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        // fetchMarking();
        

    }, []);

    // useEffect(() =>{
    //     setTimeout(console.log("hello 4",backendStudents),12000)
    // },[])

    useEffect(() => {
        if (studentDetails.length) {
            const formattedStudents = studentDetails.map((student,index) => {
                const backendStudent = backendStudents.filter(backendstudent => student.roll_number === backendstudent.roll_number);
                console.log(backendStudent,"hel"); // Ensure we have a single backend student or an empty object

                const co_attain_UE = backendStudent[0]?.co_attain_UE || {};
                const co_attain_IE_CW = backendStudent[0]?.co_attain_IE_CW || {};

                return {
                    name: student.name,
                    roll: student.roll_number,
                    prn: student.prn_number,
                    ese: co_attain_UE.ESE,
                    midsem: co_attain_UE.MidSem,
                    pr_or: co_attain_UE.PR_OR,
                    termwork: co_attain_UE.TermWork,
                    CO1: [co_attain_IE_CW.CO1?.UT1, co_attain_IE_CW.CO1?.CW],
                    CO2: [co_attain_IE_CW.CO2?.UT1, co_attain_IE_CW.CO2?.CW],
                    CO3: [co_attain_IE_CW.CO3?.UT2, co_attain_IE_CW.CO3?.CW],
                    CO4: [co_attain_IE_CW.CO4?.UT2, co_attain_IE_CW.CO4?.CW],
                    CO5: [co_attain_IE_CW.CO5?.CW],
                    CO6: [co_attain_IE_CW.CO6?.CW]
                };
            });
            setStudents(formattedStudents);
        }
    }, [studentDetails, backendStudents]);

    useEffect(() => {
        calculateAllTotals();
    }, [students]);

   
    const calculateTotal = (student) => {
        const total = parseInt(student.ese) + parseInt(student.midsem) + parseInt(student.pr_or) + parseInt(student.termwork);
        return isNaN(total) ? 0 : total;
    };

    const calculateCOTotal = (CO) => {
        const total = CO.length > 1 ? (parseInt(CO[0]) || 0) + (parseInt(CO[1]) || 0) : (parseInt(CO[0]) || 0);
        return isNaN(total) ? 0 : total;
    };

    const calculateAllTotals = () => {
        const newTotals = students.map(student => ({
            total: calculateTotal(student),
            totalCO1: calculateCOTotal(student.CO1),
            totalCO2: calculateCOTotal(student.CO2),
            totalCO3: calculateCOTotal(student.CO3),
            totalCO4: calculateCOTotal(student.CO4),
            totalCO5: calculateCOTotal(student.CO5),
            totalCO6: calculateCOTotal(student.CO6),
        }));
        setTotals(newTotals);
    };

    //Final Total Data ke liye
    useEffect(() => {
        if (totals.length > 0) {
            const calculateFinalTotals = () => {
                const final = totals.reduce((acc, current) => {
                    acc.finaltotal += current.total;
                    acc.finalco1total += current.totalCO1;
                    acc.finalco2total += current.totalCO2;
                    acc.finalco3total += current.totalCO3;
                    acc.finalco4total += current.totalCO4;
                    acc.finalco5total += current.totalCO5;
                    acc.finalco6total += current.totalCO6;
                    return acc;
                }, {
                    finaltotal: 0,
                    finalco1total: 0,
                    finalco2total: 0,
                    finalco3total: 0,
                    finalco4total: 0,
                    finalco5total: 0,
                    finalco6total: 0
                });

                setfinalTotalData(final);
                DataForFurther();

            };

            const timer = setTimeout(calculateFinalTotals,100);
            return () => clearTimeout(timer);
        }
    }, [totals]);

    // useEffect(() => {
    //     DataForFurther();
    // }, [finalTotalData]);

    const DataForFurther = () => {
        const UEtotal = finalTotalData["finaltotal"];
        const CO1total = finalTotalData["finalco1total"]
        const CO2total = finalTotalData["finalco2total"]
        const CO3total = finalTotalData["finalco3total"]
        const CO4total = finalTotalData["finalco4total"]
        const CO5total = finalTotalData["finalco5total"]
        const CO6total = finalTotalData["finalco6total"]

        //total students
        const totalstudents = students.length;

        //average marks
        const UEAvgMarks = parseFloat((UEtotal/totalstudents).toFixed(1));
        const CO1AvgMarks= parseFloat((CO1total/totalstudents).toFixed(1));
        const CO2AvgMarks= parseFloat((CO2total/totalstudents).toFixed(1));
        const CO3AvgMarks= parseFloat((CO3total/totalstudents).toFixed(1));
        const CO4AvgMarks= parseFloat((CO4total/totalstudents).toFixed(1));
        const CO5AvgMarks= parseFloat((CO5total/totalstudents).toFixed(1));
        const CO6AvgMarks= parseFloat((CO6total/totalstudents).toFixed(1));

        //sixtypercent

        const sixtypercUE= parseFloat(((marking["Total"]*60)/100).toFixed(1));
        const sixtypercCO1= parseFloat(((marking["COMarksdata"][0]["total"]*60)/100).toFixed(1));
        const sixtypercCO2= parseFloat(((marking["COMarksdata"][1]["total"]*60)/100).toFixed(1));
        const sixtypercCO3= parseFloat(((marking["COMarksdata"][2]["total"]*60)/100).toFixed(1));
        const sixtypercCO4= parseFloat(((marking["COMarksdata"][3]["total"]*60)/100).toFixed(1));
        const sixtypercCO5= parseFloat(((marking["COMarksdata"][4]["total"]*60)/100).toFixed(1));
        const sixtypercCO6= parseFloat(((marking["COMarksdata"][5]["total"]*60)/100).toFixed(1));

        //morethan60percent
        const countAboveThreshold = (key, threshold) => {
            return totals.filter(total => total[key] >= threshold).length;
        };
    
        const nummorethansixtypercUE = countAboveThreshold("total", sixtypercUE);
        const nummorethansixtypercCO1 = countAboveThreshold("totalCO1", sixtypercCO1);
        const nummorethansixtypercCO2 = countAboveThreshold("totalCO2", sixtypercCO2);
        const nummorethansixtypercCO3 = countAboveThreshold("totalCO3", sixtypercCO3);
        const nummorethansixtypercCO4 = countAboveThreshold("totalCO4", sixtypercCO4);
        const nummorethansixtypercCO5 = countAboveThreshold("totalCO5", sixtypercCO5);
        const nummorethansixtypercCO6 = countAboveThreshold("totalCO6", sixtypercCO6);

        //percentage above 60 percent
        const percAbove60percUE = parseFloat(((nummorethansixtypercUE/totalstudents)*100).toFixed(1));
        const percAbove60percCO1 = parseFloat(((nummorethansixtypercCO1/totalstudents)*100).toFixed(1));
        const percAbove60percCO2 = parseFloat(((nummorethansixtypercCO2/totalstudents)*100).toFixed(1));
        const percAbove60percCO3 = parseFloat(((nummorethansixtypercCO3/totalstudents)*100).toFixed(1));
        const percAbove60percCO4 = parseFloat(((nummorethansixtypercCO4/totalstudents)*100).toFixed(1));
        const percAbove60percCO5 = parseFloat(((nummorethansixtypercCO5/totalstudents)*100).toFixed(1));
        const percAbove60percCO6 = parseFloat(((nummorethansixtypercCO6/totalstudents)*100).toFixed(1));
        

        //attainment level 
        const AttainmentLevel = (percabove60) => {
            if(percabove60>=60){
                return 3;
            }
            if(percabove60>=50){
                return 2;
            }
            if(percabove60>=40){
                return 1;
            }
            else{
                return 0;
            }
        }
        const AttainmentlevelUE = AttainmentLevel(percAbove60percUE);
        const AttainmentlevelCO1 = AttainmentLevel(percAbove60percCO1);
        const AttainmentlevelCO2 = AttainmentLevel(percAbove60percCO2);
        const AttainmentlevelCO3 = AttainmentLevel(percAbove60percCO3);
        const AttainmentlevelCO4 = AttainmentLevel(percAbove60percCO4);
        const AttainmentlevelCO5 = AttainmentLevel(percAbove60percCO5);
        const AttainmentlevelCO6 = AttainmentLevel(percAbove60percCO6);


        //percentange attainment Level
        const percAttainmentlevelUE = parseFloat(((AttainmentlevelUE/3)*100).toFixed(1));
        const percAttainmentlevelCO1 = parseFloat(((AttainmentlevelCO1/3)*100).toFixed(1));
        const percAttainmentlevelCO2 = parseFloat(((AttainmentlevelCO2/3)*100).toFixed(1));
        const percAttainmentlevelCO3 = parseFloat(((AttainmentlevelCO3/3)*100).toFixed(1));
        const percAttainmentlevelCO4 = parseFloat(((AttainmentlevelCO4/3)*100).toFixed(1));
        const percAttainmentlevelCO5 = parseFloat(((AttainmentlevelCO5/3)*100).toFixed(1));
        const percAttainmentlevelCO6 = parseFloat(((AttainmentlevelCO6/3)*100).toFixed(1));


        const datafurther = {UE:{
            UEtotal: UEtotal,
            UEavg: UEAvgMarks,
            sixtypercUE:sixtypercUE,
            nummorethansixtypercUE:nummorethansixtypercUE,
            percAbove60percUE:percAbove60percUE,
            AttainmentlevelUE:AttainmentlevelUE,
            percAttainmentlevelUE:percAttainmentlevelUE
        },
        CO1: {
            CO1total: CO1total,
            CO1avg: CO1AvgMarks,
            sixtypercCO1: sixtypercCO1,
            nummorethansixtypercCO1: nummorethansixtypercCO1,
            percAbove60percCO1: percAbove60percCO1,
            AttainmentlevelCO1: AttainmentlevelCO1,
            percAttainmentlevelCO1: percAttainmentlevelCO1
        },
        CO2: {
            CO2total: CO2total,
            CO2avg: CO2AvgMarks,
            sixtypercCO2: sixtypercCO2,
            nummorethansixtypercCO2: nummorethansixtypercCO2,
            percAbove60percCO2: percAbove60percCO2,
            AttainmentlevelCO2: AttainmentlevelCO2,
            percAttainmentlevelCO2: percAttainmentlevelCO2
        },
        CO3: {
            CO3total: CO3total,
            CO3avg: CO3AvgMarks,
            sixtypercCO3: sixtypercCO3,
            nummorethansixtypercCO3: nummorethansixtypercCO3,
            percAbove60percCO3: percAbove60percCO3,
            AttainmentlevelCO3: AttainmentlevelCO3,
            percAttainmentlevelCO3: percAttainmentlevelCO3
        },
        CO4: {
            CO4total: CO4total,
            CO4avg: CO4AvgMarks,
            sixtypercCO4: sixtypercCO4,
            nummorethansixtypercCO4: nummorethansixtypercCO4,
            percAbove60percCO4: percAbove60percCO4,
            AttainmentlevelCO4: AttainmentlevelCO4,
            percAttainmentlevelCO4: percAttainmentlevelCO4
        },
        CO5: {
            CO5total: CO5total,
            CO5avg: CO5AvgMarks,
            sixtypercCO5: sixtypercCO5,
            nummorethansixtypercCO5: nummorethansixtypercCO5,
            percAbove60percCO5: percAbove60percCO5,
            AttainmentlevelCO5: AttainmentlevelCO5,
            percAttainmentlevelCO5: percAttainmentlevelCO5
        },CO6: {
            CO6total: CO6total,
            CO6avg: CO6AvgMarks,
            sixtypercCO6: sixtypercCO6,
            nummorethansixtypercCO6: nummorethansixtypercCO6,
            percAbove60percCO6: percAbove60percCO6,
            AttainmentlevelCO6: AttainmentlevelCO6,
            percAttainmentlevelCO6: percAttainmentlevelCO6
        }
        }
        console.log(datafurther);
        toast.success("Data Ready To Be Sent")
        setDataForAttainment(datafurther);

    }


    const handleInputChange = (index, field, subIndex, value) => {
        const newStudents = [...students];
        if (subIndex !== undefined) {
            newStudents[index][field][subIndex] = parseInt(value) || 0;
        } else {
            newStudents[index][field] = value;
        }
        setStudents(newStudents);
    };

    const handleSave = () => {
        setEditIndex(null);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
    };

    const handleAllRowsSubmit = async (event) => {
        event.preventDefault();
        try {
            const StudentDetails = students.map((student, index) => ({
                ...student,
                total: totals[index]?.total || 0,
                co1: { UT1: student.CO1[0], CW: student.CO1[1], Total: totals[index]?.totalCO1 || 0 },
                co2: { UT1: student.CO2[0], CW: student.CO2[1], Total: totals[index]?.totalCO2 || 0 },
                co3: { UT2: student.CO3[0], CW: student.CO3[1], Total: totals[index]?.totalCO3 || 0 },
                co4: { UT2: student.CO4[0], CW: student.CO4[1], Total: totals[index]?.totalCO4 || 0 },
                co5: { CW: student.CO5[0], Total: totals[index]?.totalCO5 || 0 },
                co6: { CW: student.CO6[0], Total: totals[index]?.totalCO6 || 0 }
            }));
            
            console.log("All Row data:", StudentDetails);
    
            const response =await axios.post(`http://localhost:8000/addstudent/${subjectdataid}`, StudentDetails, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const attainmentResponse = await axios.post(`http://localhost:8000/attainment-table/${subjectdataid}`,DataForAttainment,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            console.log("hello",attainmentResponse.data);
            console.log("hello222",DataForAttainment);


            if(response.status ===200){
                toast.success("Student Details Updated Successfully",)
            }
            if(attainmentResponse.status===200){
                toast.success("Successfully Updated Attainment Data")
                setMiscData(attainmentResponse.data)
                setShowMisc(true);
            }
        } catch (error) {
            console.error(error)
            toast.error("Some error in updating student details")
        }
    };

    const navigateToAttainment =() =>{
        navigate(`/${subname}/attainment-tables/${subjectdataid}`)
    }
    const navigateToCoPo =() =>{
        navigate(`/${subname}/pso-table/${subjectdataid}`)
    }

    return (
        <div className='mt-5 ms-4'>
            <div className="table-container">
                <table className="table table-hover table-light table-bordered w-100 mt-5">
                    <thead className='ms-2 sticky-top'>
                        <tr className='ms-2 text-center table-danger sticky-top'>
                            <th scope="col">Sr.no</th>
                            <th scope="col" style={{ minWidth: "150px" }}>PRN No.</th>
                            <th scope="col" style={{ minWidth: "150px" }}>Roll No.</th>
                            <th scope="col" style={{ minWidth: "250px" }}>Student Name</th>
                            <th scope="col">ESE({marking["ese"]})</th>
                            <th scope="col">InSem({marking["midsem"]})</th>
                            <th scope="col">PR/O({marking["pr_or"]})</th>
                            <th scope="col">TermWor({marking["termwork"]})</th>
                            <th scope="col">Total({marking["Total"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO1<br />UT-1({marking["COMarksdata"][0]["utmarks"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO1<br />CW({marking["COMarksdata"][0]["classwork"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO1<br />Total({marking["COMarksdata"][0]["total"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO2<br />UT1({marking["COMarksdata"][1]["utmarks"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO2<br />CW({marking["COMarksdata"][1]["classwork"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO2<br />Total({marking["COMarksdata"][1]["total"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO3<br />UT2({marking["COMarksdata"][2]["utmarks"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO3<br />CW({marking["COMarksdata"][2]["classwork"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO3<br />Total({marking["COMarksdata"][2]["total"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO4<br />UT2({marking["COMarksdata"][3]["utmarks"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO4<br />CW({marking["COMarksdata"][3]["classwork"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO4<br />Total({marking["COMarksdata"][3]["total"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO5<br />CW({marking["COMarksdata"][4]["classwork"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO5<br />Total({marking["COMarksdata"][4]["total"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO6<br />CW({marking["COMarksdata"][5]["classwork"]})</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO6<br />Total({marking["COMarksdata"][5]["total"]})</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="d-flex flex-column align-items-center">
                                        <span>{index + 1}</span>
                                        {editIndex === index ? (
                                            <button className="btn btn-success btn-sm mt-1" onClick={handleSave}>Save</button>
                                        ) : (
                                            <button className="btn btn-primary btn-sm mt-1" onClick={() => handleEdit(index)}>Edit</button>
                                        )}
                                    </div>
                                </td>
                                <td>{student.prn}</td>
                                <td>{student.roll}</td>
                                <td>{student.name}</td>
                                {['ese', 'midsem', 'pr_or', 'termwork'].map((field) => (
                                    <td key={field}>
                                        {editIndex === index ? (
                                            <input
                                                type="number"
                                                className="form-control form-control-sm"
                                                value={student[field] || ''}
                                                onChange={(e) => handleInputChange(index, field, undefined, e.target.value)}
                                                style={{ maxWidth: "150px" }}
                                            />
                                        ) : (
                                            <span>{student[field]}</span>
                                        )}
                                    </td>
                                ))}
                                <td>{totals[index]?.total}</td>
                                {['CO1', 'CO2', 'CO3', 'CO4'].map((coField, i) => (
                                    <React.Fragment key={i}>
                                        {[0, 1].map((subIndex) => (
                                            <td key={subIndex}>
                                                {editIndex === index ? (
                                                    <input
                                                        type="number"
                                                        className="form-control form-control-sm"
                                                        value={student[coField][subIndex] || ''}
                                                        onChange={(e) => handleInputChange(index, coField, subIndex, e.target.value)}
                                                        style={{ maxWidth: "100px" }}
                                                    />
                                                ) : (
                                                    <span>{student[coField][subIndex]}</span>
                                                )}
                                            </td>
                                        ))}
                                        <td>{totals[index]?.[`totalCO${i + 1}`]}</td>
                                    </React.Fragment>
                                ))}
                                {['CO5', 'CO6'].map((coField, i) => (
                                    <React.Fragment key={i + 4}>
                                        <td>
                                            {editIndex === index ? (
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    value={student[coField][0] || ''}
                                                    onChange={(e) => handleInputChange(index, coField, 0, e.target.value)}
                                                    style={{ maxWidth: "100px" }}
                                                />
                                            ) : (
                                                <span>{student[coField][0]}</span>
                                            )}
                                        </td>
                                        <td>{totals[index]?.[`totalCO${i + 5}`]}</td>
                                    </React.Fragment>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='d-flex justify-content-start'>
                <button className="btn btn-success  me-2" onClick={handleAllRowsSubmit}>Submit All Rows</button>
            <button className='btn btn-secondary me-2 ' onClick={navigateToCoPo}>Go to Course Outcomes</button>
            <button className='btn btn-primary me-4 ' onClick={navigateToAttainment}>Go to Attainment Tables</button>

                </div>
            </div>
            {/* {miscData && setShowMisc && miscData.updatedAttainmentTableUE ? (
            <div>
                <MiscTable show={setShowMisc} data={miscData["updatedAttainmentTableUE"]} />
                <MiscTable show={setShowMisc} data={miscData["updatedAttainmentTableCO"]}/>
            </div>
             ) : null} */}
        </div>
    );
}

export default StudentDetailTemp;
