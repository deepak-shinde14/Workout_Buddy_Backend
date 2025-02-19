const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

//Express app
const app = express()

//middleware
app.use(express.json())

//routes
app.use('/api/workouts', workoutRoutes)

//connect db
mongoose.connect('mongodb+srv://deepakshinde199914:CjGNuBqyoJOPAXS5@cluster0.sbruk.mongodb.net/WorkoutBuddy?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        //listening port
        app.listen(4000, () => {
        console.log('Connected to DB & listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })

