const dotenv = require('dotenv');

//dotenv.config({path:`${__dirname}/.nombreDeArchivo`}) <---si el ".env" tuviera otro nombre
dotenv.config()

module.exports = {
    port: process.env.PORT,
    mongo: {
        URL: process.env.MONGO_URL   
    },
    jwt: {
        COOKIE_NAME: process.env.JWT_COOKIE_NAME,
        SECRET: process.env.JWT_SECRET
    },
    mailing:{
        PORT: process.env.MAILING_PORT,
        SERVICE: process.env.MAILING_SERVICE,
        USER: process.env.MAILING_USER,
        PASSWORD: process.env.MAILING_PASSWORD
    }
}