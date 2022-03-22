const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes")
const reportRoutes = require("./routes/reportRoutes")
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const port = process.env.PORT || 5000;
const app = express();

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser())

mongoose.connect("mongodb+srv://dbUser:Sylvester28@dojotest.eaxo2.mongodb.net/crimeApp?retryWrites=true&w=majority").then(() =>{
    console.log("CONNECTED")
    app.listen(port, () => {
        console.log("RUNNING")
    })
})

app.get("*", checkUser);
app.get("/", requireAuth, (req, res) => {
    res.render("index", {title: "Crime-watch"})
});
// app.get("/history", requireAuth, (req, res) => {
//     res.render("history", {title: "Crime-watch - History"})
// });
app.get("/safety-tips", requireAuth, (req, res) => {
    res.render("safety-tips", {title: "Crime-watch - Safety Tips"})
});
app.get("/report", requireAuth, (req, res) => {
    res.render("report", {title: "Crime-watch - Safety Tips"})
});

app.use(authRoutes);
app.use(reportRoutes);