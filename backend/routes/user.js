const express = require("express");
const { User, Account } = require("../database/Db");
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { Auth } = require("../middleware/Auth");


userRouter.post("/signup", async (req, res) => {
    const { username, firstName, lastName, password } = req.body;
    try {
        const ExistingUser = await User.findOne({
            username: username
        })
        if (ExistingUser) {
            return res.status(404).json({
                message: "User already exist"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username,
            firstName,
            lastName,
            password: hashPassword
        })
        if (newUser) {
            const assignMoney = await Account.create({
                userId: newUser._id,
                balance:Math.floor(1+ Math.random()*1000)
            })
            return res.json({
                message: "Signup Success",
                balance: assignMoney
            })
        } else {
            return res.json({
                message: "Signup failed"
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
userRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const findUser = await User.findOne({
            username: username
        })
        if (!findUser) {
            return res.status(404).json({
                message: `${username} not found`
            })
        }
        const comparedPass = findUser?await bcrypt.compare(password, findUser.password) : false
        if (comparedPass) {
            const token = jwt.sign({
                userId: findUser._id
            }, process.env.USER_JWT_SECRET)
            return res.json({
                message: "Signin success",
                token: token
            })
        } else {
            return res.status(404).json({
                message: "Login failed"
            })
        }

    } catch (error) {
        res.status(404).json({
            message: error
        })
    }

})
userRouter.get("/auth", Auth, (req, res) => {
    const user = req.user;
    try{
        if(user){
            return res.json({
                authenticated: true
            })
        }else{
            return res.json({
                authenticated: false
            })
        }
    }catch(error){
        res.status(404).json({
            authenticated: false
        })
    }
})
userRouter.put("/", Auth, async (req, res) => {
    const userId = req.user
    const { password, firstName, lastName } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const updateUser = await User.findByIdAndUpdate(userId, {
            password: hashedPassword,
            firstName,
            lastName
        })
        if (!updateUser) {
            return res.status(404).json({
                message: "Updating fail"
            })
        }
        return res.json({
            message: "User information updated"
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})
userRouter.get("/bulk", Auth, async (req, res) => {
    const { filter } = req.query
    try {
        const findUser = await User.find({
            $or: [
                { firstName: { $regex: filter, }},
                { lastName: { $regex: filter, } }
            ]
        })
        if (findUser) {
            return res.json({
                data: findUser.map(user=>({
                    userName: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    _id: user._id
                }))
            })
        }
        return res.status(404).json({
            message: "User not found"
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})

module.exports = {
    userRouter
}