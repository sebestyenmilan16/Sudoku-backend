require('dotenv').config() // ettől létezik a process.env.ENV_VAR

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const PORT = 8080

app.get('/', (req, res)=> res.status(200).json("Hello!"))

// https://api.api-ninjas.com/v1/sudokugenerate?difficulty=medium&width=3&height=3

app.get('/sudoku', async (req, res)=> {
    const ninjaapikey = process?.env?.NINJA_API_KEY || ''
    const diff = "medium"
    const width = 3
    const height = 3
    const json = await fetch(`https://api.api-ninjas.com/v1/sudokugenerate?difficulty=${diff}&width=${width}&height=${height}`, {
        method: 'GET',
        headers: {
            'X-Api-Key' : ninjaapikey
        }
        
    })
    console.log('json', json)
    if (json.ok) {
        const data = await json.json()
        console.log(data);
        return res.status(200).json(data)
    }
    else {
        console.warn(json)
        return res.status(400).json(json)
    }


})

app.use((req, res)=>{
    // TODO - outsource base url to .env
    return res.status(404).send('<html>Not Found. Did you mean <a href="http://localhost:8080/sudoku">/sudoku</a> ? </html>')
})

app.listen(PORT, (error)=>{
    if (error) {
        console.warn(error)
    } else {
        console.log('Express backend server is runniing on port: ', PORT);
        
    }
})
