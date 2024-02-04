const express = require('express')
const auth = require('../middleware/auth.middleware')
const Event = require('../models/Event')
const Order = require('../models/Order')

const router = express.Router({mergeParams: true})


router.route('/')
.get(auth, async (req, res) => {
  try {
    const event_list = await Event.find({userId: req.user._id})
    const orders_list = await Order.find({userId: req.user._id})

    orders_list.forEach((order) => {
      const data = {
        _id: order._id,
        title: order.title,
        userId: order.userId,
        eventType: order.eventType,
        eventDate: order.eventDate,
        startTime: order.startTime,
        endTime: order.endTime,
        place: order.place,
        notes: order.notes
      }
      event_list.push(data)
    })
    res.status(200).send(event_list)
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

router
.route('/:eventId')
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