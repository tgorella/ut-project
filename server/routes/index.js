const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/order", require("./order.routes"));
router.use("/client", require("./client.routes"));
router.use("/event", require("./event.routes"));
router.use("/event-type", require("./eventTypes.routes"));
router.use("/order-status", require("./orderStatus.routes"));
router.use("/project", require("./project.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
