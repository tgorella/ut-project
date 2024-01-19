const express = require('express')
const auth = require('../middleware/auth.middleware')
const ProjectStep = require('../models/ProjectStep')
const router = express.Router({mergeParams: true})

router.route('/')
.post(auth, async (req, res) => {
  try {
    const newStep = await ProjectStep.create({
      ...req.body,
      userId: req.user._id
    }) 
    res.status(201).send(newStep)
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.get(auth, async (req, res) => {
try {
  const list = await ProjectStep.find({userId: req.user._id})
  res.status(200).send(list)
} catch (error) {
  es
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
}
})

router.route('/:stepId')
.delete(auth, async (req, res) => {
  try {
    const {stepId} = req.mergeParams
    const removedStep = await ProjectStep.findById(stepId)
    if (removedStep.userId.toString() === req.user._id) {
      await ProjectStep.deleteOne({_id: stepId})
      return res.send(removedStep._id)
    }
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.patch(auth, async (req, res) => {
  try {
     const {stepId} = req.params
  const step = await ProjectStep.findById(stepId)
  if (step.userId.toString() === req.user._id) {
    for (let key in req.body) {
      step[key] = req.body[key]
    }
    await step.save()
    return res.status(200).send(step)
  } else {
    res.status(401).json({message:'Unauthorized'})
  }
  } catch (error) {
    res
    .status(500)
    .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
}

})

module.exports = router
