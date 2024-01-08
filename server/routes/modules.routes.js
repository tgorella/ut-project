const express = require('express')
const auth = require('../middleware/auth.middleware')
const Event = require('../models/Event')
const ModulesStatus = require('../models/ModulesStatus')
const router = express.Router({mergeParams: true})


router.route('/')
.post(auth, async (req, res) => {
  try {
    const newModulesStatus = await ModulesStatus.create({
      ...req.body,
      userId: req.user._id
    }) 
    res.status(201).send(newModulesStatus)
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.get(auth, async (req, res) => {
  try {
    const modulesStatus = await ModulesStatus.findOne({
      userId: req.user._id
    }) 

    res.status(201).send(modulesStatus)
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})

router
.route('/:moduleId')
.delete(auth, async (req, res) => {
  try {
    const {moduleId} = req.params
    const removedModuleStatus = await ModulesStatus.findById(moduleId)
    if (removedModuleStatus.userId.toString() === req.user._id) {
      await removedModuleStatus.remove()
      return res.send(removedModuleStatus._id)
    }
  } catch (error) {
    res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})
.patch(auth, async (req, res) => {
  try {
     const {moduleId} = req.params
  const moduleStatus = await ModulesStatus.findById(moduleId)
  if (moduleStatus.userId.toString() === req.user._id) {
    for (let key in req.body) {
      moduleStatus[key] = req.body[key]
    }
    await moduleStatus.save()
    return res.status(200).send(moduleStatus)
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