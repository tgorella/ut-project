const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/order", require("./order.routes"));
router.use("/client", require("./client.routes"));
router.use("/event", require("./event.routes"));
router.use("/event-type", require("./eventType.routes"));
router.use("/order-status", require("./orderStatus.routes"));
router.use("/projects", require("./project.routes"));
router.use("/project-steps", require("./projectStep.routes"));
router.use("/project-stages", require("./projectStage.routes"));
router.use("/user", require("./user.routes"));
router.use("/appmodules", require("./modules.routes"));

module.exports = router;
