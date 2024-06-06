const { coursesService } = require('../repositories/services');

class CoursesController {
    static async getAll(req, res){
        const courses  = await coursesService.getAll()
        res.send({status:'success', courses})
    } 
    static async create(req, res){
        const { title, description } = req.body; 
        if(!title || !description){
            return res.status(400).send({status:'error', error:'Incomplete data'})
        }
    
        const newCourse = {
            title,
            description,
            teacher: 'Not assigned',
            students: []
        }
    
        const result = await coursesService.create(newCourse)
        res.send({status:'success', payload: result})
    }
}

module.exports = CoursesController; 

// const createCourse = (req, res)=>{

// }
// const getAllCourses = (req, res)=>{
    
// }

// module.exports = {
//     createCourse,
//     getAllCourses
// }