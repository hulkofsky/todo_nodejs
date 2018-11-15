const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

//ROUTES
const authRouter = require('./routes/authRoutes')
const projectRouter = require('./routes/projectRoutes')
const taskRouter = require('./routes/taskRoutes')
//morgan init
app.use(morgan('dev'))

app.use(cors())

//bodyparser init
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json({limit: '50mb', extended: true}))

//using routes
app.use('/', authRouter)
app.use('/', projectRouter)
app.use('/', taskRouter)


app.get('*', (req,res)=>{
    res.send('Oo oops!!')
})

app.listen(process.env.PORT, err=>{
    err?console.log('Oo oops! Something went wrong!'):
        console.log(`Shit happens on ${process.env.PORT}`)
})