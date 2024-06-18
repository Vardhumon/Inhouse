import { AttainmentTable } from "../models/attainTable.js";
import { CourseArticulationModel } from "../models/courseArticulation.js";
import { DirectPOAttainment } from "../models/directAttainPo.js";

const createAttainmentTable = async (req, res) => {
    try {
        const { subject_data_id } = req.params;
        const FurtherData = req.body;
        const { UE, CO1, CO2, CO3, CO4, CO5, CO6 } = FurtherData;

        const articulationTable = await CourseArticulationModel.findOne({ subject_data_id });

        if (!articulationTable || !articulationTable.data) {
            return res.status(404).send("Articulation table data not found");
        }

        const { data } = articulationTable;

        const Table1Data = data.map((val) => {
            const { po, pso } = val;
            const poCalculated = po.map((item) => item === '-' ? '-' : item / UE["percAttainmentlevelUE"]);
            const psoCalculated = pso.map((item) => item === '-' ? '-' : item / UE["percAttainmentlevelUE"]);
            return { po: poCalculated, pso: psoCalculated };
        });

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

            return sums.map((sum, index) => counts[index] === 0 ? '-' : sum / counts[index]);
        };

        const avgPo = calculateAverage(Table1Data.map(row => row.po), poColumnCount);
        const avgPso = calculateAverage(Table1Data.map(row => row.pso), psoColumnCount);

        const result = {
            data: Table1Data,
            averages: {
                po: avgPo,
                pso: avgPso
            }
        };
        console.log(result);

        const attainmentTableUE = new AttainmentTable({
            subject_data_id: subject_data_id,
            TableName: "UE",
            data: Table1Data,
            average: [avgPo, avgPso]
        });
        const finalAttainmentTableUE =await attainmentTableUE.save();

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
            const poCalculated = po.map((item) => item === '-' ? '-' : item / COPercentages[index]);
            const psoCalculated = pso.map((item) => item === '-' ? '-' : item / COPercentages[index]);
            return { po: poCalculated, pso: psoCalculated };
        });

        const avgPoTable2 = calculateAverage(Table2Data.map(row => row.po), poColumnCount);
        const avgPsoTable2 = calculateAverage(Table2Data.map(row => row.pso), psoColumnCount);

        const resultTable2 = {
            data: Table2Data,
            averages: {
                po: avgPoTable2,
                pso: avgPsoTable2
            }
        };
        const attainmentTableCO = new AttainmentTable({subject_data_id:subject_data_id, TableName:"CO",data:Table2Data, average:[avgPoTable2,avgPsoTable2]})
        const finalAttainmentTableCO = await attainmentTableCO.save();

        const InternalExam = [...avgPoTable2,...avgPsoTable2];
        const UniversityExam = [...avgPo,...avgPso];
        const percInternalExam = InternalExam.map((val) => {
            return parseFloat((val*0.2).toFixed(1))
        })
        const percUniversityExam = UniversityExam.map((val) => {
            return parseFloat((val*0.8).toFixed(1))
        })
        const DirectPOAttainmentValues = percInternalExam.map((val,index) => {
            return parseFloat((val+percUniversityExam[index]).toFixed(1))
        })
        const DirectPO = new DirectPOAttainment({subject_data_id:subject_data_id,InternalExam:InternalExam,
            UniversityExam:UniversityExam, percInternalExam:percInternalExam, percUniversityExam:percUniversityExam,DirectPO:DirectPOAttainmentValues
        })
        const FinalDirectPo = await DirectPO.save();
        res.json({ finalAttainmentTableUE, finalAttainmentTableCO, FinalDirectPo});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { createAttainmentTable };
