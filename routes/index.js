const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

console.log("router loaded"); // for testing only

router.get('/', homeController.home);
router.get('/about', homeController.about);

router.use('/user', require('./user'));
router.use('/posts', require('./post'));
module.exports = router;