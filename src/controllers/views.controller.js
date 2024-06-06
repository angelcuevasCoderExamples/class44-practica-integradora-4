const { usersService, coursesService } = require('../repositories/services');
class ViewsController {
    static async getAllUsers(req,res){
        const users = await usersService.getAll();
        res.render('users',{users:users})
    }
    static async getAllCourses(req,res){
        const courses = await coursesService.getAll();
        res.render('courses',{courses})
    }
    static async login(req,res){
        res.render('login')
    }
}

module.exports = ViewsController; 