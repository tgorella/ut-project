const express = require("express");
const auth = require("../middleware/auth.middleware");
const Client = require("../models/Client");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      if (req.query.search) {
        const list = await Client.find({userId: req.user._id})
        const filteredList = list.filter((item) => {
         return item.name.toLowerCase().includes(req.query.search.toLowerCase()) || item.email.toLowerCase().includes(req.query.search.toLowerCase()) || item.phone.toLowerCase().includes(req.query.search.toLowerCase())
       })
         return res.status(200).send(filteredList)
       }

      const list = await Client.find({ userId: req.user._id });
      res.status(200).send(list);
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newClient = await Client.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newClient);
    } catch (error) {
			if (error.keyPattern.email !== undefined) {
				res
        .status(500)
        .json({ message: "Клиент с таким email уже существует" });
			} else {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
			}
    }
  });
router
  .route("/:clientId")
  .get(auth, async (req, res) => {
    try {
      const { clientId } = req.params;
      const client = await Client.findById(clientId)
      
      if (client.userId.toString() === req.user._id) {
        return res.status(200).send(client);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }

    } catch (error) {
      res
        .status(204)
        .send(null)
    }
  })
  .delete(auth, async (req, res) => {
    try {
      const { clientId } = req.params;
      const removedClient = await Client.findById(clientId);
      if (removedClient.userId.toString() === req.user._id) {
        await Client.deleteOne({_id: clientId});
        return res.send(null);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const { clientId } = req.params;
      const client = await Client.findById(clientId);
      if (client.userId.toString() === req.user._id) {
				for (let key in req.body) {
					client[key] = req.body[key]
				}
        await client.save();
        return res.status(200).send(client);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  });

module.exports = router;
