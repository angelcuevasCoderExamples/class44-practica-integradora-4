const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type:String,
        default: 'John',
        required:true
    },
    last_name: {
        type:String,
        default: 'Doe'
    },
    email: {
        type:String,
        default: 'Doe'
    },
    dni: {
        type:Number,
        default: 0
    },
    gender: {
        type:String,
        enum:["M", "F"],
        default: 'M'
    },
    role: {
        type:String,
        default: 'student' //student, teacher
     },
    password: {
        type:String,
        require: true
    },
    courses: { //[objectid1,objectid2]
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'courses'
        }],
        default: [] 
    }
}) 

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel;