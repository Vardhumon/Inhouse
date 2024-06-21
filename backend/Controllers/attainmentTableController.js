import { AttainmentTable } from "../models/attainTable.js";
import { CourseArticulationModel } from "../models/courseArticulation.js";
import { DirectPOAttainment } from "../models/directAttainPo.js";

const createOrUpdateAttainmentTable = async (req, res) => {
    try {
        const { subject_data_id } = req.params;
        const FurtherData = req.body;
        const { UE, CO1, CO2, CO3, CO4, CO5, CO6 } = FurtherData;
        // console.log("hello hello",UE);
        const articulationTable = await CourseArticulationModel.findOne({ subject_data_id });
        // console.log("hello hello",articulationTable.data);
        if (!articulationTable || !articulationTable.data) {
            return res.status(404).send("Articulation table data not found");
        }

        const { data } = articulationTable;
        // console.log("hello hello",data);

        const Table1Data = data.map((val) => {
            const { po, pso } = val;
            const poCalculated = po.map((item) => item === '-' ? '-' : (item*UE["percAttainmentlevelUE"])/100);
            const psoCalculated = pso.map((item) => item === '-' ? '-' : (item*UE["percAttainmentlevelUE"])/100);
            return { po: poCalculated, pso: psoCalculated };
        });
        // console.log(Table1Data);

        const poColumnCount = data[0].po.length;
        const psoColumnCount = data[0].pso.length;

        const calculateAverage = (arr, columnCount) => {
            const sums = new Array(columnCount).fill(0);
            const counts = new Array(columnCount).fill(0);

            arr.forEach(row => {
                row.forEach((item, index) => {
                    if (item !== '-') {
                        sums[index] += item;
                        counts[index] += 1;
                    }
                });
            });

            return sums.map((sum, index) => counts[index] === 0 ? '-' : parseFloat((sum / counts[index]).toFixed(2)));
        };

        const avgPo = calculateAverage(Table1Data.map(row => row.po), poColumnCount);
        // console.log(avgPo);
        const avgPso = calculateAverage(Table1Data.map(row => row.pso), psoColumnCount);
        // console.log(avgPso);
        const COPercentages = {
            0: CO1["percAttainmentlevelCO1"],
            1: CO2["percAttainmentlevelCO2"],
            2: CO3["percAttainmentlevelCO3"],
            3: CO4["percAttainmentlevelCO4"],
            4: CO5["percAttainmentlevelCO5"],
            5: CO6["percAttainmentlevelCO6"]
        };

        const Table2Data = data.map((val, index) => {
            const { po, pso } = val;
            const poCalculated = po.map((item) => item === '-' ? '-' : parseFloat(((item*COPercentages[index])/100).toFixed(2)));
            const psoCalculated = pso.map((item) => item === '-' ? '-' :parseFloat(((item*COPercentages[index])/100).toFixed(2)));
            return { po: poCalculated, pso: psoCalculated };
        });
        // console.log(Table2Data);
        const avgPoTable2 = calculateAverage(Table2Data.map(row => row.po), poColumnCount);
        const avgPsoTable2 = calculateAverage(Table2Data.map(row => row.pso), psoColumnCount);
        // console.log("cat", avgPoTable2);
        const InternalExam = [{po:avgPoTable2,pso:avgPsoTable2}];
        // console.log("int",InternalExam);
        const UniversityExam = [{po:avgPo,pso:avgPso}];
        const percInternalExam = InternalExam.map((val) => {
            // console.log("value",val.po);
            const finalvaluespo = val.po.map((po) =>{
                return parseFloat((po * 0.2).toFixed(1))
            })
            // console.log("hello helloooo",finalvaluespo);
            const finalvaluespso = val.pso.map((pso) =>{
                return parseFloat((pso * 0.2).toFixed(1))
            })
            return {
                po: finalvaluespo,
                pso: finalvaluespso
            };
        });
        // console.log("percentage",percInternalExam);
        const percUniversityExam = UniversityExam.map((val) => {
            const finalvaluespo = val.po.map((po) =>{
                return parseFloat((po * 0.8).toFixed(1))
            })
            const finalvaluespso = val.pso.map((pso) =>{
                return parseFloat((pso * 0.2).toFixed(1))
            })
            return {
                po:finalvaluespo,
                pso: finalvaluespso
            };
        });
        const DirectPOAttainmentValues = percInternalExam.map((val, index) => {
            const finalvaluespo = val.po.map((po,idx) =>{
                return parseFloat((po+ percUniversityExam[0].po[idx]).toFixed(1))
            })
            const finalvaluespso = val.pso.map((pso,idx) =>{
                return parseFloat((pso+ percUniversityExam[0].pso[idx]).toFixed(1))
            })
            return {
                po:finalvaluespo,
                pso: finalvaluespso
            };
        });

        const updateFieldsUE = {
            TableName: "UE",
            data: Table1Data,
            average: [{po:avgPo, pso:avgPso}]
        };
        // console.log("hello 123",Table1Data);
        const updatedAttainmentTableUE = await AttainmentTable.findOneAndUpdate(
            { subject_data_id: subject_data_id, TableName: "UE" },
            updateFieldsUE,
            { new: true, upsert: true }
        );

        const updateFieldsCO = {
            TableName: "CO",
            data: Table2Data,
            average: [{po:avgPoTable2, pso:avgPsoTable2}]
        };

        const updatedAttainmentTableCO = await AttainmentTable.findOneAndUpdate(
            { subject_data_id: subject_data_id, TableName: "CO" },
            updateFieldsCO,
            { new: true, upsert: true }
        );

        const updatedDirectPO = await DirectPOAttainment.findOneAndUpdate(
            { subject_data_id: subject_data_id },
            {
                InternalExam: InternalExam,
                UniversityExam: UniversityExam,
                percInternalExam: percInternalExam,
                percUniversityExam: percUniversityExam,
                DirectPO: DirectPOAttainmentValues
            },
            { new: true, upsert: true }
        );

        res.json({ updatedAttainmentTableUE, updatedAttainmentTableCO, updatedDirectPO });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const getAttainmentTable = async (req, res) => {
    try {
        const { subject_data_id } = req.params;

        const ueAttainmentTable = await AttainmentTable.findOne({ subject_data_id, TableName: "UE" });
        const coAttainmentTable = await AttainmentTable.findOne({ subject_data_id, TableName: "CO" });

        const directPOAttainment = await DirectPOAttainment.findOne({ subject_data_id });

        if (!ueAttainmentTable || !coAttainmentTable || !directPOAttainment) {
            return res.status(404).send("Attainment data not found");
        }

        res.json({ ueAttainmentTable, coAttainmentTable, directPOAttainment });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
export { createOrUpdateAttainmentTable,getAttainmentTable };
