const express = require('express')
const auth = require('../middleware/auth.middleware')
const ProjectStage = require('../models/ProjectStage')
const ProjectStep = require('../models/ProjectStep')
const router = express.Router({mergeParams: true})


router.route('/')
.get(auth, async (req, res) => {
  try {
    const list = await ProjectStage.find({userId: req.user._id})

    res.status(200).send(list)
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.post(auth, async (req, res) => {
  try {
    const newProjectStage = await ProjectStage.create({
      ...req.body,
      userId: req.user._id
    }) 
    res.status(201).send(newProjectStage)
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})

router
.route('/:stageId')
.delete(auth, async (req, res) => {
  try {
    const {stageId} = req.params
    const removedProjectStage = await ProjectStage.findById(stageId)
    if (removedProjectStage.userId.toString() === req.user._id) {
      await ProjectStep.deleteMany({stageId: stageId})
      await ProjectStage.deleteOne({_id: stageId})
      return res.send(removedProjectStage._id)
    }
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.patch(auth, async (req, res) => {
  try {
     const {stageId} = req.params
  const event = await ProjectStage.findById(stageId)
  if (event.userId.toString() === req.user._id) {
    for (let key in req.body) {
      event[key] = req.body[key]
    }
    await event.save()
    return res.status(200).send(event)
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