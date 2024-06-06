const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title:{
        type:String, 
        required: true
    },
    description:{
        type:String, 
        required: true
    },
    teacher:{
        type:String, 
        required: true
    },
    students: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref:'users'
        }],
        default: [],
    }
})

const CourseModel = mongoose.model('courses', courseSchema);

module.exports = CourseModel;
