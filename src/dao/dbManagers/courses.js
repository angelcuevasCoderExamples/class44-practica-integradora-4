const CourseModel = require("../models/course.model");

class Courses {
    constructor(){
        //console.log('new intance of db manager')
    }
    async getAll(){
        let courses = await CourseModel.find().populate('students').lean()
        return courses;
    }
    async saveCourse(course){
        let result = await CourseModel.create(course)
        return result; 
    }

    async updateCourse(id, course){
        let result = await CourseModel.updateOne({_id: id}, course)
        return result; 
    }

    async getById(id){
        let result = await CourseModel.findOne({_id:id}).populate('students').lean()
        return result; 
    }
}

module.exports = Courses