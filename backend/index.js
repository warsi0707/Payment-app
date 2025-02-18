require('dotenv').config()
const express = require("express")
const { userRouter } = require("./routes/user")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const { accountRouter } = require('./routes/account')
const cors = require("cors")
const path = require("path")


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, "frontend", "dist")))
app.get("/",(req, res)=>{
    res.json({
        message: "Working"
    })
})
app.use("/api/v1/user", userRouter)
app.use("/api/v1/account",accountRouter)

app.use("*",(req, res) =>{
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

const Main =async()=>{
    try{
       const DbConnect =await mongoose.connect(process.env.MONGO_URL)
        if(DbConnect){
            console.log("Database connetcted")
        }else{
            console.log("Database cunnection failed")
        }
        app.listen(3000)
        console.log("App listing on port 3000")
    }catch(e){
        console.error(e)
    }
    
}
Main()