require('dotenv').config() // ettől létezik a process.env.ENV_VAR

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const PORT = 8080

app.get('/', (req, res)=> res.status(200).json("Hello!"))



app.listen(PORT, (error)=>{
    if (error) {
        console.warn(error)
    } else {
        console.log('Express backend server is runniing on port: ', PORT);
        
    }
})
