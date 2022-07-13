const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/user-controller");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

// Order matters !!!
router.post(
  "/signup",
  check("name").not().isEmpty(),
  check("email").normalizeEmail().isEmail(),
  check("password").isLength({ min: 5 }),
  usersControllers.signup
);
router.post("/login", usersControllers.login);

router.use(checkAuth);
router.get('/stats', usersControllers.getUserStats);
router.delete("/:uid", usersControllers.deleteUser);
router.get("/:uid", usersControllers.getUserData);
router.get('/', usersControllers.getUsers);


router.patch(
  "/:uid",
  check("name").not().isEmpty(),
  check("email").not().isEmpty(),
  usersControllers.updateUser
);

module.exports = router;
