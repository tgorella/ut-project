const express = require('express')
const auth = require('../middleware/auth.middleware')
const OrderStatus = require('../models/OrderStatus').default
const router = express.Router({mergeParams: true})


router.route('/')
.get(auth, async (req, res) => {
  try {
    const usersOrderStatuses = await OrderStatus.find({userId: req.user._id})
    const defaultOrderStatuses = await OrderStatus.find({isDefault: true})
    res.status(200).send([...defaultOrderStatuses, ...usersOrderStatuses])
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.post(auth, async (req, res) => {
  try {
    const newOrderStatus = await OrderStatus.create({
      ...req.body,
      userId: req.user._id
    }) 
    res.status(201).send(newOrderStatus)
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
    const removedOrderStatus = await OrderStatus.findById(orderStatusId)
     
    if (removedOrderStatus.userId.toString() === req.user._id) {
      await removedOrderStatus.deleteOne({_id: orderStatusId})
      return res.send(removedOrderStatus._id)
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
  const event = await OrderStatus.findById(orderStatusId)
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