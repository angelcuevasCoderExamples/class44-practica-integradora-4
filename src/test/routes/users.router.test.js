const chai = require('chai');
const expect = chai.expect; 
const mongoose = require('mongoose');
const { mongo } = require('../../config/config');
const supertest = require('supertest');

const request = supertest('http://localhost:8080')

mongoose.connect(mongo.URL).then(()=>{
    console.log('connected to db for testing')
})

describe('/api/users',()=>{
    it('get all users', async ()=>{
        const {_body, statusCode} = await request.get('/api/users')
        expect(statusCode).to.be.equal(200)
        expect(_body).to.have.property('payload')
        expect(_body.payload).to.be.a('Array')
    })
})
