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

describe('/api/sessions',()=>{
    before(()=>{
        this.userForRegistry = {
            first_name: "John",
            last_name: "Doe",
            email: "teacher@email.com",
            dni: 123456789,
            birthDate: "1989/05/01",
            gender: "M",
            password: "1234",
            role: "teacher",
        }

        this.receivedCookie
    })

    beforeEach(async ()=>{
        await mongoose.connection.collections.users.drop(); 
        await mongoose.connection.collections.courses.drop();
    })

    it('should register an user',  async ()=>{
        const {_body, statusCode, text} = await request.post('/api/sessions/register').send(this.userForRegistry); +
        console.log(_body, statusCode, text)
        expect(statusCode).to.be.equal(200)
        expect(_body).to.have.property('status')
        expect(_body.status).to.be.equal('success')
    })

    it('should log registered user in', async ()=>{
        const registryResponse = await request.post('/api/sessions/register').send(this.userForRegistry); 
        const {email, password} = this.userForRegistry;

        const {_body, statusCode, headers} = await request.post('/api/sessions/login').send({email, password}); 

        this.receivedCookie = getCookieObject(headers);

        expect(statusCode).to.be.equal(200)
        expect(_body).to.be.ok
        expect(_body).to.have.property('payload')
        expect(this.receivedCookie.name).to.be.equal(jwt.COOKIE_NAME)
        expect(this.receivedCookie.value).to.be.ok 
    })
})



function getCookieObject(headers){
    const parts = headers['set-cookie'][0].split(';')[0].split('=');
  
    return {
        name: parts[0],
        value: parts[1]
    }
}