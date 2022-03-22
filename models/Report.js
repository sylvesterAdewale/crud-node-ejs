const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({
    tCrime: {
        type: String,
        required: true
    },
    nOffender: {
        type: String,
        required: true,
    },
    mOffender: {
        type: String,
        required: true,
    },
    lIncident: {
        type: String,
        required: true,
    },
    dDescription: {
        type: String,
        required: true,
    },
    isResolved: {
        type: Boolean,
        required: true,
        default: false,
    },
})

const Report = mongoose.model("report", reportSchema);

module.exports = Report;
