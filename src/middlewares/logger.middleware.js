const winston = require('winston');
const { ENV } = require('../config/config');


// const levels = {
//     error: 0,
//     warn: 1, <-------
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,<------ 
//     silly: 6
// }

const loggersConfig = {
    development:{
        transports:[
            new winston.transports.Console({level:'debug'}),
            new winston.transports.File({level: 'debug', filename: `${__dirname}/../../logs/development.log`})
        ]
    },
    production: {
        transports:[
            new winston.transports.Console({level:'warn'}),
            new winston.transports.File({level: 'error', filename: `${__dirname}/../../logs/production_errors.log`})
        ]
    }
}


const addLogger = (req, res, next)=>{
    //TODO
    req.logger = winston.createLogger(loggersConfig[ENV])
    req.logger.http(`${new Date().toLocaleString()} ${req.method} - ${req.url}`)
    next()
}

module.exports = addLogger; 