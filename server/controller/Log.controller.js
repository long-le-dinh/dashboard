const ActionLogsModel = require("../model/Log.model");

const getListActionLog = async ( ctx ) =>{
    try {
        const data = await ActionLogsModel.find({}).sort({createdAt: -1}).exec()
        ctx.body = data
        
    } catch (error) {
        ctx.response.status = 500;
        ctx.body = error
    }
}

const createLogAction = async (ctx) => {
    const newData = new ActionLogsModel(ctx.request.body)
    try {
        ctx.body = await newData.save()
    } catch (error) {
        ctx.response.status = 400;
        ctx.body=error
    }
}

const searchNameLogAction = async (ctx) =>{
    const name = ctx.request.query
    try {
        ctx.body = await ActionLogsModel.find({
            Name:{$regex:name.Name, $options:'si'}
        })
    } catch (error) {
        ctx.body=error
        ctx.response.status = 400;
    }
    
}
module.exports = { getListActionLog:getListActionLog, createLogAction: createLogAction, searchNameLogAction: searchNameLogAction}