const express = require("express")
const app = express()
var cors = require('cors')
const UserRoute = require('./routes/route')
const mongoose = require("mongoose")
require( "dotenv").config()
require("./db/db1")
const path=require('path')
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())
app.use('/user', UserRoute)
// app.use('/user', UserRoute)
app.use(express.static(path.join(__dirname, "build")))
app.get('/*', (req,res)=>{
    res.sendFile(path.join(__dirname, "build", "index.html"))
})
mongoose.connect('mongodb+srv://' + process.env.PASS + '@cluster0.xwl0l.mongodb.net/auth',{useNewUrlParser: true, useUnifiedTopology: true,}
)
    .then(()=>app.listen(process.env.PORT, ()=>{console.log(`le serveur est démaré sur le port ${process.env.PORT} et connecté pour l'authentification`);}) )
    .catch(err=> console.log("failed to connect to mongodb for athentification", err))
