const express = require('express')
const path = require('path')

const app = express()

app.use('/styles', express.static(path.join(__dirname, '/public/styles.css')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

const port = process.env.PORT || 5555

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})