const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    username: {
        type: String, unique: true, required: true
    },
    firstName: String,
    lastName: String,
    password: String
})

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})


const User = mongoose.model("User", UserSchema)
const Account = mongoose.model("Account", AccountSchema)

module.exports ={
    User,
    Account
}