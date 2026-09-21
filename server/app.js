const express = require("express")
const app = express()

app.get("/welcome",(req,res)=>{
    res.json("welcome")
})