import { FinalCoPoPso } from "../models/FinalCoPoPso.js";
import { CourseArticulationModel } from "../models/courseArticulation.js";
import { DirectPOAttainment } from "../models/directAttainPo.js";
import { IndirectPo } from "../models/indirectPo.js";

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

    return sums.map((sum, index) => counts[index] === 0 ? '-' : parseFloat((sum / counts[index]).toFixed(1)));
};

const updatePoPso = (data, values) => {
    return data.map((val, index) => {
        const { co, po, pso } = val;
        const updatedPo = po.map((item) => item === '-' ? '-' : parseFloat(((item * values[index]) / 3).toFixed(1)));
        const updatedPso = pso.map((item) => item === '-' ? '-' : parseFloat(((item * values[index]) / 3).toFixed(1)));
        return { co, po: updatedPo, pso: updatedPso };
    });
};

const createOrUpdateIndirectPo = async (subject_data_id, values, UpdatedData, averages) => {
    const existingIndirectPo = await IndirectPo.findOne({ subject_data_id });
    if (existingIndirectPo) {
        existingIndirectPo.data = UpdatedData;
        existingIndirectPo.averages = averages[0];
        existingIndirectPo.values = values;
        return await existingIndirectPo.save();
    } else {
        const indirectPo = new IndirectPo({ subject_data_id, data: UpdatedData, averages: averages[0], values });
        return await indirectPo.save();
    }
};

const createOrUpdateFinalCoPoPso = async (subject_data_id, DirectPo80perc, IndirectPo20perc, finalvalues) => {
    const existingCoPoPso = await FinalCoPoPso.findOne({ subject_data_id });
    if (existingCoPoPso) {
        existingCoPoPso.DirectPo80perc = DirectPo80perc;
        existingCoPoPso.IndirectPo20perc = IndirectPo20perc;
        existingCoPoPso.COPOPSOAttainment = finalvalues;
        return await existingCoPoPso.save();
    } else {
        const CoPoPso = new FinalCoPoPso({ subject_data_id, DirectPo80perc, IndirectPo20perc, COPOPSOAttainment: finalvalues });
        return await CoPoPso.save();
    }
};

const createIndirectPo = async (req, res) => {
    try {
        const { subject_data_id } = req.params;
        const { values } = req.body;

        const courseArticulation = await CourseArticulationModel.findOne({ subject_data_id });
        const { data } = courseArticulation;

        const UpdatedData = updatePoPso(data, values);
        
        const poColumnCount = data[0].po.length;
        const psoColumnCount = data[0].pso.length;

        const avgPo = calculateAverage(UpdatedData.map(row => row.po), poColumnCount);
        const avgPso = calculateAverage(UpdatedData.map(row => row.pso), psoColumnCount);
        const averages = [{ po: avgPo, pso: avgPso }];
        
        const finalIndirectPo = await createOrUpdateIndirectPo(subject_data_id, values, UpdatedData, averages);

        const directAttainPo = await DirectPOAttainment.findOne({ subject_data_id });
        const { DirectPO } = directAttainPo;

        const DirectPo80perc = DirectPO.map(value => ({
            po: value.po.map(val => val === '-' ? '-' : parseFloat((val * 0.8).toFixed(1))),
            pso: value.pso.map(val => val === '-' ? '-' : parseFloat((val * 0.8).toFixed(1)))
        }));

        const IndirectPo20perc = averages.map(value => ({
            po: value.po.map(val => val === '-' ? '-' : parseFloat((val * 0.2).toFixed(1))),
            pso: value.pso.map(val => val === '-' ? '-' : parseFloat((val * 0.2).toFixed(1)))
        }));

        const finalvalues = DirectPo80perc.map(value => ({
            po: value.po.map((val, index) => val === '-' ? parseFloat((IndirectPo20perc[0].po[index]).toFixed(1)) : parseFloat((val + IndirectPo20perc[0].po[index]).toFixed(1))),
            pso: value.pso.map((val, index) => val === '-' ? parseFloat((IndirectPo20perc[0].pso[index]).toFixed(1)) : parseFloat((val + IndirectPo20perc[0].pso[index]).toFixed(1)))
        }));

        const finalCOPOPSO = await createOrUpdateFinalCoPoPso(subject_data_id, DirectPo80perc, IndirectPo20perc, finalvalues);

        return res.status(200).json({ indirectPo: finalIndirectPo, finalCOPOPSO });
    } catch (error) {
        return res.status(404).json(["Error Creating Final COPOPSO data", error.message]);
    }
};

const getFinalData = async (req, res) => {
    try {
        const { subject_data_id } = req.params;

        const directPoAttainment = await DirectPOAttainment.findOne({ subject_data_id });
        if (!directPoAttainment) {
            return res.status(404).json({ message: "Direct PO Attainment not found" });
        }

        const indirectPo = await IndirectPo.findOne({ subject_data_id });
        if (!indirectPo) {
            return res.status(404).json({ message: "Indirect PO not found" });
        }

        const finalCoPoPso = await FinalCoPoPso.findOne({ subject_data_id });
        if (!finalCoPoPso) {
            return res.status(404).json({ message: "Final CO PO PSO not found" });
        }

        return res.status(200).json({ directPoAttainment, indirectPo, finalCoPoPso });
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving data", error: error.message });
    }
};

export { createIndirectPo, getFinalData };
