const express = require("express");
const router = express.Router();
const userContoller = require("../controllers/user_controller");

router.get('/profile', userContoller.userGet );

router.get('/sign-in', userContoller.signIn);
router.get('/sign-up', userContoller.signUp);
router.post('/create', userContoller.userCreate);
router.post('/create-session', userContoller.createSession)

module.exports = router;