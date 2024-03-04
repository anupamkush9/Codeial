const express = require("express");
const router = express.Router();
const userContoller = require("../controllers/user_controller");
const passport = require('passport');
const friendController = require('../controllers/friend_controller');

router.get('/profile/:id',passport.checkAuthentication, userContoller.userProfile );
router.post('/update/:id',passport.checkAuthentication, userContoller.update );

router.get('/sign-in', userContoller.signIn);
router.get('/sign-up', userContoller.signUp);
router.post('/create', userContoller.userCreate);
router.get('/friends', friendController.friendList)

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local', // strategy
    {failureRedirect  : '/user/sign-in'},
),userContoller.createSession);

router.get('/sign-out', userContoller.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope : ['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/user/sign-in'}), userContoller.createSession);

module.exports = router;