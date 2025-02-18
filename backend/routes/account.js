const express = require("express")
const { Auth } = require("../middleware/Auth");
const { Account, User } = require("../database/Db");
const { default: mongoose } = require("mongoose");
const accountRouter = express.Router()

accountRouter.get("/balance", Auth, async (req, res) => {
    const userId = req.user;
    try {
        const balance = await Account.findOne({ userId: userId })
        if (balance == null) {
            return res.json({
                balance: 0
            })
        }
        return res.json({
            balance: balance.balance
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
})
accountRouter.post("/send", Auth, async (req, res) => {
    const session = await mongoose.startSession()

    session.startTransaction()
    const userId = req.user;
    const { username, amount } = req.body;
    try {
        
        const findMerchant = await User.findOne({ username }).session(session)
        const account = await Account.findOne({ userId: userId }).session(session)
        if (!findMerchant || account.balance < amount) {
            return res.json({
                message: "Insufficient balance / or recepient not found"
            })
        }
        //sender
        await Account.updateOne({ userId: userId }, {$inc: { balance: -amount }}).session(session)
        //receiver
        await Account.updateOne({ userId: findMerchant._id }, {$inc: { balance: amount }}).session(session)
        await session.commitTransaction()
        return res.json({
            message: "Balance trabsfer success"
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
})

module.exports = {
    accountRouter
}