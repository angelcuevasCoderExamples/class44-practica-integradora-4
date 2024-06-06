const {Router} = require('express');
const ViewsController = require('../controllers/views.controller');
const router = Router();

router.get('/',ViewsController.getAllUsers)
router.get('/courses', ViewsController.getAllCourses)
router.get('/login', ViewsController.login)

module.exports = router;