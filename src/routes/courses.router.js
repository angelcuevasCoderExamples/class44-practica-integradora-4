const {Router} = require('express');
const CoursesController = require('../controllers/courses.controller');
const router = Router();
const passport = require('passport');
const applyRolesPolicy = require('../middlewares/roles.middleware');

router.get('/',passport.authenticate('current',{session:false}), applyRolesPolicy(['STUDENT']), CoursesController.getAll)
router.post('/',passport.authenticate('current',{session:false}), applyRolesPolicy(['TEACHER']), CoursesController.create)

module.exports = {
    coursesRouter: router
};