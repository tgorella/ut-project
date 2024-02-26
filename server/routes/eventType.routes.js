const express = require('express')
const auth = require('../middleware/auth.middleware')
const router = express.Router({mergeParams: true})
const EventType = require('../models/EventType').default


router.route('/')
.get(auth, async (req, res) => {
  try {
    const list = await EventType.find({userId: req.user._id})
    res.status(200).send(list)
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.post(auth, async (req, res) => {
  try {
    const newEventType = await EventType.create({
      ...req.body,
      userId: req.user._id
    }) 
    res.status(201).send(newEventType)
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})

router
.route('/:eventTypeId')
.delete(auth, async (req, res) => {
  try {
    const {eventTypeId} = req.params
    const removedEventType = await EventType.findById(eventTypeId)
    if (removedEventType.userId.toString() === req.user._id) {
      await removedEventType.deleteOne({_id: eventTypeId})
      return res.send(removedEventType._id)
    }
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.patch(auth, async (req, res) => {
  try {
     const {eventTypeId} = req.params
  const event = await EventType.findById(eventTypeId)
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