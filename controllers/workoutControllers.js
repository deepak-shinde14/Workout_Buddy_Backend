const Workout = require('../models/workoutSchema')
const mongoose = require('mongoose')


//get all workouts
const getWorkouts = async ( req, res) => {
    const workout = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workout)
} 



//get a single workout
const getWorkout = async ( req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such a workout exists"})
    }

    const workout = await Workout.findById(id)

    if(!getWorkout){
        return res.status(404).json({error: "No such a workout"})
    }
    res.status(200).json(workout)
}



//create a single workout
const createWorkout = async(req, res) => {
    const{title, load, reps} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields > 0 ){
        return res.status(400).json({error: 'Please fill all the fields', emptyFields})
    }

    //add doc to db
    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}



//delete a single workout
const deleteWorkout = async(req, res) => {
    const {id}  = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such a workout exists"})
    }
    const workout = await Workout.findOneAndDelete({_id: id})

    if(!deleteWorkout){
        return res.status(404).json({error: "No such a workout"})
    }
    res.status(200).json(workout)
}



//update a single workout
const updateWorkout = async(req, res) => {
    const {id}  = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such a workout exists"})
    }
    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!updateWorkout){
        return res.status(404).json({error: "No such a workout"})
    }
    res.status(200).json(workout)
}




module.exports = {
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}