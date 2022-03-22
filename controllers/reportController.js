const Report = require("../models/Report")

module.exports.newreport_post = async (req, res) => {
    const {tCrime, nOffender, mOffender, lIncident, dDescription} = req.body;

    try {
        const report = await Report.create({tCrime, nOffender, mOffender, lIncident, dDescription, isResolved});
        res.status(201).json(report)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}
module.exports.report_new = async (req, res) => {
    try {
        const reports = await Report.find().sort({ tCrime: 'desc'})
        res.render("history", {title: "Crime-watch - Report", reports})
    } catch (err) {
        console.log(err)
    }
}
