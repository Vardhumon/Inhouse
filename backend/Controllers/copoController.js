import { CourseArticulationModel } from "../models/courseArticulation.js";
import { PercentageModel } from "../models/percentage.js";
import { PsoModel } from "../models/poTable.js";
import { Subject_Data } from "../models/subject_data.js";

const createCoPo = async (subject_id) => {
    const data = [
        {
            "co": "CO1",
            "po": Array(12).fill(0),
            "pso": Array(3).fill(0)
        },
        {
            "co": "CO2",
            "po": Array(12).fill(0),
            "pso": Array(3).fill(0)
        },
        {
            "co": "CO3",
            "po": Array(12).fill(0),
            "pso": Array(3).fill(0)
        },
        {
            "co": "CO4",
            "po": Array(12).fill(0),
            "pso": Array(3).fill(0)
        },
        {
            "co": "CO5",
            "po": Array(12).fill(0),
            "pso": Array(3).fill(0)
        },
        {
            "co": "CO6",
            "po": Array(12).fill(0),
            "pso": Array(3).fill(0)
        }
    ];
    const data2 = [];
    const data3 = [];

    try {
       
        const CoPo = new PsoModel({ subject_id, data });
        await CoPo.save();

        data.forEach((item) => {
            const { co, po, pso } = item;

            const updatedPo = po.map((value, index) => {
                switch (index) {
                    case 0: return ((value / 5) * 100).toFixed(2);
                    case 1: return ((value / 14) * 100).toFixed(2);
                    case 2: return ((value / 14) * 100).toFixed(2);
                    case 3: return ((value / 8) * 100).toFixed(2);
                    case 4: return ((value / 6) * 100).toFixed(2);
                    case 5: return ((value / 2) * 100).toFixed(2);
                    case 6: return ((value / 4) * 100).toFixed(2);
                    case 7: return ((value / 3) * 100).toFixed(2);
                    case 8: return ((value / 7) * 100).toFixed(2);
                    case 9: return ((value / 7) * 100).toFixed(2);
                    case 10: return ((value / 5) * 100).toFixed(2);
                    case 11: return (value / 6) * 100;
                    default: return 0;
                }
            });

            const updatedPso = pso.map((value, index) => {
                switch (index) {
                    case 0: return ((value / 3) * 100).toFixed(2);
                    case 1: return ((value / 2) * 100).toFixed(2);
                    case 2: return ((value / 2) * 100).toFixed(2);
                    default: return 0;
                }
            });


            const finalObject = { co, po: updatedPo, pso: updatedPso };
            data2.push(finalObject);
        });

        const CoPoPerc = new PercentageModel({ subject_id, data: data2 });
        await CoPoPerc.save();



        data2.map((data) => {
            const {co, po, pso} = data;

           const updatedPo = po.map((value) => {
                if(value>=60){
                    return 3;
                }
                if(value>=40){
                    return 2;
                }
                if(value>=5){
                    return 1;
                }
                else{
                    return "-"
                }
            })

            const updatedPso = pso.map((value) => {
                if(value>=60){
                    return 3;
                }
                if(value>=40){
                    return 2;
                }
                if(value>=5){
                    return 1;
                }
                else{
                    return "-"
                }
            })

            data3.push({co, po:updatedPo, pso:updatedPso})
        })

        const CoPoArt = new CourseArticulationModel({subject_id, data: data3})
        await CoPoArt.save();
        

        return {CoPo, CoPoPerc, CoPoArt};
    } catch (error) {
        console.error("Error creating CoPo:", error);
        throw new Error(error.message);
    }
};


const updateCoPo = async(req,res) =>{
    try {
        const {data} = req.body;
        const {subject_data_id} = req.params;
        console.log(subject_data_id);
        const CoPo = await PsoModel.updateOne({ subject_data_id:subject_data_id }, { $set: { data: data } })
        console.log(CoPo);
        const data2 =[];
        const data3 = [];
        data.forEach((item) => {
            const { co, po, pso } = item;

            const updatedPo = po.map((value, index) => {
                switch (index) {
                    case 0: return ((value / 5) * 100).toFixed(1);
                    case 1: return ((value / 14) * 100).toFixed(1);
                    case 2: return ((value / 14) * 100).toFixed(1);
                    case 3: return ((value / 8) * 100).toFixed(1);
                    case 4: return ((value / 6) * 100).toFixed(1);
                    case 5: return ((value / 2) * 100).toFixed(1);
                    case 6: return ((value / 4) * 100).toFixed(1);
                    case 7: return ((value / 3) * 100).toFixed(1);
                    case 8: return ((value / 7) * 100).toFixed(1);
                    case 9: return ((value / 7) * 100).toFixed(1);
                    case 10: return ((value / 5) * 100).toFixed(1);
                    case 11: return ((value / 6) * 100).toFixed(1);
                    default: return 0;
                }
            });

            const updatedPso = pso.map((value, index) => {
                switch (index) {
                    case 0: return ((value / 3) * 100).toFixed(1);
                    case 1: return ((value / 2) * 100).toFixed(1);
                    case 2: return ((value / 2) * 100).toFixed(1);
                    default: return 0;
                }
            })

            const finalObject = { co, po: updatedPo, pso: updatedPso };
            data2.push(finalObject)
        });
        const CoPoPerc = await PercentageModel.updateOne({subject_data_id: subject_data_id},{data: data2} )

        data2.map((data) => {
            const {co, po, pso} = data;

           const updatedPo = po.map((value) => {
                if(value>=60){
                    return 3;
                }
                if(value>=40){
                    return 2;
                }
                if(value>=5){
                    return 1;
                }
                else{
                    return "-"
                }
            })

            const updatedPso = pso.map((value) => {
                if(value>=60){
                    return 3;
                }
                if(value>=40){
                    return 2;
                }
                if(value>=5){
                    return 1;
                }
                else{
                    return "-"
                }
            })

            data3.push({co, po:updatedPo, pso:updatedPso})
        })

        const CoPoArt = await CourseArticulationModel.updateOne({subject_data_id: subject_data_id}, {data: data3})
        return res.status(200).json({CoPo, CoPoPerc, CoPoArt});
    } catch (error) {
        return res.status(400).json(error.message)
    }

}

const getCoPO = async(req,res) => {
    try {
        const {subject_data_id} =req.params;
        console.log(subject_data_id);

        const CoPo = await PsoModel.find({subject_data_id: subject_data_id});
        const CoPoPerc = await PercentageModel.find({subject_data_id: subject_data_id});
        const CoPoArt = await CourseArticulationModel.find({subject_data_id:subject_data_id});
        console.log(CoPo);
        const {data} = CoPo[0];
        const data2 = CoPoPerc[0]["data"]
        const data3 = CoPoArt[0]['data']
        console.log(data, data2);
        
        return res.status(200).json({data, data2,data3})
    } catch (error) {
        return res.status(400).json("Error Fetching CoPo Data")
    }
}

export {createCoPo, updateCoPo, getCoPO};