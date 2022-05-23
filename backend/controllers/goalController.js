const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

//@desc   Get Goals
//@route  GET/api/goals
//access  Private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

//@desc   Set Goal
//@route  POST/api/goals
//access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Plase add text in input field');
  }
  const goal = await Goal.create({ text: req.body.text });
  res.status(200).json(goal);
});
