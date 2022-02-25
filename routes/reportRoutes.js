const express = require("express")
const reportController = require("../controllers/reportController")
const router = express.Router()

router.post("/newreport", reportController.newreport_post)
router.get("/history", reportController.report_new)

module.exports = router