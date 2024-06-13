import { MarkingModel } from "../models/markingScheme.js";


const createMarkingModel = async(subject_id) => {
    try {
        const markingModel = new MarkingModel({subject_id});
        await markingModel.save();
        return markingModel;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateMarkingModel = async(req,res) => {
    try {
        const {subject_data_id} = req.params || "666ae7abf4fa5d31b9040b06";
        const {data} = req.body;
        const markingmodel = await MarkingModel.updateOne({subject_data_id: subject_data_id}, {data: data})

        return res.status(200).json(["Markings Updated Successfully!",markingmodel])
    } catch (error) {
        return res.status(400).json(error.message)       
    }
}

const getMarkingModel = async(req,res) => {
    try {
        // const {subject_data_id} = req.params;
        const subject_data_id ="666ae7abf4fa5d31b9040b06";
        const markingmodel = await MarkingModel.find({subject_data_id: subject_data_id})
        return res.status(200).json(["Marking Model Successfully Fetched", markingmodel])
    } catch (error) {
        return res.status(400).json("Error in fetching marking scheme")
    }
}
export {createMarkingModel, updateMarkingModel, getMarkingModel};