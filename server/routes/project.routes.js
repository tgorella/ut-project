const express = require('express')
const auth = require('../middleware/auth.middleware')
const Project = require('../models/Project')
const router = express.Router({mergeParams: true})


router.route('/')
.get(auth, async (req, res) => {
  try {
    const list = await Project.find({userId: req.user._id})
    res.status(200).send(list)
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.post(auth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      userId: req.user._id
    }) 
    res.status(201).send(newProject)
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})

router
.route('/:orderStatusId')
.delete(auth, async (req, res) => {
  try {
    const {orderStatusId} = req.params
    const removedProject = await Project.findById(orderStatusId)
    if (removedProject.userId.toString() === req.user._id) {
      await removedProject.remove()
      return res.send(removedProject._id)
    }
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.patch(auth, async (req, res) => {
  try {
     const {orderStatusId} = req.params
  const event = await Project.findById(orderStatusId)
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