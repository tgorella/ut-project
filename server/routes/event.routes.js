const express = require('express')
const auth = require('../middleware/auth.middleware')
const Event = require('../models/Event')
const router = express.Router({mergeParams: true})


router.route('/')
.get(auth, async (req, res) => {
  try {
    const list = await Event.find({userId: req.user._id})
    res.status(200).send(list)
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.post(auth, async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      userId: req.user._id
    }) 
    res.status(201).send(newEvent)
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})

router('/:eventId')
.delete(auth, async (req, res) => {
  try {
    const {eventId} = req.params
    const removedEvent = await Event.findById(eventId)
    if (removedEvent.userId.toString() === req.user._id) {
      await removedEvent.remove()
      return res.send(removedEvent._id)
    }
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.patch(auth, async (req, res) => {
  try {
     const {eventId} = req.params
  const event = await Event.findById(eventId)
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