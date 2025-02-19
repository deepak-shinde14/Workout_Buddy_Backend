const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
require('dotenv').config()

//Express app
const app = express()

//middleware
app.use(express.json())

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

