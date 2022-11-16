const mongoose = require("mongoose")
const DeviceSchema = new mongoose.Schema(
    {
        name:{type: String,required: true},
        mac:{type: String, required: true},
        ip:{type: String, required:true},
        date:{type: String, required:true},
        pc:{type: Number, required:true}

    },
    { timestamps: true }
)
module.exports = mongoose.model("Device", DeviceSchema);