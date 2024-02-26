const express = require('express')
const auth = require('../middleware/auth.middleware')
const Project = require('../models/Project').default
const ProjectStage = require('../models/ProjectStage').default
const ProjectStep = require('../models/ProjectStep').default
const router = express.Router({mergeParams: true})


router.route('/')
.get(auth, async (req, res) => {
  try {
    const list = await Project.find({userId: req.user._id}).populate({
      path: 'stages',
      populate: {path: "steps"}
    })

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
.route('/:projectId')
.delete(auth, async (req, res) => {
  try {
    const {projectId} = req.params
    const removedProject = await Project.findById(projectId)
    if (removedProject.userId.toString() === req.user._id) {
      const stages = await ProjectStage.find({projectId: projectId})
      stages.forEach(async (stage) => {
        await ProjectStep.deleteMany({stageId: stage._id})
      })
      await ProjectStage.deleteMany({projectId: projectId})
      await Project.deleteOne({_id: projectId})
      
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
     const {projectId} = req.params
  const project = await Project.findById(projectId)
  if (project.userId.toString() === req.user._id) {
    for (let key in req.body) {
      project[key] = req.body[key]
    }
    await project.save()
    return res.status(200).send(project.populate({
      path: 'stages',
      populate: {path: "steps"}
    })
)
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