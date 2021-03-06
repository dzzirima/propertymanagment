import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import express from 'express'
import dbConnect from './config/dbConnect.js'
const PORT = process.env.PORT
const app = express()

import auth_routes from "./routes/auth.js"

//connect to database
dbConnect()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//all the middles now
app.use('/auth',auth_routes)


app.get('/',(req,res) =>{
    console.log("Hey there Property Managment  backend  is up and running")
    res.json({
        success:"Group 1",
        token:"group xxx"
    })
})

app.post('/',(req,res) =>{
    console.log("Post  to Property Managment")
   
    res.json({
        success:"group 1",
        token:"group xxx"
    })
})



app.listen(process.env.PORT || PORT,(req,res) =>{
    console.log(`Server is running on port: ${PORT}`)
})







