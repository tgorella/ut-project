const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/orders", require("./order.routes"));
router.use("/clients", require("./client.routes"));
router.use("/events", require("./event.routes"));
router.use("/event-types", require("./eventType.routes"));
router.use("/order-statuses", require("./orderStatus.routes"));
router.use("/projects", require("./project.routes"));
router.use("/project-steps", require("./projectStep.routes"));
router.use("/project-stages", require("./projectStage.routes"));
router.use("/users", require("./user.routes"));
router.use("/appmodules", require("./modules.routes"));

module.exports = router;
