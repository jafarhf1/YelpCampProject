const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');
const passport = require('passport');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {
        failureFlash: true, failureRedirect: '/login',
        keepSessionInfo: true //add this option because the new passport version will remove session after login and logout so we don't have previous session information
    }), users.login)

router.get('/logout', users.logout);


module.exports = router;