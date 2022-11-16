const mongoose = require("mongoose")
const ActionLogsSchema = new mongoose.Schema(
    {
        DeviceID:{type: Number,required: true},
        Name:{type: String, required: true},
        Action:{type: String, required:true},
        Date:{type: String, required:true}
    },
    { timestamps: true }
)
module.exports = mongoose.model("ActionLog", ActionLogsSchema);