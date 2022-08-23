const Users = require('./auth.controller');
const express = require('express');
const router = express.Router();

router.post('/register', Users.createUser);
router.post('/login', Users.loginUser);
router.post('/logout', Users.logout);
module.exports = router;