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

    return sums.map((sum, index) => counts[index] === 0 ? '-' : sum / counts[index]);
};


const createIndirectPo = async(req,res) => {
    try {
        const {subject_data_id} = req.params;
        const {values} = req.body;
    
        const courseArticulation = await CourseArticulationModel.findOne({subject_data_id:subject_data_id});
        const {data} = courseArticulation;
    
        const UpdatedData = data.map((val,index)=>{
           const {co,po,pso} = val;
           const updatedPo = po.map((item) => item ==='-'?'-':parseFloat(((item*values[index])/3).toFixed(1)))
           const updatedPso = pso.map((item) => item ==='-'?'-':parseFloat(((item*values[index])/3).toFixed(1)))
            return {co,po:updatedPo,pso:updatedPso}
        });
    
        const poColumnCount = data[0].po.length;
            const psoColumnCount = data[0].pso.length;
    
            const avgPo = calculateAverage(UpdatedData.map(row => row.po), poColumnCount);
            const avgPso = calculateAverage(UpdatedData.map(row => row.pso), psoColumnCount);
            const averages =[...avgPo,...avgPso]
        
        const indirectPo = new IndirectPo({subject_data_id:subject_data_id,data:UpdatedData,averages:[...avgPo,...avgPso]})
        const finalIndirectPo = await indirectPo.save();
    
        const directAttainPo = await DirectPOAttainment.findOne({subject_data_id:subject_data_id});
        const {DirectPo} = directAttainPo;
    
        const DirectPo80perc = DirectPo.map((value)=> value==='-'?'-':parseFloat((value*0.8).toFixed(1)))
        const IndirectPo20perc = averages.map((value)=> value==='-'?'-':parseFloat((value*0.2).toFixed(1)))
        const finalvalues = DirectPo80perc.map((value,index)=>{
            return parseFloat((value+IndirectPo20perc[index]).toFixed(1))
        })
    
        const CoPoPso = new FinalCoPoPso({subject_data_id:subject_data_id, DirectPo80perc:DirectPo80perc,IndirectPo20perc:IndirectPo20perc,COPOPSOAttainment:finalvalues})
        const finalCOPOPSO = await CoPoPso.save()
        return res.status(200).json({finalCOPOPSO})
    } catch (error) {
        return res.status(404).json(["Error Creating Final COPOPSO data",FinalCoPoPso])
    }
}

export {createIndirectPo};