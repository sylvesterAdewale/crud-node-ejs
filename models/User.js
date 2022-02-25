const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName: {type: String,
        required: [true, "Enter your firt name"]
    },
    lastName: {type: String,
        required: [true, "Enter your last name"]
    },
    userName: {type: String,
        required: [true, "Enter a username"],
        unique: false,
        lowercase: true
    },
    matricNo: {type: String,
        required: [true, "Enter your matric number"]
    },
    department: {type: String,
        required: [true, "Enter your department"]
    },
    email: {type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, "Enter a valid email"]
    },
    password: {type: String,
        required: true
    }
})
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = bcrypt.compare(password, user.password)
        if(auth) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}
const User = mongoose.model('user', userSchema);

module.exports = User;