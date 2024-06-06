const passport = require(`passport`);
const local = require('passport-local');
const UserManager = require('../dao/dbManagers/users')
const {hashPassword, isValidPassword} = require('../uitils')
const passportJWT = require('passport-jwt')
const config = require('./config');
const { usersService } = require('../repositories/services');



const initializePassport = ()=>{
    
    passport.use('register', new local.Strategy({
        passReqToCallback: true, 
        usernameField: 'email'
    }, async (req, email, password, done)=>{
        try {
            const {first_name, last_name, dni, gender } = req.body;
            if(!first_name || !last_name || !dni || !gender) return done(null, false, {message:'incomplete parameters'})

            const existingUser = await usersService.getBy({email})
            if(existingUser) return done(null, false, {message:'user by that email already exist'})

            const newUserData = {
                first_name, 
                last_name,
                dni, 
                gender,
                email,
                password: hashPassword(password) 
            }
            let result = await usersService.create(newUserData)
            return done(null, result)
            
        } catch (error) {
            done(error)
        }
    }))


    passport.use('login', new local.Strategy({
        usernameField: 'email'
    }, async (email, password, done)=>{
        try {          
            const user = await usersService.getBy({email});
            if(!user)  return done(null, false, {message:'user does not exist'})   
            if(!isValidPassword(user, password)) return done(null, false, {message:'Incorrect password'})

            return done(null, user)

        } catch (error) {
            done(error)
        }
    }))

    passport.use('current', new passportJWT.Strategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.jwt.SECRET
    },(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

}

passport.serializeUser((user, done)=>{
    done(null, user._id)
})

passport.deserializeUser(async (id, done)=>{
    const user = await usersManager.getById(id);
    done(null, user)
})

const cookieExtractor = (req)=>{
    let jwt  = null; 
    if(req && req.cookies){
        jwt = req.cookies[config.jwt.COOKIE_NAME]
    }

    return jwt; 
}   


module.exports = initializePassport;