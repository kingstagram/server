if (process.env.NODE_ENV == 'development') require('dotenv').config()

//setup mongoose
const mongoose = require('mongoose')
const uris = process.env.URIS

mongoose.connect(uris, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(_=> {
        console.log('db connected')
    })
    .catch(_=> {
        console.log('db disconnected')
    })

//setup express
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/', router)
app.use(errorHandler)

app.listen(port, _=> {
    console.log('listening port', port)
})