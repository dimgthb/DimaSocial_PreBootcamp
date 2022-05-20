// import modules
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

// intialize
const app = express()

// configure middleware
app.use(express.json())
app.use(cors({ origin : 'http://localhost:3000', exposedHeaders : ['uid', 'Auth-Token'] }))


// test database connection
const connection = require('./config')
connection.connect((error) => {
    if (error) {
        console.log('error : ', error)
    }

    console.log(`database connection established at id : ${connection.threadId}.`)
})

// home route
app.get('/', (req, res) => res.status(200).send('<h1>Welcome to DIMAS SOCIAL MEDIA PROJECT</h1>'))

// setup router
const routers = require('./routes')
app.use('/api', routers.user_router)
app.use('/api', routers.profile_router)

app.use('album', routers.upload_router)
// binding
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`API is connected at port : ${PORT}.`))