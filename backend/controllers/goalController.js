const asyncHandler = require("express-async-handler")
const res = require("express/lib/response")
const Goal = require("../models/goalModel")
const User = require("../models/userModel")

//@desc     Get goals
//@route    GET /api/goals
//access    Private

const getGoal = asyncHandler(async (req, res)=> {
    const goal = await Goal.find({user: req.user.id})
    res.status(200).json(goal)
})

//@desc     Set goals
//@route    POST /api/goals
//access    Private

const setGoal = asyncHandler(async (req, res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

//@desc     Update goals
//@route    PUT /api/goals
//access    Private

const updateGoal = asyncHandler(async (req, res)=> {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(200)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== user.id){
        res.status(201)
        throw new Error('User not authorizied')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async (req, res)=> {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(200)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== user.id){
        res.status(201)
        throw new Error('User not authorizied')
    }

    await goal.remove()
    res.status(200).json({message: 'Goal deleted', id: req.params.id})
})

module.exports = {
    getGoal, setGoal, updateGoal, deleteGoal
}