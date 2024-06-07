const chai = require('chai');
const expect = chai.expect; 
const mongoose = require('mongoose');
const { mongo, jwt } = require('../../config/config');
const supertest = require('supertest');
require('../../dao/models/user.model');
require('../../dao/models/course.model')


const request = supertest('http://localhost:8080')

mongoose.connect(mongo.URL).then(()=>{
    console.log('connected to db for testing')
})

describe('/api/courses',()=>{
    before(async ()=>{

        this.courseCreationMock = {
            title: "Frontend programming",
            description: "learn to create awesome frontend systems"
        }

        this.teacherMock = {
            first_name: "John",
            last_name: "Doe",
            email: "teacher@email.com",
            dni: 123456789,
            birthDate: "1989/05/01",
            gender: "M",
            password: "1234",
            role: "teacher",
        }

        this.commonUserMock = {
            first_name: "John",
            last_name: "Doe",
            email: "user@email.com",
            dni: 111111,
            birthDate: "1989/05/01",
            gender: "M",
            password: "1234",
            role: "student",
        }

        this.receivedCookie;

        await mongoose.connection.collections.users.drop(); 

        //register
        await request.post('/api/sessions/register').send(this.teacherMock);
        await request.post('/api/sessions/register').send(this.commonUserMock);

        //login 
        const teacherLoginResponse = await request.post('/api/sessions/login').send({email: this.teacherMock.email, password: this.teacherMock.password}); 
        const userLoginResponse = await request.post('/api/sessions/login').send({email: this.commonUserMock.email, password: this.commonUserMock.password}); 

        //saving cookies 
        this.teacherCookie = getCookieObject(teacherLoginResponse.headers);
        this.userCookie = getCookieObject(userLoginResponse.headers); 


    })

    beforeEach(async ()=>{
        
        await mongoose.connection.collections.courses.drop();
    })

    it('get all courses',  async ()=>{
        const {_body, statusCode, text} = await request.get('/api/courses').set('Cookie',setUpRequestCookie(this.userCookie));
        
        expect(statusCode).to.be.equal(200)
    })

    it('should create a course only if the user has the role teacher',  async ()=>{
        const {_body, statusCode, text} = await request.post('/api/courses').set('Cookie',setUpRequestCookie(this.teacherCookie)).send(this.courseCreationMock);
        expect(statusCode).to.be.equal(200)
    })


})



function getCookieObject(headers){
    const parts = headers['set-cookie'][0].split(';')[0].split('=');
  
    return {
        name: parts[0],
        value: parts[1]
    }
}

function setUpRequestCookie(cookie){
    return [`${cookie.name}=${cookie.value}`]
}