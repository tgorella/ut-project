const express = require("express");
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const bcryptjs = require("bcryptjs");

router.post("/", async (req, res) => {
	try {
		const newUser = await User.create({
			...req.body,
		});
		res.status(201).send(newUser);
	} catch (error) {
		res
			.status(500)
			.json({ message: "На сервере произошла ошибка. Попробуйте позже" });
	}
});
router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});
router.get("/:userId", auth , async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const response = user.toObject()
    delete response.password
    res.status(200).send(response);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});
router.patch('/updatePassword/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (userId === req.user._id) {
    const {password} = req.body
    const hashedPassword = await bcryptjs.hash(password, 12);
    const updatedUser = await User.findByIdAndUpdate(userId, {password: hashedPassword}, {
      new: true
    })
    res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
})

module.exports = router;
