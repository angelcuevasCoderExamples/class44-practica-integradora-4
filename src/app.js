const express = require('express');
const app = express();
const usersRouter = require('./routes/users.router')
const viewsRouter = require('./routes/views.router')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose');
const { coursesRouter } = require('./routes/courses.router');
const initializePassport = require('./config/passport.config');
const passport = require('passport');
const { sessionsRouter } = require('./routes/sessions.router');
const session = require('express-session');
const { port, mongo } = require('./config/config');
const cookieParser = require('cookie-parser');
const addLogger = require('./middlewares/logger.middleware');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUIExpress = require('swagger-ui-express')


//*---database connection--//
mongoose.connect(mongo.URL).then(()=>{
    console.log("connected successsfuly")
})

//*---views engine--//
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine','handlebars')

//*--middlewares --*//
// app.use(session({ <---se cambió por una strategía usando jwt y cookies
//     secret:'sessionSecret',
//     resave: false,
//     saveUninitialized: false,
// }))

app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use(addLogger)

//** SWAGGER CONFIG */
const swaggerConfig = {
    definition:{
        openapi: '3.0.1',
        info: {
            title: 'Last integration class app documentation',
            description: 'this is ment tot describe how to use our api'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJSDoc(swaggerConfig)


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/users', usersRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/', viewsRouter)
app.use('/api-docs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))


//endpoins
app.get('/helloworld', (req, res)=>{
    res.send('hello world!')
})


app.listen(port,()=>console.log(`Up and running on port ${port}`))