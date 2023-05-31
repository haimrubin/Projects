const express = require("express");
const router = express.Router();

const courseController = require("../controller/course");

router.get("/courses-list", courseController.getCoursesList);
router.get("/course/:id", courseController.getCourse);

module.exports = router;
