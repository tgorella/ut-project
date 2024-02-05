const express = require('express')
const auth = require('../middleware/auth.middleware')
const router = express.Router({mergeParams: true})
const Order = require('../models/Order')


router.route('/')
.get(auth, async (req, res) => {
  try {
    if (req.query.clientId) {
      const list = await Order.find({userId: req.user._id, clientId: req.query.clientId}).sort({createdAt: -1})
    return res.status(200).send(list)
    }
    if (req.query.search) {
     const list = await Order.find({userId: req.user._id})
     const filteredList = list.filter((item) => {
      return item.title.toLowerCase().includes(req.query.search.toLowerCase()) || item.orderNumber.toString().includes(req.query.search)
    })
      return res.status(200).send(filteredList)
    }
    const list = await Order.find({userId: req.user._id}).sort({createdAt: -1})
    res.status(200).send(list)
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.post(auth, async (req, res) => {
  try {
    const newOrder = await Order.create({
      ...req.body,
      userId: req.user._id,
    }) 
    res.status(201).send(newOrder)
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})

router
.route('/:orderId')
.get(auth, async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
    await order.populate({
      path: 'clientId'
    })
    
    if (order.userId.toString() === req.user._id) {
      return res.status(200).send(order);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.delete(auth, async (req, res) => {
  try {
    const {orderId} = req.params
    const removedOrder = await Order.findById(orderId)
    if (removedOrder.userId.toString() === req.user._id) {
      await Order.deleteOne({_id: orderId})
      return res.send(removedOrder._id)
    }
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.patch(auth, async (req, res) => {
  try {
     const {orderId} = req.params
  const event = await Order.findById(orderId).populate({
    path: 'clientId'
  })
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