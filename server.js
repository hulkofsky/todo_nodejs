const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = 3000
const cors = require('cors')
const constants = require('./utils/constants')

//ROUTES
const authRouter = require('./routes/authRoutes')
const projectRoutes = require('./routes/projectRoutes')

//morgan init
app.use(morgan('dev'))

app.use(cors())

//bodyparser init
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json({limit: '50mb', extended: true}))

//using routes
app.use('/', authRouter)
app.use('/', projectRoutes)

app.get('*', (req,res)=>{
    res.send('Oo oops!!')
})

app.listen(port, err=>{
    err?console.log('Oo oops! Something went wrong!'):
        console.log(`Shit happens on ${port}`)
})