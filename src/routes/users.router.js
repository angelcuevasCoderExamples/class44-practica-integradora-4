const {Router} = require('express');
const UsersController = require('../controllers/users.controller');
const passport = require('passport');

const router = Router();

router.get('/', UsersController.getAll)
router.post('/', UsersController.create)
router.post('/:uid/courses/:cid', passport.authenticate('current',{session:false}), UsersController.addToCourse)

module.exports = router;