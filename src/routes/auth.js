const express=require('express');
const router=express.Router();
const authenticateUser = require('../middleware/authentication');
const {contact,forgotPassword,resetPassword,register,login}= require('../controller/auth');


router.post('/registerUser',register);
router.post('/contact',contact);
router.post('/login',login);
router.post('/resetPassword',resetPassword);
router.post('/forgotPassword',forgotPassword);
router.get('/log',forgotPassword);

module.exports=router;
