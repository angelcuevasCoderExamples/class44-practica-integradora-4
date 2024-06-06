const Courses = require("../dao/dbManagers/courses")
const Users = require("../dao/dbManagers/users")
const CoursesRepository = require("./courses.repository")
const UsersRepository = require("./users.repository")

const usersService = new UsersRepository(new Users())
const coursesService = new CoursesRepository(new Courses())

module.exports = {
    usersService,
    coursesService
}