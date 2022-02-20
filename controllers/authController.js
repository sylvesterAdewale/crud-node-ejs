const User = require("../models/User");
const jwt = require("jsonwebtoken")

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {firstName: " ", lastName: " ", userName: " ", matricNo: " ", department: " ", email: " ", password: " "};

    if(err.code === 11000) {
        errors.userName = "that username has already ben registered";
        errors.email = "that email has already been registered";
        return errors
    }

    if (err.message == 'incorrect email') {
        errors.email = "that email is not registered"
    }
    
    if (err.message == 'incorrect password') {
        errors.password = "that password is incorrect"
    }

    if(err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors
}

const maxAge = 3 * 24 * 60 * 60;
const creatToken = (id) => {
    return jwt.sign({id}, "super super secret", { expiresIn: maxAge})
}

module.exports.signup_get = (req, res) => {
    res.render("signup", {title: "Crime-watch - Register"})
}

module.exports.login_get = (req, res) => {
    res.render("login", {title: "Crime-watch - login"})
}

module.exports.signup_post = async (req, res) => {
    const {firstName, lastName, userName, matricNo, department, email, password} = req.body;

    try {
        const user = await User.create({firstName, lastName, userName, matricNo, department, email, password});
        const token = creatToken(user._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: user._id})
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = creatToken(user._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({ user: user._id })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }

}

module.exports.logout = (req, res) => {
    res.cookie("jwt", "", {maxAge: 1});
    res.redirect("/login")
}