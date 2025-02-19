const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
require('dotenv').config()
const cors = require("cors");

//Express app
const app = express()

//middleware
app.use(express.json())
app.use(cors())

//routes
app.use('/api/workouts', workoutRoutes)

//connect db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listening port
        app.listen(4000, () => {
        console.log('Connected to DB & listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })

