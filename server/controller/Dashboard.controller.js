const DevicesModel = require("../model/Dashboard.model")

const getListDevices = async ( ctx ) =>{
    try {
        const data = await DevicesModel.find({}).sort({createdAt: -1}).exec()
        ctx.body = data
        
    } catch (error) {
        ctx.response.status = 500;
        ctx.body = error
    }
}

const createDevice = async (ctx) => {
    const newData = new DevicesModel(ctx.request.body)
    try {
        await newData.save()
        ctx.body = { message: "OK" };
    } catch (error) {
        console.log("error", error)
        ctx.response.status = 400;
    }
}

module.exports = { getListDevices:getListDevices, createDevice: createDevice}