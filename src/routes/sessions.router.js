const {Router} = require('express');
const passport = require('passport');
const SessionsController = require('../controllers/sessions.controller');

const router = Router();

router.post('/register', 
    passport.authenticate('register',{
        failureRedirect:'/api/sessions/failedRegister',
        session:false 
    }),
    SessionsController.register)

router.get('/failedRegister', SessionsController.handleRegisterFail)

router.post('/login', 
    passport.authenticate('login',{
        failureRedirect:'/api/sessions/failedLogin',
        session:false 
    }),
    SessionsController.login)

router.get('/failedLogin',SessionsController.handleLoginFail)
router.get('/current', passport.authenticate('current',{session:false}), SessionsController.getCurrent)

module.exports = {
    sessionsRouter: router
};