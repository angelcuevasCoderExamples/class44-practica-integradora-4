const config = require("../config/config");
const jwt = require('jsonwebtoken')

class SessionsController {
    static async register(req, res){
        res.send({status:'success', message:'User registered successfuly'})
    }
    static async handleRegisterFail(req, res){
        res.status(400).send({status:'error', error:'There has been a problem with the register process'})
    }
    static async login(req, res){
        const {_id, first_name, last_name, role, email} = req.user; 
        const userToSerialize = {
            id: _id, 
            first_name,
            last_name,
            role, 
            email
        }
        const token = jwt.sign(userToSerialize, config.jwt.SECRET, {expiresIn: '1h'})
        res.cookie(config.jwt.COOKIE_NAME, token, {maxAge: 60*60*1000} )
        res.send({status:'success', message:'User logged successfuly', payload: token })
    }
    static async handleLoginFail(req, res){
        res.status(400).send({status:'error', error:'There has been a problem with the login process'})
    }

    static async getCurrent(req, res){
        res.send(req.user)
    }
}

module.exports = SessionsController; 